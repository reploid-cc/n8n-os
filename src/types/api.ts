export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface SearchParams {
  query?: string
  category?: string
  difficulty?: string
  priceRange?: [number, number]
  rating?: number
}

export interface HomepageResponse {
  featuredWorkflows: import('./workflow').WorkflowCard[]
  latestBlogs: BlogPost[]
  stats: {
    totalWorkflows: number
    totalUsers: number
    totalDemos: number
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: Date
  updatedAt: Date
  tags: string[]
  category: string
  readTime: number
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: Date
  updatedAt: Date
  parentId?: string
  replies?: Comment[]
}

export interface Rating {
  id: string
  userId: string
  userName: string
  rating: number
  review?: string
  createdAt: Date
  helpful: number
}

// Error codes constants
export const ERROR_CODES = {
  // Authentication
  AUTH_REQUIRED: 'Yêu cầu đăng nhập',
  AUTH_INVALID: 'Token không hợp lệ',

  // Demo System
  DEMO_RATE_LIMIT: 'Bạn đã thử quá nhiều lần, vui lòng thử lại sau',
  DEMO_TIMEOUT: 'Demo timeout, vui lòng thử lại',
  DEMO_INPUT_INVALID: 'Dữ liệu đầu vào không hợp lệ',

  // General
  NOT_FOUND: 'Không tìm thấy tài nguyên',
  SERVER_ERROR: 'Lỗi server, vui lòng thử lại sau',
  NETWORK_ERROR: 'Lỗi kết nối mạng',
} as const
