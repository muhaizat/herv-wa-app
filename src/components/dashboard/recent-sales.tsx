import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>WH</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Warehouse A</p>
          <p className="text-sm text-muted-foreground">
            Product Transfer
          </p>
        </div>
        <div className="ml-auto font-medium">+250</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Warehouse B</p>
          <p className="text-sm text-muted-foreground">Stock Adjustment</p>
        </div>
        <div className="ml-auto font-medium">-100</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>WC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Warehouse C</p>
          <p className="text-sm text-muted-foreground">New Stock</p>
        </div>
        <div className="ml-auto font-medium">+1,999</div>
      </div>
    </div>
  )
}
