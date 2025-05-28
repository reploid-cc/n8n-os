# RFC-003: Homepage & Static Content

## Metadata

- **RFC ID**: RFC-003
- **Title**: Homepage & Static Content
- **Status**: Draft
- **Created**: December 2024
- **Dependencies**: RFC-002 (Core Layout & Navigation)
- **Builds Upon**: RFC-002 layout system và navigation
- **Enables**: RFC-004, RFC-005, RFC-006, RFC-007

## Summary

RFC-003 triển khai trang chủ với featured workflows, latest blog posts, và các static content pages. Tạo ra landing page hấp dẫn và informative để thu hút users và giới thiệu platform.

## Features Addressed

### Primary Features

- **F1**: Homepage & Navigation (content implementation)
- **F11**: Blog System (basic structure)
- Featured workflows showcase
- Hero section với value proposition
- Statistics và testimonials
- Call-to-action sections

### Supporting Pages

- About page
- Contact page
- Terms of service
- Privacy policy
- Help/FAQ page

## Technical Approach

### 1. Homepage Components

#### Hero Section

```typescript
// src/components/home/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <Container>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Nền tảng chia sẻ
            <span className="text-primary"> workflow automation</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Khám phá, trải nghiệm và triển khai các workflow n8n được tối ưu hóa.
            Tiết kiệm thời gian với các giải pháp automation đã được kiểm chứng.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/workflows">Khám phá Workflows</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/demo">Xem Demo</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

#### Featured Workflows Section

```typescript
// src/components/home/FeaturedWorkflows.tsx
interface FeaturedWorkflowsProps {
  workflows: Workflow[]
}

export function FeaturedWorkflows({ workflows }: FeaturedWorkflowsProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Workflows Nổi Bật</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Các workflow được sử dụng nhiều nhất và đánh giá cao
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/workflows">Xem tất cả workflows</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
```

#### Statistics Section

```typescript
// src/components/home/StatsSection.tsx
const stats = [
  { label: 'Workflows', value: '500+' },
  { label: 'Người dùng', value: '10K+' },
  { label: 'Demo thực hiện', value: '50K+' },
  { label: 'Đánh giá 5 sao', value: '95%' },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

### 2. Static Pages Implementation

#### About Page

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Về n8n-os"
        description="Nền tảng chia sẻ và thương mại hóa workflow automation"
        breadcrumbs={[{ title: 'Về chúng tôi' }]}
      />
      <Container className="py-12">
        <div className="prose prose-lg max-w-none">
          <h2>Sứ mệnh của chúng tôi</h2>
          <p>
            n8n-os được tạo ra để giải quyết khoảng cách giữa nhu cầu tự động hóa
            và khả năng triển khai thực tế của các doanh nghiệp vừa và nhỏ.
          </p>
          {/* More content */}
        </div>
      </Container>
    </>
  )
}
```

### 3. Mock Data Service

```typescript
// src/lib/mock-data.ts
export const mockFeaturedWorkflows: Workflow[] = [
  {
    id: '1',
    slug: 'shopee-to-google-sheets',
    title: 'Đồng bộ đơn hàng Shopee với Google Sheets',
    description: 'Tự động cập nhật đơn hàng từ Shopee vào Google Sheets',
    category: 'e-commerce',
    difficulty: 'beginner',
    price: 0,
    rating: 4.8,
    reviewCount: 124,
    downloadCount: 1250,
    demoCount: 890,
    screenshots: ['/images/workflows/shopee-sheets-1.png'],
    tags: ['shopee', 'google-sheets', 'e-commerce'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  // More mock workflows...
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-n8n-automation',
    title: 'Bắt đầu với n8n Automation',
    excerpt: 'Hướng dẫn từ A-Z để tạo workflow automation đầu tiên',
    content: '...',
    author: 'Admin',
    publishedAt: '2024-01-10',
    category: 'tutorial',
    tags: ['n8n', 'automation', 'tutorial'],
  },
  // More mock blog posts...
]
```

## Acceptance Criteria

### Homepage Implementation

- [ ] Hero section với compelling value proposition
- [ ] Featured workflows grid với mock data
- [ ] Statistics section với key metrics
- [ ] Latest blog posts section
- [ ] Call-to-action buttons functional
- [ ] Responsive design across all devices

### Static Pages

- [ ] About page với company information
- [ ] Contact page với contact form
- [ ] Terms of service page
- [ ] Privacy policy page
- [ ] Help/FAQ page với common questions

### Content Management

- [ ] Mock data service cho workflows và blogs
- [ ] Proper SEO meta tags
- [ ] Structured data markup
- [ ] Social sharing meta tags

### Performance

- [ ] Page load time <3 seconds
- [ ] Images optimized với next/image
- [ ] Proper caching headers
- [ ] Core Web Vitals optimized

## API Contracts

### Homepage Data

```typescript
// GET /api/homepage
interface HomepageData {
  featuredWorkflows: Workflow[]
  latestBlogs: BlogPost[]
  stats: {
    totalWorkflows: number
    totalUsers: number
    totalDemos: number
    averageRating: number
  }
}
```

## Dependencies

### External Dependencies

- Next.js Image optimization
- Mock data cho development

### Internal Dependencies

- RFC-002: Layout components, navigation
- RFC-001: UI components, utilities

---

**RFC Status**: Ready for Implementation  
**Estimated Effort**: 2-3 days  
**Priority**: High  
**Next RFC**: RFC-004 (Workflow Pages & Content Management)
