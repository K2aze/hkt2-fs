import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import {
  sessionsTable,
  usersTable,
  userContactsTable,
  bookingsTable,
} from "@/server/db/schema";
import { eq, and, gte, count, InferSelectModel } from "drizzle-orm";
import type { AuthMeResponse, GuestSessionResponse } from "@/types/auth";

type sessionType = InferSelectModel<typeof sessionsTable>;

export async function GET() {
  try {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session_id")?.value;

    if (!sessionId) {
      const { response } = await createNewGuestSession();
      return response;
    }

    const session = await db.query.sessionsTable.findFirst({
      where: eq(sessionsTable.id, sessionId),
    });

    if (!session) {
      const { response } = await createNewGuestSession();
      return response;
    }
    if (session.expires_at < new Date()) {
      await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
      const { response } = await createNewGuestSession();
      return response;
    }

    if (session.user_id) {
      return await handleAuthenticatedUser(session, sessionId);
    }

    return await handleGuestSession(session);
  } catch (error: unknown) {
    console.log(error);
    return Response.json({ error: "unknown" }, { status: 500 });
  }
}

const createNewGuestSession = async () => {
  const newSessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  await db.insert(sessionsTable).values({
    id: newSessionId,
    user_id: null,
    expires_at: expiresAt,
  });

  const responseData: GuestSessionResponse = {
    isGuest: true,
    session: {
      sessionId: newSessionId,
      expiresAt: expiresAt?.toISOString() || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    bookings: {
      total: 0,
    },
  };

  const response = NextResponse.json(responseData);

  response.cookies.set("session_id", newSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { newSessionId, response };
};

async function handleAuthenticatedUser(
  session: sessionType,
  sessionId: string,
) {
  const user = await db.query.usersTable.findFirst({
    //Can't fix
    where: eq(usersTable.id, session.user_id as number),
  });

  if (!user) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
    const { response } = await createNewGuestSession();
    return response;
  }

  const contact = await db.query.userContactsTable.findFirst({
    where: eq(userContactsTable.user_id, user.id),
  });

  if (!contact) {
    return Response.json({ error: "User contact not found" }, { status: 404 });
  }

  const now = new Date();

  const [totalBookings, newBookings, scheduledBookings, contactedBookings] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(bookingsTable)
        .where(eq(bookingsTable.user_id, user.id)),

      db
        .select({ count: count() })
        .from(bookingsTable)
        .where(
          and(
            eq(bookingsTable.user_id, user.id),
            eq(bookingsTable.status, "new"),
          ),
        ),

      db
        .select({ count: count() })
        .from(bookingsTable)
        .where(
          and(
            eq(bookingsTable.user_id, user.id),
            eq(bookingsTable.status, "scheduled"),
            gte(bookingsTable.booking_date, now),
          ),
        ),

      db
        .select({ count: count() })
        .from(bookingsTable)
        .where(
          and(
            eq(bookingsTable.user_id, user.id),
            eq(bookingsTable.status, "contacted"),
          ),
        ),
    ]);

  const response: AuthMeResponse = {
    user: {
      id: user.id,
      username: user.username,
      createdAt: user.created_at?.toISOString() || new Date().toISOString(),
    },
    contact: {
      fullName: contact.full_name,
      email: contact.email,
      phoneNumber: contact.phone_number,
      emailVerified: contact.email_verified,
      phoneVerified: contact.phone_verified,
    },
    session: {
      sessionId: session.id,
      expiresAt: session.expires_at?.toISOString() || new Date().toISOString(),
      createdAt: session.created_at?.toISOString() || new Date().toISOString(),
    },
    bookings: {
      total: totalBookings[0].count,
      new: newBookings[0].count,
      scheduled: scheduledBookings[0].count,
      contacted: contactedBookings[0].count,
    },
  };

  return NextResponse.json(response);
}

async function handleGuestSession(session: sessionType) {
  // Đếm số bookings của guest session
  const bookingCount = await db
    .select({ count: count() })
    .from(bookingsTable)
    .where(eq(bookingsTable.session_id, session.id));

  const response: GuestSessionResponse = {
    isGuest: true,
    session: {
      sessionId: session.id,
      expiresAt: session.expires_at?.toISOString() || new Date().toISOString(),
      createdAt: session.created_at?.toISOString() || new Date().toISOString(),
    },
    bookings: {
      total: bookingCount[0].count,
    },
  };
  return NextResponse.json(response);
}
