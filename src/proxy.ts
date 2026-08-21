import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

const protectMembers = auth.middleware({ loginUrl: "/signin" });

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/members") {
    // Server actions on this page authenticate themselves. Skipping the
    // login redirect avoids turning an action POST into an HTML redirect.
    if (request.headers.has("Next-Action")) {
      return NextResponse.next();
    }
    return protectMembers(request);
  }

  if (pathname === "/" || pathname === "/signin") {
    const { data: session } = await auth.getSession();
    if (session?.user) {
      return NextResponse.redirect(new URL("/members", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/members", "/signin"],
};
