import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const FRONTEND_ORIGIN = "http://localhost:5173"; // Vite FE

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 API → CORS
  if (pathname.startsWith("/api")) {
    const res = NextResponse.next();

    res.headers.set("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS",
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    // Preflight
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: res.headers,
      });
    }

    return res;
  }

  // 🔹 Page / locale → next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/api/:path*", // API (CORS)
    "/((?!trpc|_next|_vercel|.*\\..*).*)", // Pages (i18n)
  ],
};
