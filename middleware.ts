import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is authenticated for protected routes
  const authToken = request.cookies.get("auth-token")?.value
  const isAuthenticated = !!authToken

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/onboarding"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Admin routes
  const adminRoutes = ["/admin"]
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect non-admin users from admin routes
  if (isAdminRoute && authToken !== "admin-token") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirect authenticated users from auth pages
  const authPages = ["/login", "/register"]
  const isAuthPage = authPages.includes(pathname)

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
