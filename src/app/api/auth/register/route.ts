import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { userContactsTable, usersTable } from "@/server/db/schema";
import { NextRequest } from "next/server";
import { registerSchema } from "@/lib/validations";
import z from "zod";
import { DrizzleQueryError } from "drizzle-orm";
import { DatabaseError } from "pg";

const CONSTRAINT_FIELD_MAP: Record<string, string> = {
  users_username_unique: "DUPLICATE_USERNAME",
  user_contacts_email_unique: "DUPLICATE_EMAIL",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { username, password, email, phoneNumber, fullName } =
      registerSchema.parse(body);

    await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(usersTable)
        .values({
          username,
          password_hash: await hashPassword(password),
        })
        .returning({ id: usersTable.id });

      await tx.insert(userContactsTable).values({
        user_id: user.id,
        full_name: fullName,
        email,
        phone_number: phoneNumber,
      });
    });

    return Response.json({ message: "REGISTER_SUCCESSFUL" }, { status: 200 });
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

    if (error instanceof DrizzleQueryError) {
      if (
        error.cause instanceof DatabaseError &&
        error.cause.code === "23505"
      ) {
        const field = error.cause.constraint
          ? CONSTRAINT_FIELD_MAP[error.cause.constraint]
          : "DUPLICATE_UNKNOWN";
        return Response.json(
          {
            error: field,
          },
          { status: 409 },
        );
      }
      return Response.json({ error: "UNKNOWN_ERROR" }, { status: 500 });
    }
  }
}
