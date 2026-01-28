import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { bookingSchema } from "@/lib/validations";
import { bookingsTable } from "@/server/db/schema";
import { eq, or } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "PARSED_NOT_FOUND" }, { status: 500 });
    }

    const session = await requireSession();

    if (!session) {
      return Response.json({ error: "SESSION_NOT_FOUND" }, { status: 500 });
    }

    const now = new Date();

    const lastBooking = await db.query.bookingsTable.findFirst({
      where: eq(bookingsTable.session_id, session.id),
      orderBy: bookingsTable.created_at,
    });

    if (
      lastBooking &&
      // now.getTime() - lastBooking.created_at.getTime() < 10 * 60 * 1000
      now.getTime() - lastBooking.created_at.getTime() < 3000
    ) {
      return Response.json({ error: "TOO_MANY_REQUESTS" }, { status: 429 });
    }

    const booking_date = new Date(parsed.data.bookingDate);

    await db.insert(bookingsTable).values({
      user_id: session.user_id ?? null,
      session_id: session.id,
      full_name: parsed.data.fullName,
      phone_number: parsed.data.phoneNumber,
      email: parsed.data.email,
      booking_date: booking_date,
      time: parsed.data.time,
      people: parsed.data.people,
      services: parsed.data.services,
      requests: parsed.data.requests,
      status: "new",
    });

    return Response.json({ message: "BOOKING_SUCESSFUL" }, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return Response.json({ error: "UKNOWN_ERROR" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await requireSession();
    if (!session)
      return Response.json({ error: "SESSION_NOT_FOUND" }, { status: 500 });

    const whereCondition = session.user_id
      ? or(
          eq(bookingsTable.session_id, session.id),
          eq(bookingsTable.user_id, session.user_id),
        )
      : eq(bookingsTable.session_id, session.id);

    const result = await db.query.bookingsTable.findMany({
      where: whereCondition,
      orderBy: bookingsTable.updated_at,
      columns: {
        user_id: false,
        session_id: false,
      },
    });

    return Response.json({ message: result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "ERROR_UNKNOWN" }, { status: 500 });
  }
}
