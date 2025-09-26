import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // No interferir con requests de Next.js internos
  if (req.nextUrl.pathname.includes('_next') || 
      req.nextUrl.pathname.includes('api') ||
      req.nextUrl.searchParams.has('_rsc')) {
    return NextResponse.next();
  }
  
  const token = req.cookies.get("access_token")?.value;

  //si no hay token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*"],
};
