import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/members") {
    // Server actions on this page authenticate themselves. Skipping the
    // login redirect avoids turning an action POST into an HTML redirect.
    if (request.headers.has("Next-Action")) {
      return NextResponse.next();
    }
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/" || pathname === "/signin") {
    const session = await auth.api.getSession({ headers: request.headers });
    if (session?.user) {
      return NextResponse.redirect(new URL("/members", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/members", "/signin"],
};
