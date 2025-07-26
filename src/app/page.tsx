import { DashboardLayout } from '@/components/layouts/dashboard-layout'

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="rounded-lg border bg-card p-6">
          <h1 className="text-2xl font-bold">Welcome to HERV WA</h1>
          <p className="text-muted-foreground">
            Your centralized inventory management system.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
