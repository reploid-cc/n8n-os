import { z } from 'zod'

// Demo input validation
export const demoInputSchema = z.object({
  inputs: z.record(z.unknown()),
  userId: z.string().optional(),
})

// User profile validation
export const userProfileSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống').max(100, 'Tên quá dài'),
  bio: z.string().max(500, 'Bio quá dài').optional(),
  website: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
  location: z.string().max(100, 'Địa điểm quá dài').optional(),
})

// Comment validation
export const commentSchema = z.object({
  content: z.string().min(1, 'Nội dung không được để trống').max(1000, 'Nội dung quá dài'),
  parentId: z.string().optional(),
})

// Rating validation
export const ratingSchema = z.object({
  rating: z.number().min(1, 'Đánh giá tối thiểu 1 sao').max(5, 'Đánh giá tối đa 5 sao'),
  review: z.string().max(1000, 'Đánh giá quá dài').optional(),
})

// Search validation
export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  rating: z.number().min(1).max(5).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
})

// Custom request validation
export const customRequestSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống').max(200, 'Tiêu đề quá dài'),
  description: z.string().min(10, 'Mô tả quá ngắn').max(2000, 'Mô tả quá dài'),
  category: z.string().min(1, 'Vui lòng chọn danh mục'),
  budget: z.number().min(0, 'Ngân sách không hợp lệ').optional(),
  timeline: z.string().optional(),
  contactEmail: z.string().email('Email không hợp lệ'),
  requirements: z.string().max(5000, 'Yêu cầu quá dài').optional(),
})

// Feedback validation
export const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general']),
  title: z.string().min(1, 'Tiêu đề không được để trống').max(200, 'Tiêu đề quá dài'),
  description: z.string().min(10, 'Mô tả quá ngắn').max(2000, 'Mô tả quá dài'),
  email: z.string().email('Email không hợp lệ').optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
})

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống').max(100, 'Tên quá dài'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().min(1, 'Chủ đề không được để trống').max(200, 'Chủ đề quá dài'),
  message: z.string().min(10, 'Tin nhắn quá ngắn').max(2000, 'Tin nhắn quá dài'),
})

// Export types
export type DemoInput = z.infer<typeof demoInputSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type Comment = z.infer<typeof commentSchema>
export type Rating = z.infer<typeof ratingSchema>
export type SearchParams = z.infer<typeof searchSchema>
export type CustomRequest = z.infer<typeof customRequestSchema>
export type Feedback = z.infer<typeof feedbackSchema>
export type Newsletter = z.infer<typeof newsletterSchema>
export type Contact = z.infer<typeof contactSchema>
