import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth"; // Assuming this is your NextAuth.js config
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define routes that are only accessible to admins
  const adminRoutes = ["/admin", "/dashboard"];

  // Check if the requested path is an admin route
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Get the session. Using auth() is the modern way in Next.js 14 App Router.
  // It works in middleware, Server Components, and API Routes.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 1. If the user is not logged in
  if (!session) {
    // Redirect any unauthenticated user trying to access a protected route to sign-in
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 2. If the user is logged in but tries to access an admin-only route
  if (isAdminRoute && session.user?.role !== "ADMIN") {
    // Redirect them to a "not authorized" page or the home page
    // A dedicated page provides a better user experience.
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 3. If the user is authenticated (and is an admin for admin routes),
  // allow the request to proceed.
  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - / (the root path, assuming it's public)
   * - /sign-in, /sign-up, /unauthorized (public auth-related pages)
   */
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/articles/:path*",
    "/profile/:path*",
    // Add any other routes you want to protect here
  ],
};
