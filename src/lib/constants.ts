// Application routes
export const ROUTES = {
  HOME: '/',
  WORKFLOWS: '/workflows',
  WORKFLOW_DETAIL: '/workflows/[slug]',
  WORKFLOW_DEMO: '/workflows/[slug]/demo',
  BLOG: '/blog',
  BLOG_POST: '/blog/[slug]',
  PROFILE: '/profile',
  FAVORITES: '/profile/favorites',
  HISTORY: '/profile/history',
  QUIZ: '/quiz',
  REQUEST: '/request',
  ABOUT: '/about',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const

// Workflow categories
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

export type WorkflowCategory = (typeof WORKFLOW_CATEGORIES)[number]

// Difficulty levels
export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number]

// Demo system limits
export const DEMO_LIMITS = {
  MAX_EXECUTIONS_PER_HOUR: 5,
  TIMEOUT_SECONDS: 30,
  MAX_INPUT_SIZE: 1024 * 1024, // 1MB
} as const

// API endpoints
export const API_ENDPOINTS = {
  WORKFLOWS: '/api/workflows',
  WORKFLOW_DETAIL: '/api/workflows/[id]',
  DEMO: '/api/demo',
  BLOG: '/api/blog',
  USER: '/api/user',
  AUTH: '/api/auth',
  COMMENTS: '/api/comments',
  RATINGS: '/api/ratings',
} as const

// UI constants
export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 20,
  SEARCH_DEBOUNCE_MS: 300,
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 200,
} as const

// Price ranges for filtering
export const PRICE_RANGES = [
  { label: 'Miễn phí', value: [0, 0] as [number, number] },
  { label: 'Dưới 100k', value: [0, 100000] as [number, number] },
  { label: '100k - 500k', value: [100000, 500000] as [number, number] },
  { label: '500k - 1M', value: [500000, 1000000] as [number, number] },
  { label: 'Trên 1M', value: [1000000, Infinity] as [number, number] },
] as const

// Rating levels
export const RATING_LEVELS = [
  { label: '5 sao', value: 5 },
  { label: '4+ sao', value: 4 },
  { label: '3+ sao', value: 3 },
  { label: '2+ sao', value: 2 },
  { label: '1+ sao', value: 1 },
] as const

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Blog', href: '/blog' },
  { label: 'Về chúng tôi', href: '/about' },
] as const

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/n8nos',
  TWITTER: 'https://twitter.com/n8nos',
  LINKEDIN: 'https://linkedin.com/company/n8nos',
  GITHUB: 'https://github.com/n8nos',
} as const
