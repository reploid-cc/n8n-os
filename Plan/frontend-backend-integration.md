# Tích Hợp Frontend-Backend: Routes & Endpoints

## 1. Bảng Routes Frontend

| Đường Dẫn Frontend | Mô Tả | Loại Setup | Method | Endpoint Backend | Ghi Chú |
|-------------------|-------|------------|---------|------------------|---------|
| `/` | Trang chủ | Setup riêng | GET | `/api/homepage` | Lấy workflows nổi bật, blogs mới nhất |
| `/workflows` | Danh sách workflows | Setup riêng | GET | `/api/workflows` | Lấy tất cả workflows với filter/search |
| `/workflows/[slug]` | Chi tiết workflow | Template động | GET | `/api/workflows/{slug}` | Lấy thông tin chi tiết workflow theo slug |
| `/workflows/[slug]/demo` | Demo workflow | Setup riêng | POST | `/api/workflows/{slug}/demo` | Thực thi demo với input data |
| `/blog` | Danh sách blog | Setup riêng | GET | `/api/blogs` | Lấy tất cả bài blog |
| `/blog/[slug]` | Chi tiết blog | Template động | GET | `/api/blogs/{slug}` | Lấy nội dung blog theo slug |
| `/quiz` | Bài kiểm tra chọn workflow | Setup riêng | POST | `/api/quiz/recommend` | Gửi câu trả lời, nhận gợi ý workflow |
| `/request` | Form yêu cầu custom | Setup riêng | POST | `/api/requests/custom` | Gửi yêu cầu workflow tùy chỉnh |
| `/profile` | Trang cá nhân | Setup riêng | GET/POST | `/api/user/profile` | Quản lý thông tin người dùng |
| `/auth/login` | Đăng nhập | Setup riêng | POST | `/api/auth/login` | Xác thực với Firebase token |

## 2. File Cấu Hình Routes

### `src/config/apiRoutes.ts`

```typescript
export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  requiresAuth?: boolean;
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

export interface ApiRoutes {
  [key: string]: ApiEndpoint;
}

// Cấu hình này sẽ được bạn điền vào
export const API_ROUTES: ApiRoutes = {
  // Trang chủ
  homepage: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/homepage',
    method: 'GET',
    description: 'Lấy dữ liệu trang chủ (workflows nổi bật, blogs mới)',
    requiresAuth: false
  },

  // Workflows
  workflowsList: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/workflows',
    method: 'GET', 
    description: 'Lấy danh sách workflows với filter/search',
    requiresAuth: false
  },

  workflowDetail: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/workflows',
    method: 'GET',
    description: 'Lấy chi tiết workflow theo slug (URL + /{slug})',
    requiresAuth: false
  },

  workflowDemo: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/workflows',
    method: 'POST',
    description: 'Thực thi demo workflow (URL + /{slug}/demo)',
    requiresAuth: false,
    rateLimit: {
      maxRequests: 5,
      windowMs: 60000 // 5 requests per minute
    }
  },

  // Blog
  blogsList: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/blogs',
    method: 'GET',
    description: 'Lấy danh sách bài blog',
    requiresAuth: false
  },

  blogDetail: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/blogs',
    method: 'GET', 
    description: 'Lấy chi tiết blog theo slug (URL + /{slug})',
    requiresAuth: false
  },

  // Quiz & Recommendations
  quizRecommend: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/quiz/recommend',
    method: 'POST',
    description: 'Gửi câu trả lời quiz, nhận gợi ý workflows',
    requiresAuth: false
  },

  // Custom Requests
  customRequest: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/requests/custom',
    method: 'POST',
    description: 'Gửi yêu cầu workflow tùy chỉnh',
    requiresAuth: false
  },

  // User Management
  userProfile: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/user/profile',
    method: 'GET',
    description: 'Lấy thông tin profile người dùng',
    requiresAuth: true
  },

  updateProfile: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/user/profile',
    method: 'POST',
    description: 'Cập nhật thông tin profile',
    requiresAuth: true
  },

  userFavorites: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/user/favorites',
    method: 'GET',
    description: 'Lấy danh sách workflows yêu thích',
    requiresAuth: true
  },

  addFavorite: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/user/favorites',
    method: 'POST',
    description: 'Thêm workflow vào yêu thích',
    requiresAuth: true
  },

  removeFavorite: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/user/favorites',
    method: 'DELETE',
    description: 'Xóa workflow khỏi yêu thích',
    requiresAuth: true
  },

  userHistory: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/user/history',
    method: 'GET',
    description: 'Lấy lịch sử sử dụng workflows',
    requiresAuth: true
  },

  // Authentication
  authLogin: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/auth/login',
    method: 'POST',
    description: 'Xác thực người dùng với Firebase token',
    requiresAuth: false
  },

  // Comments & Ratings
  addComment: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/comments',
    method: 'POST',
    description: 'Thêm bình luận cho workflow/blog',
    requiresAuth: true
  },

  getComments: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/comments',
    method: 'GET',
    description: 'Lấy bình luận theo target_type và target_id',
    requiresAuth: false
  },

  addRating: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/ratings',
    method: 'POST',
    description: 'Thêm đánh giá cho workflow',
    requiresAuth: true
  },

  getRatings: {
    url: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/ratings',
    method: 'GET',
    description: 'Lấy đánh giá của workflow',
    requiresAuth: false
  }
};
```

## 3. Template Sử Dụng API Routes

### `src/lib/apiClient.ts`

```typescript
import { API_ROUTES } from '@/config/apiRoutes';

interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export async function callApi<T>(
  routeKey: keyof typeof API_ROUTES,
  options: {
    params?: Record<string, string>;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<ApiResponse<T>> {
  const route = API_ROUTES[routeKey];
  
  if (!route) {
    return {
      error: {
        code: 'INVALID_ROUTE',
        message: `Route ${routeKey} không tồn tại`
      }
    };
  }

  let url = route.url;
  
  // Thêm params vào URL nếu có
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }

  try {
    const response = await fetch(url, {
      method: route.method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: route.method !== 'GET' ? JSON.stringify(options.body) : undefined
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          code: `HTTP_${response.status}`,
          message: data.message || 'Có lỗi xảy ra'
        }
      };
    }

    return { data };
  } catch (error) {
    return {
      error: {
        code: 'NETWORK_ERROR',
        message: 'Không thể kết nối đến server'
      }
    };
  }
}
```

## 4. Ví Dụ Sử Dụng

### Trong Server Actions:

```typescript
// app/workflows/[slug]/page.tsx
import { callApi } from '@/lib/apiClient';

export default async function WorkflowDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { data: workflow, error } = await callApi('workflowDetail', {
    params: { slug: params.slug }
  });

  if (error) {
    return <div>Lỗi: {error.message}</div>;
  }

  return <WorkflowDetailComponent workflow={workflow} />;
}
```

### Trong Client Components:

```typescript
// components/QuizForm.tsx
'use client';

import { callApi } from '@/lib/apiClient';

export function QuizForm() {
  const handleSubmit = async (answers: any) => {
    const { data, error } = await callApi('quizRecommend', {
      body: { answers }
    });

    if (error) {
      console.error('Quiz error:', error);
      return;
    }

    // Xử lý kết quả gợi ý
    console.log('Recommended workflows:', data);
  };

  return (
    // Quiz form UI
  );
}
```

## 5. Biến Môi Trường Cần Thiết

### `.env.local`

```bash
# Base URL cho API backend n8n
NEXT_PUBLIC_API_BASE_URL=https://your-n8n-domain.com

# Firebase config (nếu dùng Firebase Auth)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## 6. Hướng Dẫn Cho Bạn

### Bước 1: Cập nhật API_ROUTES
- Thay đổi `process.env.NEXT_PUBLIC_API_BASE_URL` thành domain n8n của bạn
- Điều chỉnh các endpoint paths cho phù hợp với n8n workflows của bạn

### Bước 2: Tạo n8n Webhooks
- Tạo webhook endpoints tương ứng với từng route trong bảng
- Đảm bảo response format nhất quán (JSON)

### Bước 3: Test Integration
- Test từng endpoint một cách riêng biệt
- Kiểm tra error handling và response format

### Bước 4: Rate Limiting (Tùy chọn)
- Implement rate limiting trong n8n cho các endpoints demo
- Sử dụng IP-based hoặc user-based limiting

## 7. Lưu Ý Quan Trọng

- **Tất cả logic nghiệp vụ** sẽ được xử lý trong n8n workflows của bạn
- **Frontend chỉ gọi API** và hiển thị kết quả
- **Error handling** cần được implement ở cả frontend và backend
- **Authentication** sẽ sử dụng Firebase token được gửi trong headers 