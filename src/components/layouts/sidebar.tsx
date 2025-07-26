import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-semibold">HERV WA</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 p-2">
        <MainNav />
      </div>
    </div>
  )
}
