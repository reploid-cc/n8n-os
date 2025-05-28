# RFC-006: User Features & Community

## Metadata

- **RFC ID**: RFC-006
- **Title**: User Features & Community
- **Status**: Draft
- **Dependencies**: RFC-005 (Authentication System)
- **Enables**: RFC-007

## Summary

RFC-006 triển khai user dashboard, favorites system, comments, ratings và custom request system.

## Features Addressed

- **F6**: Profile Management
- **F7**: Favorites System
- **F8**: Usage History
- **F9**: Comments System
- **F10**: Rating & Reviews
- **F15**: Custom Request System

## Key Components

### 1. User Dashboard

```typescript
// src/app/profile/page.tsx
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Container>
        <ProfileHeader />
        <DashboardTabs />
      </Container>
    </ProtectedRoute>
  )
}
```

### 2. Favorites System

```typescript
// src/hooks/useFavorites.ts
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = async (workflowId: string) => {
    // Toggle logic với API call
  }

  return { favorites, toggleFavorite }
}
```

### 3. Comments System

```typescript
// src/components/comments/CommentSection.tsx
export function CommentSection({ targetId, targetType }: CommentSectionProps) {
  return (
    <div>
      <CommentForm />
      <CommentList comments={comments} />
    </div>
  )
}
```

### 4. Rating System

```typescript
// src/components/rating/RatingForm.tsx
export function RatingForm({ workflowId }: RatingFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <StarRating />
      <ReviewTextarea />
      <SubmitButton />
    </form>
  )
}
```

## Acceptance Criteria

- [ ] User profile management working
- [ ] Favorites system functional
- [ ] Usage history tracking
- [ ] Comments system với nested replies
- [ ] Rating và review system
- [ ] Custom request form
- [ ] All features require authentication

---

**Next RFC**: RFC-007 (Demo System & Advanced Features)
