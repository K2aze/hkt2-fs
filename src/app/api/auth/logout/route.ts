import { db } from "@/lib/db";
import { sessionsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

//Remove session
export async function POST() {
  const sessionId = (await cookies()).get("session_id")?.value;
  if (sessionId) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
    (await cookies()).delete("session_id");
    return new Response(null, { status: 204 });
  } else {
    return new Response(null, { status: 204 });
  }
}
