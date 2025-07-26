import { Header } from './header'
import { MobileNav } from './mobile-nav'
import { Sidebar } from './sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Desktop Sidebar - hidden on small screens */}
      <div className="fixed inset-y-0 z-50 hidden h-full w-64 flex-col border-r bg-background md:flex">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <Header />
        <main className="container flex-1 space-y-4 p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav - visible on small screens */}
      <nav className="fixed inset-x-0 bottom-0 z-50 h-16 border-t bg-background p-2 md:hidden">
        <MobileNav />
      </nav>
    </div>
  )
}
