import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="fixed top-0 inset-x-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <span className="text-xl font-bold tracking-tight hidden sm:block font-serif">ThreadSpace</span>
      </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden sm:block">u/{session.user.username}</span>
            <Link href="/api/auth/signout">
              <Button variant="ghost" className="text-sm">Sign Out</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-sm">Log In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="text-sm">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
