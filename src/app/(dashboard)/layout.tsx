import { MainNav } from "@/components/layout/main-nav"
import { UserNav } from "@/components/layout/user-nav"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
// Placeholder MobileNav, Boss boleh ganti dengan komponen sebenar kalau ada
const MobileNav = (props: any) => <div className="p-4">Mobile Menu</div>;

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Products",
    href: "/products",
    children: [
      {
        title: "All Products",
        href: "/products",
      },
      {
        title: "Categories",
        href: "/products/categories",
      },
      {
        title: "Add Product",
        href: "/products/new",
      },
    ],
  },
  {
    title: "Stock",
    href: "/stock",
    children: [
      {
        title: "Stock Levels",
        href: "/stock",
      },
      {
        title: "Stock Movement",
        href: "/stock/movement",
      },
      {
        title: "Stock Transfer",
        href: "/stock/transfer",
      },
    ],
  },
  {
    title: "Warehouses",
    href: "/warehouses",
    children: [
      {
        title: "All Warehouses",
        href: "/warehouses",
      },
      {
        title: "Add Warehouse",
        href: "/warehouses/new",
      },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    children: [
      {
        title: "Stock Report",
        href: "/reports/stock",
      },
      {
        title: "Movement Report",
        href: "/reports/movement",
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
  },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-2 sm:py-4">
          <div className="flex items-center gap-2 md:gap-6">
            {/* Mobile menu trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-accent focus:outline-none">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Navigasi utama aplikasi
                    </SheetDescription>
                  </SheetHeader>
                  <MobileNav items={navigationItems} />
                </SheetContent>
              </Sheet>
            </div>
            <h2 className="text-xl font-bold">HERV Inventory</h2>
            {/* Desktop nav only */}
            <div className="hidden md:block">
              <MainNav items={navigationItems} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
