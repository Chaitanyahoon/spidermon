import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/Chaitanyapatil.pdf") {
    return NextResponse.redirect(new URL("/ChaitanyaPatil.pdf", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Chaitanyapatil.pdf"],
};
