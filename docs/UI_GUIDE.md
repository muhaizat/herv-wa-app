# HERV Inventory System - UI Guide

## 📱 MVP Layout Designs

### Dashboard Layout
```
┌────────────────────────────────────────────┐
│ [Logo]     Search Bar         [User Menu]  │ <- Top Nav (sticky)
├────────┬───────────────────────────────────┤
│        │ Quick Stats Cards                 │
│        ├───────────────────────────────────┤
│        │ ┌─────────┐ ┌─────────┐          │
│  Side  │ │ Stock   │ │ Recent  │          │
│  Nav   │ │ Alerts  │ │ Activity│          │
│        │ └─────────┘ └─────────┘          │
│        │                                   │
│        │ Recent Stock Movements            │
│        │ [Table with visual indicators]    │
│        │                                   │
└────────┴───────────────────────────────────┘
```

### Products Page
```
┌────────────────────────────────────────────┐
│ Products                      [+ Add New]  │
├────────────────────────────────────────────┤
│ [Search] [Categories ▼] [Filter] [Sort ▼]  │
├────────────────────────────────────────────┤
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│ │Item│ │Item│ │Item│ │Item│ ...          │
│ │Card│ │Card│ │Card│ │Card│              │
│ └────┘ └────┘ └────┘ └────┘              │
│                                           │
│ [Load More / Pagination]                  │
└────────────────────────────────────────────┘

Product Card Design:
┌────────────────────┐
│    [Product IMG]   │
│  Product Name      │
│  SKU: #12345      │
│  Stock: 100 units  │
│  $99.99           │
└────────────────────┘
```

### Stock Movement Page
```
┌────────────────────────────────────────────┐
│ Stock Movement        [+ In] [+ Out]       │
├────────────────────────────────────────────┤
│ Date Range Picker  [Type ▼] [Location ▼]   │
├────────────────────────────────────────────┤
│ Movement Timeline (newest first)           │
│ ┌─────────────────────────────────────┐    │
│ │ 📦 Product A → Location B           │    │
│ │ Qty: +50  |  Date: 2025-07-25      │    │
│ └─────────────────────────────────────┘    │
│ ┌─────────────────────────────────────┐    │
│ │ 📤 Product B → Customer             │    │
│ │ Qty: -10  |  Date: 2025-07-24      │    │
│ └─────────────────────────────────────┘    │
└────────────────────────────────────────────┘
```

### Warehouses Page
```
┌────────────────────────────────────────────┐
│ Warehouses                   [+ Add New]   │
├────────────────────────────────────────────┤
│ [Search] [Status ▼] [Region ▼]            │
├────────────────────────────────────────────┤
│ Warehouse Grid View                        │
│ ┌──────────────┐ ┌──────────────┐         │
│ │ 🏭 WH-001    │ │ 🏭 WH-002    │         │
│ │ Main Store   │ │ North Branch │         │
│ │ Items: 234   │ │ Items: 156   │         │
│ │ Cap: 80%     │ │ Cap: 45%     │         │
│ └──────────────┘ └──────────────┘         │
└────────────────────────────────────────────┘
```

### Mobile Responsive Behavior
- Side nav collapses to bottom nav bar
- Cards stack vertically
- Tables become scrollable horizontally
- Filters collapse into a modal
- Action buttons become floating action button (FAB)
- Search becomes expandable
- Grid views become single column

## 🎨 Design System

### Colors
```css
/* Primary Colors */
--primary-50: #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;

/* Neutral Colors */
--neutral-50: #f8fafc;
--neutral-100: #f1f5f9;
--neutral-200: #e2e8f0;
--neutral-300: #cbd5e1;
--neutral-400: #94a3b8;
--neutral-500: #64748b;
--neutral-600: #475569;
--neutral-700: #334155;
--neutral-800: #1e293b;
--neutral-900: #0f172a;

/* Semantic Colors */
--success-500: #22c55e;
--warning-500: #eab308;
--error-500: #ef4444;
--info-500: #3b82f6;
```

### Typography
```css
/* Font Family */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Spacing
```css
--spacing-px: 1px;
--spacing-0: 0;
--spacing-0.5: 0.125rem;  /* 2px */
--spacing-1: 0.25rem;     /* 4px */
--spacing-2: 0.5rem;      /* 8px */
--spacing-3: 0.75rem;     /* 12px */
--spacing-4: 1rem;        /* 16px */
--spacing-5: 1.25rem;     /* 20px */
--spacing-6: 1.5rem;      /* 24px */
--spacing-8: 2rem;        /* 32px */
--spacing-10: 2.5rem;     /* 40px */
--spacing-12: 3rem;       /* 48px */
--spacing-16: 4rem;       /* 64px */
```

### Border Radius
```css
--radius-none: 0;
--radius-sm: 0.125rem;    /* 2px */
--radius-base: 0.25rem;   /* 4px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px */
--radius-xl: 0.75rem;     /* 12px */
--radius-2xl: 1rem;       /* 16px */
--radius-full: 9999px;
```

## 🧩 Components

### Button Variants
```tsx
// Primary Button
<Button variant="primary">
  Primary Action
</Button>

// Secondary Button
<Button variant="secondary">
  Secondary Action
</Button>

// Ghost Button
<Button variant="ghost">
  Ghost Action
</Button>

// Destructive Button
<Button variant="destructive">
  Delete
</Button>

// Outline Button
<Button variant="outline">
  Outline Action
</Button>
```

### Input Components
```tsx
// Text Input
<Input
  type="text"
  placeholder="Enter text"
  className="w-full"
/>

// Select Input
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Textarea
<Textarea
  placeholder="Enter long text"
  className="min-h-[100px]"
/>
```

### Data Display
```tsx
// Data Table
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item Name</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>
        <Button size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>

// Card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description here.</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

### Navigation
```tsx
// Breadcrumb
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/inventory">Inventory</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Items</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>

// Sidebar
<Sidebar>
  <SidebarItem
    icon={<HomeIcon />}
    href="/"
    label="Dashboard"
  />
  <SidebarItem
    icon={<BoxIcon />}
    href="/inventory"
    label="Inventory"
  />
</Sidebar>
```

## 📱 Responsive Design

### Breakpoints
```css
/* Tailwind Default Breakpoints */
sm: 640px   /* @media (min-width: 640px) */
md: 768px   /* @media (min-width: 768px) */
lg: 1024px  /* @media (min-width: 1024px) */
xl: 1280px  /* @media (min-width: 1280px) */
2xl: 1536px /* @media (min-width: 1536px) */
```

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

## 🎭 Dark Mode

### Color Variables
```css
/* Light Mode */
.light {
  --background: var(--neutral-50);
  --foreground: var(--neutral-900);
  
  --card: var(--neutral-100);
  --card-foreground: var(--neutral-900);
  
  --popover: var(--neutral-100);
  --popover-foreground: var(--neutral-900);
  
  --primary: var(--primary-600);
  --primary-foreground: var(--neutral-50);
  
  --secondary: var(--neutral-200);
  --secondary-foreground: var(--neutral-900);
}

/* Dark Mode */
.dark {
  --background: var(--neutral-900);
  --foreground: var(--neutral-50);
  
  --card: var(--neutral-800);
  --card-foreground: var(--neutral-50);
  
  --popover: var(--neutral-800);
  --popover-foreground: var(--neutral-50);
  
  --primary: var(--primary-400);
  --primary-foreground: var(--neutral-900);
  
  --secondary: var(--neutral-700);
  --secondary-foreground: var(--neutral-50);
}
```

## 🎯 Layout Patterns

### Dashboard Layout
```tsx
<div className="min-h-screen bg-background">
  {/* Sidebar */}
  <aside className="fixed w-64 h-full">
    <Sidebar />
  </aside>
  
  {/* Main Content */}
  <main className="ml-64 p-6">
    <header className="mb-6">
      <h1>Page Title</h1>
      <Breadcrumb />
    </header>
    
    <div className="grid gap-6">
      {/* Content */}
    </div>
  </main>
</div>
```

### Form Layout
```tsx
<Form className="space-y-6 max-w-2xl">
  <div className="grid gap-4 md:grid-cols-2">
    <FormField>
      <FormLabel>Field Label</FormLabel>
      <FormControl>
        <Input />
      </FormControl>
      <FormDescription>
        Helper text
      </FormDescription>
      <FormMessage />
    </FormField>
  </div>
  
  <Button type="submit">
    Submit
  </Button>
</Form>
```

### Grid Layout
```tsx
{/* Responsive Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

## 🎨 Animation Guidelines

### Transition Defaults
```css
--transition-all: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-colors: background-color, border-color, color, fill, stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-opacity: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-shadow: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-transform: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations
```tsx
// Fade In
.fade-in {
  opacity: 0;
  animation: fadeIn 0.3s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Slide In
.slide-in {
  transform: translateX(-100%);
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

## 🎯 Best Practices

### Accessibility
1. Use semantic HTML elements
2. Provide proper ARIA labels
3. Ensure keyboard navigation
4. Maintain proper color contrast
5. Include focus indicators

### Performance
1. Lazy load components
2. Optimize images
3. Minimize bundle size
4. Use proper caching
5. Implement virtual scrolling for large lists

### Responsive Design
1. Mobile-first approach
2. Use fluid typography
3. Implement proper breakpoints
4. Test on multiple devices
5. Consider touch targets

### Component Structure
1. Keep components small and focused
2. Maintain consistent props API
3. Document component usage
4. Include prop types/interfaces
5. Write unit tests

## 🧪 Testing Components

### Unit Tests
```tsx
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Visual Tests
Use Storybook for visual testing and component documentation:

```tsx
// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
```
