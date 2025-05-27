# Bối Cảnh Kỹ Thuật

## Công Nghệ Sử Dụng

### Frontend Stack
- **Framework**: Next.js 14+ với App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI components
- **State Management**: React hooks + Zustand (nếu cần)
- **Authentication**: Firebase Authentication
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Native fetch với Server Actions

### Development Tools
- **Package Manager**: npm hoặc yarn
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Husky + lint-staged

### Deployment & Infrastructure
- **Hosting**: Vercel (khuyến nghị) hoặc Netlify
- **CDN**: Tự động qua hosting platform
- **Domain**: Custom domain với SSL
- **Monitoring**: Vercel Analytics + Google Analytics

## Môi Trường Phát Triển

### Prerequisites
- Node.js 18+ 
- npm hoặc yarn
- Git
- VS Code (khuyến nghị)

### Development Setup
```bash
npx create-next-app@latest n8n-os --typescript --tailwind --eslint --app
cd n8n-os
npm install @shadcn/ui
npx shadcn-ui@latest init
```

### Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
N8N_WEBHOOK_BASE_URL=
NEXT_PUBLIC_GTM_ID=
```

## Các Phụ Thuộc Chính

### Core Dependencies
- next: ^14.0.0
- react: ^18.0.0
- typescript: ^5.0.0
- tailwindcss: ^3.0.0
- @shadcn/ui: latest

### Authentication
- firebase: ^10.0.0

### Forms & Validation
- react-hook-form: ^7.0.0
- @hookform/resolvers: ^3.0.0
- zod: ^3.0.0

### State Management (Optional)
- zustand: ^4.0.0
- @tanstack/react-query: ^5.0.0

## Ràng Buộc Kỹ Thuật

### Performance Requirements
- Page load time: <3 seconds trên 3G
- Demo execution: <10 seconds response time
- Bundle size: <500KB initial JavaScript

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility

### Security
- HTTPS enforcement
- Input validation và sanitization
- Rate limiting cho demo system
- CSRF protection

## Cơ Sở Hạ Tầng
[Mô tả về hosting/cơ sở hạ tầng]

## Xây Dựng & Triển Khai
[Quy trình xây dựng và triển khai]

## Khung Kiểm Thử
[Phương pháp kiểm thử và công cụ]

## Cân Nhắc Hiệu Năng
[Yêu cầu hiệu năng và tối ưu hóa] 