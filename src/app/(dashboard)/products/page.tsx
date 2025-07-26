import { DataTable } from "@/components/products/data-table"
import { columns } from "@/components/products/columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductsPage() {
  // This will be replaced with real data from the database
  const data = [
    {
      id: "1",
      name: "Product 1",
      sku: "SKU001",
      category: "Category A",
      price: 99.99,
      stockLevel: 100,
      status: "In Stock",
    },
    // Add more sample data here
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/products/new">Add Product</Link>
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
