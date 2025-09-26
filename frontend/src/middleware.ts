import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // No interferir con requests de Next.js internos
  if (
    req.nextUrl.pathname.includes("_next") ||
    req.nextUrl.pathname.includes("api") ||
    req.nextUrl.searchParams.has("_rsc")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;
  const dominio = req.cookies
    .getAll("access_token")
    ?.values()
    .map((value) => value);

  console.log("Dominio de todos: ", dominio);

  //si no hay token → redirect
  if (!token) {
    console.log("no se encontro el token");

    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*"],
};
