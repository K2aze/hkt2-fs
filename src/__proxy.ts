import { db } from "@/lib/db";
import { sessionsTable } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

export async function proxy(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")?.value;

  if (!sessionId) {
    const newSessionId = crypto.randomUUID();

    await db.insert(sessionsTable).values({
      id: newSessionId,
      user_id: null,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    });

    const response = NextResponse.next();
    response.cookies.set("session_id", newSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }
}
