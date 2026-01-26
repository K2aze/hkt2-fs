import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "./db";
import { sessionsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  encryptedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}

export async function getCurrentUser() {
  const sessionId = (await cookies()).get("session_id")?.value;

  if (!sessionId) return null;

  const session = await db
    .select({
      userId: sessionsTable.user_id,
      exporesAt: sessionsTable.expires_at,
    })
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId))
    .limit(1)
    .then((response) => response[0]);

  if (!session || session.exporesAt < new Date()) {
    return null;
  }

  return session.userId;
}
