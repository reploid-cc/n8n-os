# Mẫu Hệ Thống

## Tổng Quan Kiến Trúc
**Frontend-Only Architecture với Backend Integration**
- Frontend: Next.js 14+ với App Router
- Backend: n8n workflows (do user tự quản lý)
- Database: PostgreSQL (do user tự quản lý)
- Integration: RESTful APIs qua n8n webhooks

## Mẫu Thiết Kế Chính

### 1. Component Architecture
- **UI Components**: ShadCN UI + Tailwind CSS
- **Page Components**: Next.js App Router pages
- **Layout Components**: Shared layouts và navigation
- **Feature Components**: Business logic components

### 2. State Management
- **Local State**: React hooks (useState, useReducer)
- **Global State**: Zustand (nếu cần)
- **Server State**: TanStack Query cho API calls
- **Form State**: React Hook Form + Zod validation

### 3. Data Flow Pattern
```
Frontend (Next.js) 
    ↕ (Server Actions/API Routes)
n8n Webhooks 
    ↕ (SQL Queries)
PostgreSQL Database
```

## Cấu Trúc Thành Phần

### Frontend Structure
```
src/
├── app/                   # Next.js App Router
├── components/            # Shared components
│   ├── ui/               # ShadCN UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities và helpers
├── types/                # TypeScript definitions
└── styles/               # Global styles
```

### Integration Points
- **Authentication**: Firebase Auth → n8n user sync
- **Demo System**: Frontend form → n8n webhook execution
- **Content Management**: Frontend CMS → n8n content APIs
- **User Data**: Frontend actions → n8n database operations

## Luồng Dữ Liệu

### User Authentication Flow
1. User clicks Google OAuth
2. Firebase Auth handles authentication
3. Frontend sends user data to n8n webhook
4. n8n syncs user to PostgreSQL
5. Frontend receives confirmation

### Demo Execution Flow
1. User fills demo form
2. Frontend validates input
3. Server Action calls n8n webhook
4. n8n executes workflow
5. Results returned to frontend
6. Frontend displays formatted output

## Quyết Định Kỹ Thuật Quan Trọng
- [Quyết định 1]: [Lý do]
- [Quyết định 2]: [Lý do]

## Điểm Tích Hợp
- [Tích hợp 1]
- [Tích hợp 2]

## Chiến Lược Xử Lý Lỗi
[Cách tiếp cận để xử lý và khôi phục lỗi]

## Mẫu Bảo Mật
[Cơ chế và mẫu bảo mật đang được sử dụng] 