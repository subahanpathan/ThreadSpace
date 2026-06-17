import authMiddleware from "next-auth/middleware"

export async function proxy(request: any, event: any) {
  return authMiddleware(request, event)
}

export const config = {
  matcher: [
    "/communities/create",
    "/r/:path*/create",
    "/settings/:path*",
    "/api/proxy/:path*", // Protect any proxy/upload routes
  ],
}
