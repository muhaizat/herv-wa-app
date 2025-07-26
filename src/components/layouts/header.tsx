import { Search } from 'lucide-react'
import { UserNav } from './user-nav'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold">HERV WA</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-[200px] rounded-md border bg-background pl-8 pr-3 py-2 text-sm ring-offset-background 
                placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-ring md:w-[300px]"
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
