# RFC-005: Authentication System

## Metadata

- **RFC ID**: RFC-005
- **Title**: Authentication System
- **Status**: Draft
- **Dependencies**: RFC-004 (Workflow Pages & Content Management)
- **Enables**: RFC-006, RFC-007

## Summary

RFC-005 triển khai Google OAuth authentication với Firebase, user session management và protected routes.

## Features Addressed

- **F5**: Google OAuth Authentication
- User session management
- Protected routes
- User profile creation

## Key Components

### 1. Firebase Auth Setup

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  // Config from environment
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
```

### 2. Auth Context

```typescript
// src/contexts/AuthContext.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Auth logic

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### 3. Protected Routes

```typescript
// src/components/auth/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!user) redirect('/login')

  return <>{children}</>
}
```

## Acceptance Criteria

- [ ] Google OAuth integration working
- [ ] User session persistence
- [ ] Protected routes functional
- [ ] User profile creation
- [ ] Logout functionality
- [ ] Auth state management

---

**Next RFC**: RFC-006 (User Features & Community)
