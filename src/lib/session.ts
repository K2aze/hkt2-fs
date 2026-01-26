import { cookies } from "next/headers";
import { db } from "./db";
import { sessionsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function requireSession() {
  const sessionId = (await cookies()).get("session_id")?.value;

  if (!sessionId) {
    throw new Error("SESSION_REQUIRED");
  }

  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId))
    .limit(1);

  if (!session) {
    throw new Error("INVALID_SESSION");
  }

  return session;
}
