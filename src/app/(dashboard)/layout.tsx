import { MainNav } from "@/components/layout/main-nav"
import { UserNav } from "@/components/layout/user-nav"

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
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <h2 className="text-xl font-bold">HERV Inventory</h2>
            <MainNav items={navigationItems} />
          </div>
          <UserNav />
        </div>
      </header>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
