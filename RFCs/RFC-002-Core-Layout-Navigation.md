# RFC-002: Core Layout & Navigation

## Metadata

- **RFC ID**: RFC-002
- **Title**: Core Layout & Navigation
- **Status**: Draft
- **Created**: December 2024
- **Dependencies**: RFC-001 (Project Foundation & UI System)
- **Builds Upon**: RFC-001 foundation components và UI system
- **Enables**: RFC-003, RFC-004, RFC-005, RFC-006, RFC-007

## Summary

RFC-002 thiết lập layout system và navigation structure cho toàn bộ ứng dụng n8n-os. Bao gồm responsive layout components, navigation menu, footer, và routing foundation. RFC này tạo ra skeleton structure mà tất cả pages sẽ sử dụng.

## Features Addressed

### Primary Features

- **F1**: Homepage & Navigation (layout components)
- Basic routing structure với Next.js App Router
- Responsive design foundation
- Navigation menu với search functionality
- Footer với links và contact information

### Supporting Infrastructure

- Root layout component
- Header với navigation menu
- Footer component
- Mobile navigation drawer
- Breadcrumb navigation
- Page wrapper components

## Technical Approach

### 1. Layout Architecture

#### Root Layout Structure

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'n8n-os - Nền Tảng Workflow Automation',
  description: 'Chia sẻ, trải nghiệm và thương mại hóa workflow tự động hóa với n8n',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

### 2. Header & Navigation Components

#### Main Header Component

```typescript
// src/components/layout/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NavigationMenu } from '@/components/layout/NavigationMenu'
import { MobileNav } from '@/components/layout/MobileNav'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary" />
          <span className="hidden font-bold sm:inline-block">n8n-os</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu />
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm workflows..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>

          {/* Auth Buttons - Placeholder */}
          <Button variant="ghost" size="sm">
            Đăng nhập
          </Button>
          <Button size="sm">
            Đăng ký
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}
```

#### Navigation Menu Component

```typescript
// src/components/layout/NavigationMenu.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

const navigationItems = [
  {
    title: 'Trang chủ',
    href: ROUTES.HOME,
  },
  {
    title: 'Workflows',
    href: ROUTES.WORKFLOWS,
  },
  {
    title: 'Blog',
    href: ROUTES.BLOG,
  },
  {
    title: 'Về chúng tôi',
    href: '/about',
  },
  {
    title: 'Liên hệ',
    href: '/contact',
  },
]

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === item.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
```

#### Mobile Navigation Component

```typescript
// src/components/layout/MobileNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { title: 'Trang chủ', href: ROUTES.HOME },
  { title: 'Workflows', href: ROUTES.WORKFLOWS },
  { title: 'Blog', href: ROUTES.BLOG },
  { title: 'Về chúng tôi', href: '/about' },
  { title: 'Liên hệ', href: '/contact' },
]

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                pathname === item.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col space-y-2">
          <Button variant="outline" onClick={onClose}>
            Đăng nhập
          </Button>
          <Button onClick={onClose}>
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### 3. Footer Component

```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { Github, Twitter, Facebook, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  product: [
    { title: 'Workflows', href: '/workflows' },
    { title: 'Blog', href: '/blog' },
    { title: 'Tài liệu', href: '/docs' },
    { title: 'API', href: '/api-docs' },
  ],
  company: [
    { title: 'Về chúng tôi', href: '/about' },
    { title: 'Liên hệ', href: '/contact' },
    { title: 'Tuyển dụng', href: '/careers' },
    { title: 'Tin tức', href: '/news' },
  ],
  support: [
    { title: 'Trung tâm trợ giúp', href: '/help' },
    { title: 'Cộng đồng', href: '/community' },
    { title: 'Báo lỗi', href: '/report-bug' },
    { title: 'Yêu cầu tính năng', href: '/feature-request' },
  ],
  legal: [
    { title: 'Điều khoản sử dụng', href: '/terms' },
    { title: 'Chính sách bảo mật', href: '/privacy' },
    { title: 'Cookie Policy', href: '/cookies' },
    { title: 'Giấy phép', href: '/license' },
  ],
}

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Mail, href: 'mailto:contact@n8n-os.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Công ty</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Pháp lý</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Logo & Copyright */}
          <div className="flex items-center space-x-4">
            <div className="h-6 w-6 rounded bg-primary" />
            <span className="text-sm text-muted-foreground">
              © 2024 n8n-os. Tất cả quyền được bảo lưu.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <Button
                key={social.href}
                variant="ghost"
                size="sm"
                asChild
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### 4. Page Wrapper Components

#### Container Component

```typescript
// src/components/layout/Container.tsx
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({
  children,
  className,
  size = 'lg'
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}
```

#### Page Header Component

```typescript
// src/components/layout/PageHeader.tsx
import { Container } from '@/components/layout/Container'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Array<{ title: string; href?: string }>
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children
}: PageHeaderProps) {
  return (
    <div className="border-b bg-muted/40">
      <Container className="py-8">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>

          {children && (
            <div className="flex items-center space-x-2">
              {children}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
```

#### Breadcrumb Component

```typescript
// src/components/layout/Breadcrumb.tsx
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  title: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-muted-foreground mb-4', className)}>
      <Link
        href="/"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground"
            >
              {item.title}
            </Link>
          ) : (
            <span className="text-foreground">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
```

### 5. Routing Structure

#### Basic Page Templates

```typescript
// src/app/page.tsx (Homepage placeholder)
import { Container } from '@/components/layout/Container'

export default function HomePage() {
  return (
    <Container className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Chào mừng đến với n8n-os
        </h1>
        <p className="text-xl text-muted-foreground">
          Nền tảng chia sẻ và thương mại hóa workflow automation
        </p>
      </div>
    </Container>
  )
}

// src/app/workflows/page.tsx (Workflows placeholder)
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/layout/Container'

export default function WorkflowsPage() {
  return (
    <>
      <PageHeader
        title="Workflows"
        description="Khám phá các workflow automation tuyệt vời"
        breadcrumbs={[
          { title: 'Workflows' }
        ]}
      />
      <Container className="py-8">
        <p>Workflows content sẽ được implement trong RFC-004</p>
      </Container>
    </>
  )
}

// src/app/blog/page.tsx (Blog placeholder)
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/layout/Container'

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Tin tức và hướng dẫn về automation"
        breadcrumbs={[
          { title: 'Blog' }
        ]}
      />
      <Container className="py-8">
        <p>Blog content sẽ được implement trong RFC-004</p>
      </Container>
    </>
  )
}
```

## Acceptance Criteria

### Layout System

- [ ] Root layout component implemented với proper structure
- [ ] Header component với responsive navigation
- [ ] Footer component với all required links
- [ ] Mobile navigation working properly
- [ ] Container component với size variants
- [ ] Page header component với breadcrumbs

### Navigation

- [ ] Desktop navigation menu functional
- [ ] Mobile navigation drawer working
- [ ] Active state highlighting current page
- [ ] Search input placeholder implemented
- [ ] Breadcrumb navigation component ready

### Responsive Design

- [ ] Mobile-first responsive design implemented
- [ ] Navigation collapses properly on mobile
- [ ] Touch-friendly mobile interface
- [ ] Proper spacing và typography scales

### Routing Foundation

- [ ] Basic page structure created
- [ ] Placeholder pages for main routes
- [ ] Proper Next.js App Router usage
- [ ] SEO-friendly page structure

### Performance

- [ ] Sticky header performance optimized
- [ ] Mobile menu animations smooth
- [ ] No layout shift issues
- [ ] Proper loading states

## Technical Challenges

### Challenge 1: Mobile Navigation UX

**Issue**: Creating smooth mobile navigation experience
**Solution**: Use CSS animations và proper state management
**Risk Level**: Low

### Challenge 2: Responsive Search

**Issue**: Search input behavior across different screen sizes
**Solution**: Adaptive input sizing và mobile-optimized UX
**Risk Level**: Low

### Challenge 3: Navigation State Management

**Issue**: Managing active states và mobile menu state
**Solution**: Use Next.js usePathname và local state
**Risk Level**: Low

## Dependencies

### External Dependencies

- Next.js navigation hooks (usePathname, useRouter)
- Lucide React icons
- ShadCN UI components (từ RFC-001)

### Internal Dependencies

- RFC-001: UI components, utilities, error handling

## Future Considerations

### Extensibility

- Navigation menu có thể extend với dropdown menus
- Header có thể add user avatar và notifications
- Footer có thể add newsletter signup
- Breadcrumbs có thể add structured data

### Performance Optimizations

- Navigation menu virtualization cho large menus
- Search input debouncing và autocomplete
- Mobile menu lazy loading
- Header scroll behavior optimization

---

**RFC Status**: Ready for Implementation  
**Estimated Effort**: 1-2 days  
**Priority**: High (Foundation)  
**Next RFC**: RFC-003 (Homepage & Static Content)
