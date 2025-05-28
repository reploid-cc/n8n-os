# Development Workflow Guide

## Tổng Quan

Quy trình phát triển cho dự án n8n-os sử dụng RFC-based approach với 7 RFCs được triển khai tuần tự. Tài liệu này hướng dẫn chi tiết cách làm việc với RFCs và implementation process.

## 🚨 Quy Tắc Quan Trọng

### RFC Implementation Order

**⚠️ BẮT BUỘC**: RFCs phải được triển khai tuần tự theo thứ tự, KHÔNG được song song:

1. **RFC-001**: Project Foundation & UI System
2. **RFC-002**: Core Layout & Navigation
3. **RFC-003**: Homepage & Static Content
4. **RFC-004**: Workflow Pages & Content Management
5. **RFC-005**: Authentication System
6. **RFC-006**: User Features & Community
7. **RFC-007**: Demo System & Advanced Features

### Quality Gates

Mỗi RFC phải pass 100% acceptance criteria trước khi chuyển sang RFC tiếp theo.

## 🔄 RFC Development Process

### Phase 1: Planning (Sử dụng Implementation Prompt)

#### 1.1 Đọc RFC Specification

```bash
# Đọc RFC document
cat RFCs/RFC-00X-Title.md

# Đọc implementation prompt
cat RFCs/implementation-prompt-RFC-00X.md
```

#### 1.2 Sử dụng Implementation Prompt

```
Tôi muốn triển khai [RFC-00X]. Hãy sử dụng implementation prompt tương ứng để bắt đầu phase 1 (planning).
```

#### 1.3 Planning Output

AI sẽ tạo:

- Detailed implementation plan
- Component breakdown
- File structure
- Dependencies analysis
- Risk assessment

### Phase 2: Implementation

#### 2.1 Bắt Đầu Implementation

```
Bây giờ hãy chuyển sang phase 2 (implementation) cho RFC-00X.
```

#### 2.2 Implementation Process

- Tạo components theo plan
- Implement features step by step
- Follow acceptance criteria
- Test từng component

#### 2.3 Quality Assurance

- Code review
- Testing (unit + integration)
- Performance check
- Accessibility validation

## 📁 File Organization

### RFC Documents Structure

```
RFCs/
├── RFCS.md                           # Overview và index
├── RFC-001-Project-Foundation-UI-System.md
├── implementation-prompt-RFC-001.md
├── RFC-002-Core-Layout-Navigation.md
├── implementation-prompt-RFC-002.md
└── ...
```

### Implementation Files

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # RFC-001: Base UI components
│   ├── layout/            # RFC-002: Layout components
│   ├── features/          # RFC-003+: Feature components
│   └── forms/             # RFC-005: Form components
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
└── types/                 # TypeScript definitions
```

## 🎯 Implementation Guidelines

### Code Standards

#### TypeScript

- Strict mode enabled
- Proper type definitions
- No `any` types
- Interface over type when possible

#### React

- Functional components only
- Custom hooks for logic
- Proper prop types
- Error boundaries

#### Styling

- Tailwind CSS utility-first
- ShadCN UI components
- Responsive design
- Dark mode support

### Testing Requirements

#### Unit Tests

- 80%+ coverage
- All utility functions
- Custom hooks
- Component logic

#### Integration Tests

- User flows
- API integration
- Form submissions
- Navigation

#### E2E Tests

- Critical paths
- Authentication flow
- Demo system
- Payment flow (if applicable)

## 🔧 Development Tools

### Required Tools

```bash
# Install development dependencies
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  eslint \
  prettier \
  @storybook/react
```

### VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter

### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## 📋 RFC Implementation Checklist

### Pre-Implementation

- [ ] RFC document đã được đọc và hiểu
- [ ] Implementation prompt đã được sử dụng
- [ ] Planning phase completed
- [ ] Dependencies identified
- [ ] Environment setup verified

### During Implementation

- [ ] Follow component breakdown từ planning
- [ ] Implement acceptance criteria từng cái một
- [ ] Write tests cho mỗi component
- [ ] Update documentation khi cần
- [ ] Regular commits với clear messages

### Post-Implementation

- [ ] All acceptance criteria completed 100%
- [ ] Tests passing (unit + integration)
- [ ] Code review completed
- [ ] Performance benchmarks met
- [ ] Accessibility standards met
- [ ] Documentation updated

## 🚀 Deployment Process

### Development Deployment

```bash
# Build and test
npm run build
npm run test

# Start production server locally
npm start
```

### Staging Deployment

```bash
# Deploy to staging environment
npm run deploy:staging

# Run E2E tests
npm run test:e2e:staging
```

### Production Deployment

```bash
# Final checks
npm run lint
npm run test:coverage
npm run build

# Deploy to production
npm run deploy:production
```

## 🔍 Quality Assurance

### Code Quality Metrics

- **ESLint**: 0 errors, 0 warnings
- **TypeScript**: Strict mode, no errors
- **Test Coverage**: 80%+ overall
- **Bundle Size**: <500KB initial load
- **Performance**: Lighthouse score >90

### Review Process

1. **Self Review**: Developer checks own code
2. **Peer Review**: Another developer reviews
3. **QA Testing**: Manual testing of features
4. **Automated Testing**: CI/CD pipeline
5. **Acceptance**: Product owner approval

## 📊 Progress Tracking

### RFC Progress Template

```markdown
## RFC-00X Progress

### Planning Phase

- [x] RFC document reviewed
- [x] Implementation prompt executed
- [x] Component breakdown completed
- [x] Dependencies identified

### Implementation Phase

- [ ] Component A implemented
- [ ] Component B implemented
- [ ] Integration completed
- [ ] Tests written

### Quality Assurance

- [ ] Code review passed
- [ ] Tests passing
- [ ] Performance validated
- [ ] Accessibility checked

### Acceptance Criteria

- [ ] Criteria 1 completed
- [ ] Criteria 2 completed
- [ ] All criteria 100% complete
```

### Daily Standup Format

```
Yesterday:
- Completed [specific tasks]
- Blocked by [issues]

Today:
- Working on [RFC-00X specific tasks]
- Planning to complete [deliverables]

Blockers:
- [Any impediments]
```

## 🚨 Common Issues & Solutions

### RFC Implementation Issues

#### Issue: Skipping RFCs

**Problem**: Attempting to implement RFCs out of order
**Solution**: Always follow sequential order, complete current RFC 100%

#### Issue: Incomplete Acceptance Criteria

**Problem**: Moving to next RFC with incomplete criteria
**Solution**: Use checklist, verify each criterion individually

#### Issue: Scope Creep

**Problem**: Adding features not in RFC specification
**Solution**: Stick to RFC scope, document additional features for future RFCs

### Technical Issues

#### Issue: Environment Variables

**Problem**: Missing or incorrect environment configuration
**Solution**: Follow [docs/environment-setup.md](environment-setup.md)

#### Issue: Port Conflicts

**Problem**: Services conflicting on same ports
**Solution**: Check [docs/ports-urls.md](ports-urls.md)

#### Issue: API Integration

**Problem**: Frontend cannot connect to n8n backend
**Solution**: Verify API_BASE_URL và n8n instance status

## 📝 Documentation Updates

### When to Update Documentation

- New RFC implementation started
- Environment variables added/changed
- New dependencies added
- Deployment process changes
- Architecture decisions made

### Documentation Files to Maintain

- `README.md` - Project overview
- `docs/environment-setup.md` - Environment configuration
- `docs/ports-urls.md` - Port allocation
- `memory-bank/progress.md` - Current status
- `memory-bank/activeContext.md` - Current focus

## 🤝 Team Collaboration

### Communication Channels

- **Daily Standups**: Progress updates
- **RFC Reviews**: Technical discussions
- **Code Reviews**: Quality assurance
- **Documentation**: Async knowledge sharing

### Knowledge Sharing

- Document decisions in memory-bank
- Update README for major changes
- Share learnings in team meetings
- Maintain RFC implementation notes

---

**⚠️ QUAN TRỌNG**: Luôn tuân thủ RFC sequential order và quality gates

**Last Updated**: December 2024  
**Next Review**: After RFC-001 completion
