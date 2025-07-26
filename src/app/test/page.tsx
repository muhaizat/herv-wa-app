import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Test UI Components</CardTitle>
          <CardDescription>This is a simple test page to verify UI components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Default Button
            </button>
            <button className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80">
              Secondary Button
            </button>
            <button className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
              Outline Button
            </button>
          </div>
          
          <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  )
}