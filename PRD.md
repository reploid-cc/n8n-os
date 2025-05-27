# Tài Liệu Yêu Cầu Sản Phẩm (PRD)
# n8n-os: Nền Tảng Chia Sẻ & Thương Mại Hóa Workflow Tự Động Hóa

---

## 1. Tổng Quan Dự Án

**n8n-os** là một nền tảng web toàn diện cho việc chia sẻ, trải nghiệm và thương mại hóa các workflow tự động hóa sử dụng n8n. Nền tảng kết hợp thị trường trực tuyến, trải nghiệm demo và cộng đồng để giúp cá nhân và doanh nghiệp dễ dàng tiếp cận, trải nghiệm và triển khai các giải pháp tự động hóa mà không cần kỹ năng lập trình.

### Giá Trị Cốt Lõi
- **Trải nghiệm trước khi mua**: Demo trực tiếp với dữ liệu thật, không chỉ là mẫu tĩnh
- **Cá nhân hóa giải pháp**: Bài kiểm tra chọn workflow phù hợp, yêu cầu tùy chỉnh theo nhu cầu
- **Cộng đồng thực chiến**: Nghiên cứu tình huống, video hướng dẫn, phản hồi từ người dùng thật
- **Dễ tiếp cận**: Không cần kỹ năng lập trình, giao diện thân thiện với người không chuyên kỹ thuật

---

## 2. Mục Tiêu Dự Án

### Mục Tiêu Chính
- Tạo cầu nối giữa "ý tưởng tự động hóa" và "thực thi" cho doanh nghiệp vừa và nhỏ cũng như người dùng không chuyên kỹ thuật
- Xây dựng thị trường workflow n8n với trải nghiệm demo tương tác
- Phát triển cộng đồng chia sẻ kiến thức và kinh nghiệm tự động hóa thực chiến
- Tạo nguồn thu từ bán workflow, dịch vụ tùy chỉnh và tư vấn

### Tiêu Chí Thành Công
- Nền tảng hoạt động ổn định với đầy đủ tính năng sản phẩm tối thiểu khả thi trong 12 tháng
- Trải nghiệm người dùng mượt mà từ khám phá đến triển khai
- Hệ thống demo workflow hoạt động an toàn và hiệu quả
- Giao diện frontend tích hợp thành công với backend n8n qua webhook

---

## 3. Phạm Vi Dự Án

### Bao Gồm Trong Sản Phẩm Tối Thiểu Khả Thi
- **Nền Tảng Cốt Lõi**: Trang chủ, danh sách workflows, chi tiết workflow
- **Hệ Thống Demo**: Demo trực tiếp với form nhập liệu tự động và kết quả thực tế
- **Quản Lý Người Dùng**: Đăng nhập Google OAuth, quản lý hồ sơ
- **Tính Năng Cộng Đồng**: Bình luận, đánh giá, yêu thích workflow
- **Quản Lý Nội Dung**: Hệ thống blog, nghiên cứu tình huống
- **Công Cụ Khám Phá**: Bài kiểm tra chọn workflow, tìm kiếm, lọc
- **Hệ Thống Yêu Cầu**: Form yêu cầu workflow tùy chỉnh

### Loại Trừ Khỏi Sản Phẩm Tối Thiểu Khả Thi
- Tích hợp thanh toán (giai đoạn tương lai)
- Chatbot AI nâng cao (chỉ form phản hồi cơ bản)
- Thị trường đa nhà cung cấp (ban đầu chỉ một nhà cung cấp)
- Ứng dụng di động (chỉ web responsive)
- Bảng điều khiển phân tích nâng cao

---

## 4. User Personas & Target Audience (Đối Tượng Người Dùng)

### Primary Users

#### 1. SME Business Owners (Chủ doanh nghiệp SME)
- **Demographics**: Chủ shop online, startup founders, small business owners
- **Pain Points**: Muốn tự động hóa nhưng thiếu đội dev, ngân sách hạn chế
- **Goals**: Tìm giải pháp automation "cài 1 chạm", tiết kiệm thời gian vận hành
- **Behavior**: Thích demo trước khi mua, cần support và hướng dẫn chi tiết

#### 2. Marketers & Operations Staff (Nhân viên Marketing/Vận hành)
- **Demographics**: Marketing manager, operations coordinator, admin staff
- **Pain Points**: Công việc lặp lại nhiều, không biết code, cần automation đơn giản
- **Goals**: Tự động hóa task hàng ngày, tăng hiệu quả công việc
- **Behavior**: Tìm kiếm solution cụ thể, thích video hướng dẫn và case study

#### 3. Freelancers & Automation Developers (Freelancer/Dev automation)
- **Demographics**: Freelance developers, automation consultants, agency owners
- **Pain Points**: Mất thời gian build workflow từ đầu, thiếu inspiration
- **Goals**: Tìm template để customize, học hỏi best practices
- **Behavior**: Đánh giá kỹ technical details, quan tâm đến source code quality

### Secondary Users

#### 4. n8n Beginners (Người mới học n8n)
- **Demographics**: Students, career changers, tech enthusiasts
- **Pain Points**: n8n learning curve steep, thiếu tài liệu thực chiến
- **Goals**: Học automation, tìm hiểu use cases thực tế
- **Behavior**: Đọc blog, xem video, thử demo để học

---

## 5. Functional Requirements (Yêu Cầu Chức Năng)

### 5.1 Core Platform Features

#### A. Homepage & Navigation
- **Landing page** với hero section, featured workflows, latest blogs
- **Navigation menu** responsive với search bar
- **Footer** với links, contact info, social media

#### B. Workflow Management
- **Workflow listing page** (`/workflows`) với:
  - Grid/list view toggle
  - Filter by category, difficulty, price
  - Search functionality
  - Pagination
- **Workflow detail page** (`/workflows/[slug]`) với:
  - Comprehensive description
  - Input/output specifications
  - Case study section
  - User ratings and reviews
  - Action buttons (Demo, Download, Request Custom)

#### C. Live Demo System
- **Demo page** (`/workflows/[slug]/demo`) với:
  - Auto-generated input form based on workflow specs
  - Real-time demo execution via n8n webhooks
  - Output display with proper formatting
  - Rate limiting for abuse prevention
  - Error handling and user feedback

### 5.2 User Management (F1-F4)

#### F1: Google OAuth Authentication
- **Login/Register** với Google OAuth 2.0
- **Firebase Authentication** integration
- **Session management** và auto-login
- **User profile creation** trong PostgreSQL via n8n

#### F2: Profile Management
- **Profile page** (`/profile`) để view/edit:
  - Display name, email, avatar
  - Account settings
  - Notification preferences

#### F3: Favorites System
- **Favorite button** trên workflow cards và detail pages
- **Favorites list** trong user dashboard
- **Add/remove favorites** với instant UI feedback

#### F4: Usage History
- **History tracking** của demo executions
- **History page** trong user dashboard
- **Filter và search** trong history

### 5.3 Community Features (Q1-Q2)

#### Q1: Comments System
- **Comment form** trên workflow và blog detail pages
- **Nested comments** với reply functionality
- **Comment moderation** (basic)
- **User authentication** required

#### Q2: Rating & Reviews
- **5-star rating system** cho workflows
- **Written reviews** với rating
- **Average rating display** trên cards và detail pages
- **Review management** (edit/delete own reviews)

### 5.4 Content Management

#### Blog System
- **Blog listing page** (`/blog`) với filter và search
- **Blog detail page** (`/blog/[slug]`) với comments
- **Category-based organization**
- **SEO optimization** cho content

#### Case Studies
- **Integrated case studies** trong workflow details
- **Standalone case study pages**
- **Success stories** và testimonials

### 5.5 Discovery & Personalization

#### Quiz System
- **Workflow recommendation quiz** (`/quiz`)
- **Multi-step questionnaire** về business needs
- **Personalized recommendations** based on answers
- **Integration** với workflow listing

#### Search & Filter
- **Global search** across workflows và blogs
- **Advanced filtering** by multiple criteria
- **Search suggestions** và autocomplete
- **Search result highlighting**

### 5.6 Request & Feedback (Q5)

#### Custom Request System
- **Request form** (`/request`) cho custom workflows
- **Detailed requirement gathering**
- **File upload** cho specifications
- **Request tracking** và status updates

#### Feedback Collection
- **General feedback form**
- **Workflow-specific feedback**
- **Bug reporting** system
- **Feature request** collection

---

## 6. Non-Functional Requirements (Yêu Cầu Phi Chức Năng)

### 6.1 Performance
- **Page load time** < 3 seconds on 3G connection
- **Demo execution** response time < 10 seconds
- **Image optimization** với next/image
- **Code splitting** và lazy loading
- **CDN integration** cho static assets

### 6.2 Security
- **OAuth 2.0** secure authentication
- **Rate limiting** cho demo executions
- **Input validation** và sanitization
- **HTTPS** enforcement
- **CSRF protection** cho forms
- **XSS prevention** cho user-generated content

### 6.3 Scalability
- **Responsive design** cho all screen sizes
- **Mobile-first** approach
- **Progressive Web App** features
- **Caching strategy** cho API responses
- **Database optimization** via n8n backend

### 6.4 Usability
- **Intuitive navigation** và user flows
- **Accessibility compliance** (WCAG 2.1 AA)
- **Loading states** và error handling
- **Consistent UI/UX** across platform
- **Multi-language support** (Vietnamese/English)

### 6.5 Reliability
- **99.9% uptime** target
- **Error boundaries** và graceful degradation
- **Backup và recovery** procedures
- **Monitoring và alerting** integration
- **Automated testing** coverage

---

## 7. User Journeys (Hành Trình Người Dùng)

### 7.1 Primary Journey: SME Owner Discovers & Implements Workflow

1. **Discovery Phase**
   - User arrives via Google search/social media
   - Browses homepage, sees featured workflows
   - Takes quiz to find suitable workflows
   - Views recommended workflow details

2. **Evaluation Phase**
   - Reads case study và user reviews
   - Watches demo video (if available)
   - Tries live demo với sample data
   - Sees actual results và benefits

3. **Decision Phase**
   - Decides workflow fits needs
   - Downloads free workflow hoặc requests custom version
   - Receives setup instructions
   - (Optional) Books consultation call

4. **Implementation Phase**
   - Follows setup guide
   - Configures workflow với own data
   - Tests và validates results
   - Provides feedback và rating

### 7.2 Secondary Journey: Developer Seeks Inspiration

1. **Research Phase**
   - Searches for specific automation type
   - Filters by technical complexity
   - Reviews multiple workflow options
   - Compares approaches và implementations

2. **Learning Phase**
   - Studies workflow architecture
   - Reads technical documentation
   - Tries demo to understand flow
   - Downloads for customization

3. **Contribution Phase**
   - Modifies workflow for own use
   - Shares feedback và improvements
   - (Future) Contributes own workflows
   - Engages với community discussions

---

## 8. Success Metrics (Chỉ Số Thành Công)

### 8.1 User Engagement
- **Monthly Active Users** (MAU)
- **Session duration** và page views per session
- **Demo completion rate** (users who complete demo)
- **Return visitor rate**

### 8.2 Content Performance
- **Workflow download/usage** rates
- **Demo execution** success rates
- **User ratings** và review quality
- **Blog engagement** (views, time on page)

### 8.3 Conversion Metrics
- **Quiz completion** to workflow view rate
- **Demo to download** conversion rate
- **Custom request** submission rate
- **User registration** rate

### 8.4 Technical Performance
- **Page load speeds** across devices
- **Demo execution** response times
- **Error rates** và system uptime
- **Search functionality** effectiveness

---

## 9. Timeline & Implementation Phases (Lộ Trình Triển Khai)

### Phase 1: Foundation (Months 1-3)
**Goal**: Xây dựng nền tảng frontend và giao diện mẫu

**Deliverables**:
- Basic website structure với Next.js + TypeScript
- Homepage, workflow listing, workflow detail pages
- Responsive design với ShadCN UI + Tailwind
- Mock data integration
- Basic navigation và search

**Success Criteria**:
- All core pages render correctly
- Responsive design works on all devices
- Basic user flows are functional
- Performance benchmarks met

### Phase 2: Backend Integration (Months 4-6)
**Goal**: Kết nối frontend với backend n8n

**Deliverables**:
- Live demo system integration
- User authentication với Firebase
- Real data integration via n8n webhooks
- Comment và rating systems
- Request form functionality

**Success Criteria**:
- Demo workflows execute successfully
- User authentication flows work
- Data persistence via PostgreSQL
- Real-time features functional

### Phase 3: Community & Features (Months 7-9)
**Goal**: Hoàn thiện tính năng người dùng và cộng đồng

**Deliverables**:
- User dashboard với favorites và history
- Advanced search và filtering
- Quiz recommendation system
- Blog system với content management
- Notification system

**Success Criteria**:
- All user management features complete
- Community features encourage engagement
- Content management system operational
- User feedback collection active

### Phase 4: Optimization & Launch (Months 10-12)
**Goal**: Tối ưu, quốc tế hóa và hoàn thiện

**Deliverables**:
- Performance optimization
- Multi-language support (Vietnamese/English)
- SEO optimization
- Analytics integration
- Security hardening
- Production deployment

**Success Criteria**:
- Platform ready for public launch
- All performance targets met
- Security audit passed
- Documentation complete

---

## 10. Kiến Trúc Kỹ Thuật Frontend

### 10.1 Công Nghệ Frontend
- **Framework**: Next.js 14+ với App Router
- **Ngôn Ngữ**: TypeScript
- **Giao Diện**: Tailwind CSS + ShadCN UI components
- **Quản Lý Trạng Thái**: React hooks + Zustand (nếu cần)
- **Xác Thực**: Firebase Authentication
- **Form**: React Hook Form + Zod validation

### 10.2 Tích Hợp Backend (Chỉ Đề Xuất)
- **Lớp API**: n8n workflows qua webhooks
- **Cơ Sở Dữ Liệu**: PostgreSQL (bạn tự quản lý)
- **Lưu Trữ File**: Firebase Storage hoặc Cloudinary
- **Dịch Vụ Email**: Tích hợp qua n8n workflows

### 10.3 Triển Khai & Hạ Tầng
- **Hosting**: Vercel hoặc Netlify
- **CDN**: Tự động qua nền tảng hosting
- **Tên Miền**: Tên miền tùy chỉnh với SSL
- **Giám Sát**: Vercel Analytics + Google Analytics qua GTM

### 10.4 Luồng Dữ Liệu
```
Frontend (Next.js) 
    ↕ (Server Actions)
n8n Webhooks 
    ↕ (Truy Vấn SQL)
PostgreSQL Database
```

### 10.5 Đề Xuất Cấu Trúc Database (Cho Bạn Tham Khảo)

**Bảng Users (Người Dùng)**
- id, email, name, avatar_url, created_at, updated_at

**Bảng Workflows**
- id, slug, title, description, category, difficulty, price, created_at

**Bảng User_Favorites (Yêu Thích)**
- user_id, workflow_id, created_at

**Bảng Usage_History (Lịch Sử Sử Dụng)**
- id, user_id, workflow_id, executed_at, status

**Bảng Comments (Bình Luận)**
- id, user_id, target_type, target_id, content, created_at

**Bảng Ratings (Đánh Giá)**
- id, user_id, workflow_id, rating, review, created_at

---

## 11. Risk Assessment & Mitigation (Đánh Giá Rủi Ro)

### 11.1 Technical Risks

#### High Risk: Demo System Abuse
- **Risk**: Users spam demo endpoints, causing system overload
- **Mitigation**: Rate limiting, CAPTCHA, IP blocking via n8n
- **Monitoring**: Request frequency tracking, automated alerts

#### Medium Risk: n8n Integration Complexity
- **Risk**: Webhook integration issues, data sync problems
- **Mitigation**: Comprehensive testing, fallback mechanisms
- **Monitoring**: Health checks, error logging

#### Low Risk: Performance Issues
- **Risk**: Slow page loads, poor user experience
- **Mitigation**: Code splitting, caching, CDN usage
- **Monitoring**: Core Web Vitals tracking

### 11.2 Business Risks

#### Medium Risk: User Adoption
- **Risk**: Low user engagement, poor retention
- **Mitigation**: Focus on UX, gather feedback early
- **Monitoring**: User analytics, feedback collection

#### Low Risk: Content Quality
- **Risk**: Poor workflow quality, negative reviews
- **Mitigation**: Quality guidelines, review process
- **Monitoring**: User ratings, feedback analysis

---

## 12. Open Questions & Assumptions (Câu Hỏi Mở & Giả Định)

### 12.1 Technical Assumptions
- n8n backend will be stable và properly configured
- PostgreSQL database will be optimized for read operations
- Firebase Authentication will handle expected user load
- Webhook response times will be acceptable for demo UX

### 12.2 Business Assumptions
- Users will find value in live demo experience
- SME market has sufficient demand for automation solutions
- Community features will drive engagement và retention
- Content quality will be maintained through user feedback

### 12.3 Open Questions for Future Consideration
- Should we implement real-time collaboration features?
- How to handle workflow versioning và updates?
- What level of customization should be allowed in demos?
- How to scale the platform for multiple workflow contributors?

---

## 13. Appendices (Phụ Lục)

### 13.1 Competitive Analysis Summary

| Platform | Strengths | Weaknesses | n8n-os Advantage |
|----------|-----------|------------|------------------|
| n8n.io Templates | Official, diverse | No live demo, no marketplace | Interactive demo, personalized experience |
| Zapier Marketplace | User-friendly, large community | Closed workflows, expensive | Open source, customizable |
| Make Templates | Affordable, good docs | Limited customization | Better demo experience |
| Freelancer Groups | Real-world solutions | No quality control | Professional platform, support |

### 13.2 Feature Priority Matrix

| Feature Category | Must Have | Should Have | Could Have |
|------------------|-----------|-------------|------------|
| Core Platform | Homepage, Workflows, Demo | Search, Filter | Advanced Analytics |
| User Management | OAuth Login, Profile | Favorites, History | Social Features |
| Community | Comments, Ratings | Feedback Forms | Advanced Moderation |
| Content | Blog System | Case Studies | Video Integration |

### 13.3 Lý Do Lựa Chọn Công Nghệ

**Next.js**: Được chọn vì khả năng SSR, hiệu suất cao và trải nghiệm phát triển tốt
**TypeScript**: Đảm bảo chất lượng code và tăng năng suất phát triển
**ShadCN UI**: Cung cấp components nhất quán, dễ tiếp cận với khả năng tùy chỉnh
**Firebase Auth**: Đơn giản hóa việc triển khai OAuth với Google
**Tailwind CSS**: Cho phép phát triển UI nhanh chóng với thiết kế nhất quán

---

*Phiên Bản Tài Liệu: 1.0*  
*Cập Nhật Lần Cuối: Tháng 12/2024*  
*Đánh Giá Tiếp Theo: Sau Khi Hoàn Thành Giai Đoạn 1*

---

## Lưu Ý Quan Trọng Về Phạm Vi Dự Án

**🎯 Trọng Tâm: Chỉ Phát Triển Frontend**

Tài liệu này tập trung hoàn toàn vào việc phát triển giao diện người dùng (frontend). Tất cả các thành phần backend, database và hạ tầng sẽ do bạn tự xây dựng và quản lý.

**📋 Vai Trò Phân Chia:**
- **Frontend Developer (AI)**: Xây dựng giao diện Next.js, tích hợp với API
- **Backend Developer (Bạn)**: Xây dựng n8n workflows, quản lý PostgreSQL, tạo webhooks

**🔗 Điểm Kết Nối:**
- Frontend sẽ gọi đến các webhook endpoints mà bạn cung cấp
- Tất cả logic nghiệp vụ, xử lý dữ liệu và bảo mật sẽ do backend n8n của bạn xử lý
- Frontend chỉ chịu trách nhiệm hiển thị dữ liệu và thu thập input từ người dùng 