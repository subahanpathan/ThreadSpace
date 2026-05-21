export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/communities/create",
    "/r/:path*/create",
    "/settings/:path*",
    "/api/proxy/:path*", // Protect any proxy/upload routes
  ],
}
