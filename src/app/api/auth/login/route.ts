import { NextRequest } from "next/server";
import { loginSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { bookingsTable, sessionsTable, usersTable } from "@/server/db/schema";
import { comparePassword } from "@/lib/auth";
import { eq } from "drizzle-orm";
import z from "zod";
import { requireSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    //Parse input
    const { username, password } = loginSchema.parse(body);

    //Find user
    const [user] = await db
      .select({ id: usersTable.id, passwordHash: usersTable.password_hash })
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    if (!user) {
      return Response.json({ error: "USERNAME_NOT_MATCH" }, { status: 401 });
    }
    const isPasswordOk = await comparePassword(password, user.passwordHash);

    if (!isPasswordOk) {
      return Response.json({ error: "PASSWORD_NOT_MATCH" }, { status: 401 });
    }

    const session = await requireSession();

    await db
      .update(sessionsTable)
      .set({ user_id: user.id })
      .where(eq(sessionsTable.id, session.id));

    await db
      .update(bookingsTable)
      .set({ user_id: user.id, session_id: null })
      .where(eq(bookingsTable.session_id, session.id));

    return Response.json({ message: "LOGIN_SUCCESSFUL" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues.reduce<Record<string, string>>(
        (acc, issue) => {
          const field = issue.path.join(".");
          acc[field] = issue.message;
          return acc;
        },
        {},
      );
      return Response.json({ error: fieldErrors }, { status: 422 });
    }
    return Response.json({ error: "UNKNOWN_ERROR" }, { status: 500 });
  }
}
