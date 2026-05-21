import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { MobileSidebar } from "./MobileSidebar"
import { SearchBar } from "./SearchBar"

export async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="fixed top-0 inset-x-0 h-14 glass z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all">
      <div className="flex items-center gap-4 flex-1">
        <MobileSidebar />
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <span className="text-primary-foreground font-bold text-xl">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block font-serif bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">ThreadSpace</span>
        </Link>
      </div>

      <SearchBar />

      <div className="flex items-center gap-4 flex-1 justify-end">
        {session ? (
          <div className="flex items-center gap-3">
            <Link 
              href={`/u/${session.user.username}`}
              className="text-sm font-medium hidden sm:block hover:text-primary transition-colors"
            >
              u/{session.user.username}
            </Link>
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
              <Button className="text-sm shadow-md hover:shadow-lg">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
