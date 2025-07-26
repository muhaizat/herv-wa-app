# HERV Inventory System - Project Guide

## 🎯 Project Overview
Modular inventory system yang boleh scale jadi full ERP SaaS dengan multi-tenant support.

## � Technology Stack

### Frontend
- **Next.js 13/14** - React framework dengan App Router
- **TypeScript** - Type safety & better developer experience
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Reusable components
- **Tanstack Query** - Data fetching & state management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling dengan validation
- **Zod** - Schema validation

### Backend & Database
- **Supabase** 
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Edge Functions
  - Storage

### AI/ML Integration
- **OpenAI API** - GPT-4 untuk natural language processing
- **Replicate** - Untuk model deployment
- **Langchain** - AI/ML pipeline
- **Pinecone** - Vector database untuk semantic search

### Development Tools
- **Git & GitHub**
  - Version control
  - GitHub Actions untuk CI/CD
  - GitHub Projects untuk project management
  - Conventional commits
  - Branch protection rules

- **VS Code**
  - ESLint
  - Prettier
  - GitLens
  - Tailwind CSS IntelliSense

### Deployment & Monitoring
- **Vercel**
  - Production deployments
  - Preview deployments
  - Analytics
  - Edge Functions
  - Environment variables
  
- **Error Tracking & Monitoring**
  - Sentry - Error tracking
  - Uptime Robot - Uptime monitoring
  - LogRocket - Session replay & monitoring

### Testing
- **Jest** - Unit testing
- **Testing Library** - Component testing
- **Cypress** - E2E testing
- **MSW** - API mocking

## �📋 Progress Tracking
- [x] Initial project setup
- [ ] Basic auth flow
- [ ] Core inventory features
- [ ] AI integration
- [ ] Multi-tenant support
- [ ] White labeling

## 🏗 Architecture Overview

### File Structure
```
/src
  /app
    /auth
      /login
      /register
      /forgot-password
    /dashboard
      /inventory
        /items
        /categories
        /movements
      /reports
      /settings
    /api
      /trpc - type safe API routes
  /components
    /ui - reusable UI components
    /features - feature specific components
    /layouts - layout components
  /lib
    /supabase - database utilities
    /ai - AI integration
    /utils - helper functions
    /validation - schema validation
  /types - TypeScript types/interfaces
  /hooks - custom hooks
  /styles - global styles
  /config - app configuration

/docs
  PROJECT_GUIDE.md
  UI_GUIDE.md
  API_DOCS.md
```

### Database Schema

```sql
-- Core tables with multi-tenant support
organizations (
  id uuid primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  settings jsonb default '{}'::jsonb,
  subscription_tier text default 'free',
  is_active boolean default true
);

users (
  id uuid references auth.users primary key,
  org_id uuid references organizations,
  full_name text,
  role text default 'user',
  settings jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

tenants (
  id uuid primary key,
  org_id uuid references organizations,
  domain text unique,
  subdomain text unique,
  branding jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Inventory Core
inventory_categories (
  id uuid primary key,
  org_id uuid references organizations,
  name text not null,
  description text,
  parent_id uuid references inventory_categories(id),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

inventory_items (
  id uuid primary key,
  org_id uuid references organizations,
  category_id uuid references inventory_categories,
  name text not null,
  sku text,
  description text,
  quantity numeric default 0,
  unit text,
  min_quantity numeric default 0,
  max_quantity numeric,
  reorder_point numeric,
  cost numeric,
  price numeric,
  metadata jsonb default '{}'::jsonb,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

inventory_movements (
  id uuid primary key,
  org_id uuid references organizations,
  item_id uuid references inventory_items,
  type text not null check (type in ('in', 'out', 'adjustment')),
  quantity numeric not null,
  reference_type text,
  reference_id uuid,
  notes text,
  created_by uuid references users,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Extensions for future modules
locations (
  id uuid primary key,
  org_id uuid references organizations,
  name text not null,
  type text,
  address jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

suppliers (
  id uuid primary key,
  org_id uuid references organizations,
  name text not null,
  contact_info jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## 🔌 Modular Features

### Core Features (MVP)
1. Authentication & Authorization
   - Login/Register
   - Role-based access
   - Organization management

2. Inventory Management
   - Item CRUD
   - Category management
   - Stock movements
   - Basic reporting

3. AI Integration Points
   - Smart Search
   - Inventory predictions
   - Image recognition
   - Automated categorization

### Future Modules
1. Procurement Module
   - Purchase orders
   - Supplier management
   - Order tracking

2. Sales Module
   - Sales orders
   - Customer management
   - Invoicing

3. Warehouse Module
   - Multiple locations
   - Bin locations
   - Stock transfers

4. Reports & Analytics
   - Custom reports
   - Dashboard analytics
   - Export capabilities

5. Integration Module
   - API endpoints
   - Webhook support
   - Third-party integrations

## 🤖 AI Features Implementation

### 1. Smart Search
- Natural language processing for inventory search
- Semantic search capabilities
- Auto-complete & suggestions

### 2. Inventory Intelligence
- Stock level predictions
- Demand forecasting
- Anomaly detection
- Reorder recommendations

### 3. Computer Vision
- Image-based item recognition
- Barcode/QR code scanning
- Damage detection
- Stock counting assistance

### 4. Process Automation
- Automated categorization
- Smart tagging
- Document processing
- Invoice extraction

## 🔒 Security Implementation

### Row Level Security (RLS)
```sql
-- Example RLS policies
alter table inventory_items enable row level security;

create policy "Users can view their organization's items"
  on inventory_items for select
  using (org_id = auth.jwt() -> 'org_id');

create policy "Only admins can create/update items"
  on inventory_items for insert
  with check (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );
```

## 📈 Scaling Strategy

### Multi-tenant Implementation
1. Data Isolation
   - Org ID in every table
   - RLS policies
   - Tenant-specific schemas (optional)

2. Resource Management
   - Rate limiting
   - Usage monitoring
   - Quota management

### White Label Features
1. Customization
   - Custom domains
   - Branding settings
   - Email templates
   - UI themes

2. Tenant Management
   - Tenant provisioning
   - Configuration
   - Analytics

## 🚀 Deployment Strategy

### Infrastructure
- Vercel (Frontend)
- Supabase (Backend)
- Edge Functions (AI/ML)
- S3 Compatible Storage

### CI/CD Pipeline
1. Testing
   - Unit tests
   - Integration tests
   - E2E tests

2. Deployment Stages
   - Development
   - Staging
   - Production

## 📝 Coding Standards

### TypeScript
- Strict type checking
- Interface first approach
- Proper error handling

### React/Next.js
- Server components where possible
- Client components when needed
- Proper state management
- Performance optimization

### API Design
- RESTful principles
- GraphQL (future)
- Proper error responses
- Rate limiting
- Documentation

## 🧪 Testing Strategy

### Unit Testing
- Component testing
- Utility function testing
- API route testing

### Integration Testing
- API integration tests
- Database operations
- Auth flows

### E2E Testing
- Critical user paths
- Cross-browser testing
- Performance testing
