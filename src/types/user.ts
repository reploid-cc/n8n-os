export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type UserRole = 'user' | 'admin' | 'moderator'

export interface UserProfile extends User {
  bio?: string
  website?: string
  location?: string
  favoriteWorkflows: string[]
  downloadHistory: string[]
}

export interface UserPreferences {
  notifications: boolean
  newsletter: boolean
  language: 'vi' | 'en'
  theme: 'light' | 'dark' | 'system'
}

export interface UserSession {
  user: User
  accessToken: string
  refreshToken?: string
  expiresAt: string
}
