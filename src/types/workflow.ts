export interface Workflow {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  price: number
  rating: number
  reviewCount: number
  downloadCount: number
  demoCount: number
  inputSchema: Record<string, unknown> // JSON Schema
  outputSchema: Record<string, unknown> // JSON Schema
  screenshots: string[]
  tags: string[]
  caseStudy?: string
  videoUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowCard {
  id: string
  slug: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  price: number
  rating: number
  reviewCount: number
  downloadCount: number
  screenshots: string[]
  tags: string[]
}

export interface WorkflowFilter {
  category?: string
  difficulty?: string
  priceRange?: [number, number]
  rating?: number
  search?: string
}

export interface WorkflowListResponse {
  workflows: WorkflowCard[]
  pagination: {
    page: number
    totalPages: number
    totalItems: number
  }
  filters: {
    categories: string[]
    difficulties: string[]
  }
}

export interface DemoRequest {
  inputs: Record<string, unknown>
  userId?: string
}

export interface DemoResponse {
  success: boolean
  outputs: Record<string, unknown>
  executionTime: number
  error?: string
}

export type DemoExecutionState = 'idle' | 'loading' | 'success' | 'error'
