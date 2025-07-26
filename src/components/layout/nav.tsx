import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()

  const items = [
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

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
