# RFC-001: Project Foundation & UI System

## Metadata

- **RFC ID**: RFC-001
- **Title**: Project Foundation & UI System
- **Status**: Draft
- **Created**: December 2024
- **Dependencies**: None (Foundation RFC)
- **Builds Upon**: None
- **Enables**: RFC-002, RFC-003, RFC-004, RFC-005, RFC-006, RFC-007

## Summary

RFC-001 thiết lập nền tảng kỹ thuật cho dự án n8n-os, bao gồm project setup, development tools, ShadCN UI component library, error handling foundation, và performance optimization setup. Đây là RFC đầu tiên và quan trọng nhất, tạo ra foundation cho tất cả các RFC tiếp theo.

## Features Addressed

### Primary Features

- **F17**: Error Handling & Loading States (foundation setup)
- **F18**: Performance Optimization (initial setup)
- Project structure và development environment
- UI component library với ShadCN UI
- TypeScript configuration với strict mode
- Development tools (ESLint, Prettier, Husky)

### Supporting Infrastructure

- Next.js 14+ project setup với App Router
- Tailwind CSS configuration
- Core utility functions
- Type definitions foundation
- Testing framework setup
- Build và deployment configuration

## Technical Approach

### 1. Project Setup & Configuration

#### Next.js Project Structure

```
n8n-os/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # Shared components
│   │   ├── ui/                 # ShadCN UI components
│   │   ├── common/             # Common components
│   │   ├── forms/              # Form components
│   │   └── layout/             # Layout components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities và helpers
│   │   ├── utils.ts            # General utilities
│   │   ├── constants.ts        # App constants
│   │   └── validations.ts      # Zod schemas
│   ├── types/                  # TypeScript definitions
│   │   ├── workflow.ts         # Workflow types
│   │   ├── user.ts             # User types
│   │   └── api.ts              # API types
│   └── styles/                 # Additional styles
├── public/                     # Static assets
├── tests/                      # Test files
├── docs/                       # Documentation
├── .env.local                  # Environment variables
├── .env.example                # Environment template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

#### Package.json Dependencies

```json
{
  "name": "n8n-os",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.294.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0"
  }
}
```

### 2. TypeScript Configuration

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. ShadCN UI Setup

#### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

#### Core UI Components

```typescript
// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 4. Core Utilities & Constants

#### lib/utils.ts

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
```

#### lib/constants.ts

```typescript
export const ROUTES = {
  HOME: '/',
  WORKFLOWS: '/workflows',
  WORKFLOW_DETAIL: '/workflows/[slug]',
  BLOG: '/blog',
  BLOG_POST: '/blog/[slug]',
  PROFILE: '/profile',
  FAVORITES: '/profile/favorites',
  HISTORY: '/profile/history',
  ABOUT: '/about',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const

export const WORKFLOW_CATEGORIES = [
  'sales',
  'marketing',
  'productivity',
  'data-processing',
  'e-commerce',
  'social-media',
  'finance',
  'hr',
] as const

export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const

export const DEMO_LIMITS = {
  MAX_EXECUTIONS_PER_HOUR: 5,
  TIMEOUT_SECONDS: 30,
  MAX_INPUT_SIZE: 1024 * 1024, // 1MB
} as const

export const API_ENDPOINTS = {
  WORKFLOWS: '/api/workflows',
  WORKFLOW_DETAIL: '/api/workflows/[id]',
  DEMO: '/api/demo',
  BLOG: '/api/blog',
  USER: '/api/user',
} as const
```

### 5. Error Handling Foundation

#### components/common/ErrorBoundary.tsx

```typescript
'use client'

import React, { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Đã xảy ra lỗi</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Thử lại
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
```

#### components/common/LoadingSpinner.tsx

```typescript
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary',
        sizeClasses[size],
        className
      )}
    />
  )
}
```

### 6. Type Definitions Foundation

#### types/workflow.ts

```typescript
export interface Workflow {
  id: string
  slug: string
  title: string
  description: string
  category: WorkflowCategory
  difficulty: DifficultyLevel
  price: number
  rating: number
  reviewCount: number
  downloadCount: number
  demoCount: number
  screenshots: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
  author?: {
    id: string
    name: string
    avatar?: string
  }
}

export type WorkflowCategory =
  | 'sales'
  | 'marketing'
  | 'productivity'
  | 'data-processing'
  | 'e-commerce'
  | 'social-media'
  | 'finance'
  | 'hr'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'
```

#### types/user.ts

```typescript
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type UserRole = 'user' | 'admin' | 'moderator'

export interface UserProfile extends User {
  bio?: string
  website?: string
  location?: string
  favoriteWorkflows: string[]
  downloadHistory: string[]
}
```

#### types/api.ts

```typescript
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: any
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

## Acceptance Criteria

### ✅ Project Setup

- [ ] Next.js 14+ project được khởi tạo với App Router
- [ ] TypeScript strict mode được cấu hình
- [ ] Tailwind CSS và ShadCN UI được setup
- [ ] ESLint, Prettier, Husky được cấu hình
- [ ] Project structure tuân thủ RULES.md

### ✅ Core Components

- [ ] Button, Input, Card components từ ShadCN UI
- [ ] ErrorBoundary component hoạt động
- [ ] LoadingSpinner component
- [ ] Utility functions (formatCurrency, truncateText, slugify)
- [ ] Constants file với routes và categories

### ✅ Type Definitions

- [ ] Workflow types hoàn chỉnh
- [ ] User types hoàn chỉnh
- [ ] API response types
- [ ] TypeScript strict mode không có errors

### ✅ Development Tools

- [ ] Jest testing framework setup
- [ ] ESLint rules tuân thủ Next.js best practices
- [ ] Prettier configuration
- [ ] Husky pre-commit hooks
- [ ] Package.json scripts hoạt động

### ✅ Performance Foundation

- [ ] Next.js optimization được cấu hình
- [ ] Bundle analyzer setup
- [ ] Image optimization ready
- [ ] Font optimization với next/font

## Implementation Notes

### Development Workflow

1. Setup project với `npx create-next-app@latest`
2. Cấu hình TypeScript strict mode
3. Install và setup ShadCN UI
4. Tạo core components và utilities
5. Setup testing framework
6. Cấu hình development tools
7. Tạo type definitions
8. Test build và development server

### Quality Assurance

- Tất cả components phải có TypeScript types
- ESLint clean với zero warnings
- Build thành công không có errors
- Core utilities có unit tests
- Documentation đầy đủ trong README.md

### Future Considerations

- Component library có thể mở rộng
- Type definitions có thể extend
- Utility functions có thể thêm
- Performance monitoring setup sẵn sàng
- Testing infrastructure có thể scale

---

**Dependencies**: None (Foundation RFC)  
**Enables**: All subsequent RFCs (002-007)  
**Estimated Effort**: 2-3 days  
**Risk Level**: Low (Standard setup)
