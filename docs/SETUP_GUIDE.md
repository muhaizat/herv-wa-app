# Project Setup Guide

## Tech Stack & Dependencies

- Next.js (App Router)
- TailwindCSS
- shadcn/ui
- TypeScript
- pnpm (Package Manager)

## Initial Setup

1. Create new Next.js project with App Router:
```bash
pnpm create next-app@latest
```

2. Install core dependencies:
```bash
pnpm add @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react
```

3. Install Tailwind CSS and its dependencies:
```bash
pnpm add -D tailwindcss@3.3.0 postcss@8.4.23 autoprefixer@10.4.14
```

Note: Version numbers are important! Using incompatible versions can cause PostCSS errors.

4. Create Tailwind configuration:
```bash
pnpx tailwindcss init -p
```

5. Configure `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // ... other color configurations
      },
    },
  },
  plugins: [],
}
```

6. Create `globals.css` in `src/app`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    /* ... other CSS variables */
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark theme variables */
  }
}
```

7. Setup Theme Provider:
```tsx
// src/components/providers/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

## Common Issues & Solutions

1. **PostCSS Plugin Error**
   - Error: "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin"
   - Solution: Make sure you're using compatible versions:
     - tailwindcss@3.3.0
     - postcss@8.4.23
     - autoprefixer@10.4.14

2. **Theme Not Working**
   - Check `globals.css` is imported in root layout
   - Make sure ThemeProvider is wrapping your app
   - CSS variables are properly defined

3. **UI Components Not Styled**
   - Verify Tailwind configuration includes all component paths
   - Check `globals.css` is imported
   - Clear `.next` cache and node_modules/.cache

## Best Practices

1. Use pnpm for consistent package management
2. Keep dependencies versions in sync
3. Clear cache when making major configuration changes:
```bash
rm -rf .next node_modules/.cache
pnpm install
pnpm dev
```

## Testing UI Setup

Create a test page (`src/app/test/page.tsx`) to verify components:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Test UI Components</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  )
}
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
