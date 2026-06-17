import { Navbar } from "@/components/layout/Navbar"
import { Sidebar } from "@/components/layout/Sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto flex pt-14 px-4 sm:px-6 lg:px-8">
        <Sidebar className="hidden lg:block w-64 flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)] pb-10" />
        <main className="flex-1 min-w-0 py-6 lg:pl-8">
          {children}
        </main>
      </div>
    </div>
  )
}
