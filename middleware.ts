import { NextResponse, type NextRequest } from "next/server";

// Block the Sanity Studio in production — only accessible during local development.
// Editors should use sanity.io/manage or run the dev server locally.
export function middleware(req: NextRequest) {
  if (
    process.env.NODE_ENV !== "development" &&
    req.nextUrl.pathname.startsWith("/studio")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/studio/:path*"] };
