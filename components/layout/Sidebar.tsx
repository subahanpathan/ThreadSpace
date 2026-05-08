import Link from "next/link"
import { cn } from "@/lib/utils"
import { Home, Users, Plus, TrendingUp } from "lucide-react"

export function Sidebar({ className }: { className?: string }) {
  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Popular", href: "/popular", icon: TrendingUp },
    { label: "Communities", href: "/communities", icon: Users },
  ]

  return (
    <aside className={cn("sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10", className)}>
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-500 uppercase">
            Feeds
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-500 uppercase">
            Communities
          </h2>
          <div className="space-y-1">
            <Link
              href="/communities/create"
              className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              <Plus className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900" />
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
