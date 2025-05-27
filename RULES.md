# RULES.md - Quy Tắc Phát Triển n8n-os Platform

## 📋 Tổng Quan Dự Án

**n8n-os** là nền tảng web frontend-only được xây dựng bằng Next.js để tạo marketplace cho n8n automation workflows. Platform kết hợp demo trực tiếp, cộng đồng và content management để giúp SME dễ dàng tiếp cận automation.

**Phạm Vi**: Frontend development only - Backend n8n và PostgreSQL do user tự quản lý
**Timeline**: 12 tháng, 3 phases, 19 tính năng
**Mục Tiêu**: 1000+ MAU, 70% demo completion rate, 99.9% uptime

---

## 🛠️ Technology Stack Definition

### Core Technologies (Bắt Buộc)
- **Framework**: Next.js 14+ với App Router
- **Language**: TypeScript 5.0+ với strict mode
- **Styling**: Tailwind CSS 3.0+ + ShadCN UI components
- **Authentication**: Firebase Authentication 10.0+
- **Forms**: React Hook Form 7.0+ + Zod 3.0+ validation
- **HTTP Client**: Native fetch với Next.js Server Actions

### Development Tools (Bắt Buộc)
- **Package Manager**: npm (ưu tiên) hoặc yarn
- **Code Quality**: ESLint + Prettier với cấu hình Next.js
- **Testing**: Jest + React Testing Library
- **Git Hooks**: Husky + lint-staged
- **Type Checking**: TypeScript strict mode enabled

### Optional Dependencies (Khi Cần)
- **State Management**: Zustand 4.0+ (chỉ khi React hooks không đủ)
- **Server State**: TanStack Query 5.0+ (cho complex API interactions)
- **Icons**: Lucide React hoặc Heroicons
- **Date Handling**: date-fns (tránh moment.js)

### Deployment & Infrastructure
- **Hosting**: Vercel (ưu tiên) hoặc Netlify
- **Domain**: Custom domain với SSL
- **Monitoring**: Vercel Analytics + Google Analytics 4
- **Error Tracking**: Sentry (nếu cần)

---

## 📁 Technical Preferences

### Naming Conventions

#### Files & Directories
```
✅ ĐÚNG:
- components/ui/Button.tsx
- hooks/useAuth.ts
- lib/utils.ts
- types/workflow.ts
- app/workflows/[slug]/page.tsx

❌ SAI:
- components/ui/button.tsx
- hooks/UseAuth.ts
- lib/Utils.ts
- types/Workflow.ts
```

#### Components & Functions
```typescript
// ✅ ĐÚNG: PascalCase cho components
export function WorkflowCard({ workflow }: WorkflowCardProps) {}
export const UserProfile = ({ user }: UserProfileProps) => {}

// ✅ ĐÚNG: camelCase cho functions và variables
const handleSubmit = () => {}
const isLoading = true
const userPreferences = {}

// ✅ ĐÚNG: UPPER_SNAKE_CASE cho constants
const API_ENDPOINTS = {
  WORKFLOWS: '/api/workflows',
  DEMO: '/api/demo'
} as const
```

#### Types & Interfaces
```typescript
// ✅ ĐÚNG: PascalCase với descriptive suffixes
interface WorkflowCardProps {
  workflow: Workflow
  onFavorite?: (id: string) => void
}

type DemoExecutionState = 'idle' | 'loading' | 'success' | 'error'

// ✅ ĐÚNG: Generic types với T prefix
interface ApiResponse<TData> {
  data: TData
  success: boolean
}
```

### Code Organization

#### Project Structure (Bắt Buộc)
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── workflows/         # Workflow pages
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Shared components
│   ├── ui/               # ShadCN UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities và helpers
│   ├── utils.ts          # General utilities
│   ├── api.ts            # API client
│   ├── auth.ts           # Auth utilities
│   └── validations.ts    # Zod schemas
├── types/                # TypeScript definitions
│   ├── workflow.ts       # Workflow types
│   ├── user.ts           # User types
│   └── api.ts            # API types
└── styles/               # Additional styles (if needed)
```

#### Component Organization
```typescript
// ✅ ĐÚNG: Component file structure
// components/features/WorkflowCard.tsx

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Workflow } from '@/types/workflow'

// Types first
interface WorkflowCardProps {
  workflow: Workflow
  onFavorite?: (id: string) => void
}

// Component implementation
export function WorkflowCard({ workflow, onFavorite }: WorkflowCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  
  // Event handlers
  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    onFavorite?.(workflow.id)
  }
  
  // Render
  return (
    <Card>
      {/* Component JSX */}
    </Card>
  )
}
```

### Architectural Patterns

#### Component Patterns (Bắt Buộc)
1. **Functional Components Only**: Không sử dụng class components
2. **Custom Hooks**: Tách logic ra khỏi components
3. **Composition over Inheritance**: Sử dụng children và composition
4. **Single Responsibility**: Mỗi component chỉ làm một việc
5. **DRY Principle (Don't Repeat Yourself)**: Tránh duplicate code bằng cách:
   - Tạo shared components cho UI patterns tương tự
   - Extract common logic thành custom hooks
   - Sử dụng utility functions cho business logic lặp lại
   - Tạo constants cho values được sử dụng nhiều nơi
   - Implement composition patterns để tái sử dụng functionality

#### State Management Patterns
```typescript
// ✅ ĐÚNG: Local state với useState
function DemoForm() {
  const [inputs, setInputs] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  // ...
}

// ✅ ĐÚNG: Custom hooks cho complex logic
function useWorkflowDemo(workflowId: string) {
  const [state, setState] = useState<DemoState>('idle')
  
  const executeDemo = async (inputs: Record<string, any>) => {
    setState('loading')
    try {
      const result = await api.executeDemo(workflowId, inputs)
      setState('success')
      return result
    } catch (error) {
      setState('error')
      throw error
    }
  }
  
  return { state, executeDemo }
}

// ✅ ĐÚNG: DRY - Shared utility functions
// lib/utils.ts
export function formatCurrency(amount: number, currency = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

// ✅ ĐÚNG: DRY - Shared constants
// lib/constants.ts
export const WORKFLOW_CATEGORIES = [
  'sales',
  'marketing', 
  'productivity',
  'data-processing'
] as const

export const DEMO_LIMITS = {
  MAX_EXECUTIONS_PER_HOUR: 5,
  TIMEOUT_SECONDS: 30,
  MAX_INPUT_SIZE: 1024 * 1024 // 1MB
} as const

// ✅ ĐÚNG: DRY - Reusable component patterns
function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)} {...props}>
      {children}
    </div>
  )
}

// Sử dụng lại Card component
function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <h3>{workflow.title}</h3>
      <p>{truncateText(workflow.description, 100)}</p>
      <span>{formatCurrency(workflow.price)}</span>
    </Card>
  )
}
```

#### API Integration Patterns
```typescript
// ✅ ĐÚNG: Server Actions cho mutations
'use server'

export async function executeWorkflowDemo(
  workflowId: string, 
  inputs: Record<string, any>
) {
  try {
    const response = await fetch(`${process.env.N8N_WEBHOOK_BASE_URL}/demo/${workflowId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    })
    
    if (!response.ok) {
      throw new Error('Demo execution failed')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Demo execution error:', error)
    throw error
  }
}
```

---

## 🔒 Security & Performance Requirements

### Security Practices (Bắt Buộc)
1. **Input Validation**: Tất cả user inputs phải được validate với Zod
2. **XSS Prevention**: Không sử dụng dangerouslySetInnerHTML trừ khi cần thiết
3. **Rate Limiting**: Demo system: 5 executions per IP per hour
4. **Environment Variables**: Sensitive data chỉ trong server-side
5. **HTTPS**: Enforce HTTPS cho production

```typescript
// ✅ ĐÚNG: Input validation
const demoInputSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1).max(500),
  category: z.enum(['sales', 'marketing', 'support'])
})

// ✅ ĐÚNG: Safe HTML rendering
import DOMPurify from 'dompurify'

function SafeContent({ html }: { html: string }) {
  const sanitizedHtml = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}
```

### Performance Requirements (Bắt Buộc)
- **Page Load**: <3 seconds trên 3G connection
- **Demo Execution**: <10 seconds response time
- **Bundle Size**: <500KB initial JavaScript
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

#### Performance Optimization Patterns
```typescript
// ✅ ĐÚNG: Dynamic imports cho code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})

// ✅ ĐÚNG: Image optimization
import Image from 'next/image'

function WorkflowImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}

// ✅ ĐÚNG: Memoization cho expensive operations
const processedWorkflows = useMemo(() => {
  return workflows.filter(w => w.category === selectedCategory)
}, [workflows, selectedCategory])
```

---

## 🧪 Development Standards

### Testing Requirements (Bắt Buộc)
- **Unit Tests**: 80% coverage cho utilities và hooks
- **Component Tests**: Tất cả UI components phải có tests
- **Integration Tests**: Critical user flows (demo execution, auth)
- **E2E Tests**: Core user journeys (optional nhưng khuyến khích)

#### Testing Patterns
```typescript
// ✅ ĐÚNG: Component testing
import { render, screen, fireEvent } from '@testing-library/react'
import { WorkflowCard } from './WorkflowCard'

describe('WorkflowCard', () => {
  const mockWorkflow = {
    id: '1',
    title: 'Test Workflow',
    description: 'Test description'
  }
  
  it('renders workflow information', () => {
    render(<WorkflowCard workflow={mockWorkflow} />)
    
    expect(screen.getByText('Test Workflow')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
  
  it('calls onFavorite when favorite button is clicked', () => {
    const onFavorite = jest.fn()
    render(<WorkflowCard workflow={mockWorkflow} onFavorite={onFavorite} />)
    
    fireEvent.click(screen.getByRole('button', { name: /favorite/i }))
    expect(onFavorite).toHaveBeenCalledWith('1')
  })
})
```

### Documentation Standards (Bắt Buộc)
1. **JSDoc**: Cho public APIs và complex functions
2. **README**: Setup instructions và project overview
3. **Component Documentation**: Props interface với examples
4. **API Documentation**: Endpoint specifications

```typescript
/**
 * Executes a workflow demo với provided inputs
 * @param workflowId - Unique identifier cho workflow
 * @param inputs - User inputs cho demo execution
 * @returns Promise resolving to demo results
 * @throws Error nếu demo execution fails
 */
export async function executeWorkflowDemo(
  workflowId: string,
  inputs: Record<string, any>
): Promise<DemoResult> {
  // Implementation
}
```

### Error Handling Standards (Bắt Buộc)

#### Error Boundaries
```typescript
// ✅ ĐÚNG: Error boundary implementation
'use client'

import { Component, ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />
    }
    
    return this.props.children
  }
}
```

#### API Error Handling
```typescript
// ✅ ĐÚNG: Consistent error handling
interface ApiError {
  code: string
  message: string
  details?: any
}

const ERROR_MESSAGES = {
  DEMO_RATE_LIMIT: 'Bạn đã thử quá nhiều lần, vui lòng thử lại sau',
  DEMO_TIMEOUT: 'Demo timeout, vui lòng thử lại',
  NETWORK_ERROR: 'Lỗi kết nối mạng',
  SERVER_ERROR: 'Lỗi server, vui lòng thử lại sau'
} as const

function handleApiError(error: ApiError): string {
  return ERROR_MESSAGES[error.code] || ERROR_MESSAGES.SERVER_ERROR
}
```

### Accessibility Standards (Bắt Buộc - WCAG 2.1 AA)
1. **Semantic HTML**: Sử dụng proper HTML elements
2. **Keyboard Navigation**: Tất cả interactive elements accessible via keyboard
3. **Screen Readers**: Proper ARIA labels và descriptions
4. **Color Contrast**: Minimum 4.5:1 ratio
5. **Focus Management**: Clear focus indicators

```typescript
// ✅ ĐÚNG: Accessible component
function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')
  
  return (
    <div>
      <label htmlFor="search-input" className="sr-only">
        Tìm kiếm workflows
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
        placeholder="Tìm kiếm workflows..."
        aria-describedby="search-help"
      />
      <p id="search-help" className="sr-only">
        Nhập từ khóa và nhấn Enter để tìm kiếm
      </p>
    </div>
  )
}
```

### Responsive Design Requirements (Bắt Buộc)
- **Mobile First**: Design cho mobile trước, sau đó desktop
- **Breakpoints**: 320px, 768px, 1024px, 1280px, 1536px
- **Touch Targets**: Minimum 44px cho touch interfaces
- **Flexible Layouts**: Sử dụng CSS Grid và Flexbox

```typescript
// ✅ ĐÚNG: Responsive component
function WorkflowGrid({ workflows }: { workflows: Workflow[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {workflows.map(workflow => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  )
}
```

---

## 🎯 Implementation Priorities

### Phase 1: MVP Core (Must Have - 3 tháng)
**Thứ tự triển khai bắt buộc:**
1. **F1**: Homepage & Navigation
2. **F2**: Workflow Listing Page
3. **F3**: Workflow Detail Page
4. **F5**: Google OAuth Authentication
5. **F17**: Error Handling & Loading States
6. **F18**: Performance Optimization
7. **F4**: Live Demo System (cuối cùng vì phức tạp nhất)

### Phase 2: Community Features (Should Have - 6 tháng)
**Có thể triển khai song song:**
- F6, F7, F8: User management features
- F9, F10: Community features
- F11, F12, F14, F15: Content và discovery features

### Phase 3: Advanced Features (Could Have - 9 tháng)
**Triển khai khi MVP ổn định:**
- F13, F16, F19: Advanced features

### Quality Thresholds (Bắt Buộc)
- **Không deploy** nếu test coverage <80%
- **Không deploy** nếu có TypeScript errors
- **Không deploy** nếu performance benchmarks không đạt
- **Không deploy** nếu accessibility audit fails

---

## 📋 General Guidelines

### Code Quality Standards (Bắt Buộc)
1. **No TODOs**: Không commit code với TODO comments
2. **No Console Logs**: Không commit console.log statements
3. **Type Safety**: Tất cả code phải type-safe
4. **ESLint Clean**: Không warnings hoặc errors
5. **Prettier Formatted**: Code phải được format đúng

### Implementation Completeness (Bắt Buộc)
1. **Feature Complete**: Tất cả acceptance criteria phải được implement
2. **Error Handling**: Mọi API call phải có error handling
3. **Loading States**: Mọi async operation phải có loading UI
4. **Responsive**: Tất cả components phải responsive
5. **Accessible**: Tất cả interactive elements phải accessible

### Communication Guidelines
1. **Ask Questions**: Khi không chắc chắn về requirements
2. **Propose Alternatives**: Nếu có approach tốt hơn
3. **Document Decisions**: Ghi lại technical decisions quan trọng
4. **Update Progress**: Báo cáo tiến độ thường xuyên

### Handling Uncertainty
1. **Refer to PRD**: Kiểm tra PRD và features.md trước
2. **Check Memory Bank**: Tham khảo memory-bank files
3. **Follow Patterns**: Sử dụng established patterns trong codebase
4. **Ask for Clarification**: Khi vẫn không rõ

---

## 🚫 Prohibited Practices

### Không Được Phép
- ❌ Class components (chỉ functional components)
- ❌ Inline styles (sử dụng Tailwind CSS)
- ❌ Direct DOM manipulation (sử dụng React patterns)
- ❌ Global CSS (trừ globals.css)
- ❌ Any type (sử dụng proper TypeScript types)
- ❌ Hardcoded strings (sử dụng constants)
- ❌ Unhandled promises (luôn có error handling)
- ❌ Non-semantic HTML (sử dụng proper HTML elements)

### Hạn Chế Sử Dụng
- ⚠️ useEffect (chỉ khi thật sự cần thiết)
- ⚠️ dangerouslySetInnerHTML (chỉ với sanitized content)
- ⚠️ Global state (ưu tiên local state)
- ⚠️ External libraries (kiểm tra necessity trước)

---

## 📊 Success Metrics

### Technical Metrics (Đo lường hàng ngày)
- Build success rate: 100%
- Test coverage: >80%
- TypeScript errors: 0
- ESLint warnings: 0
- Bundle size: <500KB

### Performance Metrics (Đo lường hàng tuần)
- Page load time: <3s
- Demo execution time: <10s
- Core Web Vitals: Green scores
- Error rate: <1%

### Quality Metrics (Đo lường hàng tháng)
- Accessibility audit: 100% pass
- Security audit: No critical issues
- User feedback: >4.5/5 rating
- Bug reports: <5 per month

---

*Tài liệu này sẽ được cập nhật khi có thay đổi trong requirements hoặc technical decisions.*

**Phiên bản**: 1.0  
**Cập nhật lần cuối**: Tháng 12/2024  
**Người tạo**: AI Technical Lead  
**Áp dụng cho**: Toàn bộ quá trình phát triển n8n-os platform 