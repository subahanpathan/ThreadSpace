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
    <aside className={cn("overflow-y-auto", className)}>
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Feeds
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                <item.icon className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Communities
          </h2>
          <div className="space-y-1">
            <Link
              href="/communities/create"
              className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Plus className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
