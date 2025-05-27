
# Checklist Triển Khai Dự Án

## Giai đoạn 1: Xây Dựng Nền Tảng Frontend và Giao Diện Mẫu

**Checklist chi tiết (App Prototyper):**
- [ ] Tạo layout chính (Header, Footer, Main content area), bao gồm vị trí cho nút đăng nhập/profile và chuyển đổi ngôn ngữ/theme.
- [ ] **Trang chủ (`/`):**
    - [ ] Thiết kế UI cho các section: Hero, Workflows nổi bật, Blog mới nhất (sử dụng mock data).
    - [ ] (UI Mockup) Placeholder cho widget Chatbot (Q5 GĐ2).
- [ ] **Trang Tổng Quan Workflows (`/workflows`):**
    - [ ] Thiết kế UI dạng card để hiển thị mỗi workflow (mock data).
    - [ ] (Optional GĐ1) Implement tìm kiếm, lọc cơ bản trên mock data.
- [ ] **Trang Chi Tiết Workflow (`/workflows/[slug]`):**
    - [ ] Thiết kế UI hiển thị thông tin chi tiết (mock data).
    - [ ] Nút điều hướng đến trang Demo.
    - [ ] (UI Mockup) Placeholder cho nút "Yêu thích" (F3).
    - [ ] (UI Mockup) Placeholder cho khu vực Đánh giá (Q2).
    - [ ] (UI Mockup) Placeholder cho khu vực Bình luận (Q1).
    - [ ] (UI Mockup) Placeholder cho nút "Chia sẻ" (Q8).
- [ ] **Trang Demo Workflow (`/workflows/[slug]/demo`):**
    *   [ ] Lấy "Ad Insights Bridge" làm mẫu. Giao diện form và bảng kết quả có thể được xây dựng, nhưng logic submit ban đầu sẽ dùng mock.
- [ ] **Trang Tổng Quan Blog (`/blog`):**
    - [ ] Thiết kế UI dạng card cho các bài blog (mock data).
- [ ] **Trang Chi Tiết Bài Blog (`/blog/[slug]`):**
    - [ ] Thiết kế UI hiển thị nội dung bài blog (mock data, hỗ trợ Markdown).
    - [ ] (UI Mockup) Placeholder cho khu vực Bình luận (Q1).
- [ ] **Trang Đăng nhập/Đăng ký (`/auth/login`):**
    - [ ] Thiết kế UI với nút "Đăng nhập với Google" (F1).
- [ ] **Trang Hồ sơ cá nhân/Dashboard (`/profile`):**
    - [ ] Thiết kế UI cơ bản (mock data) với các tab/section cho:
        - Thông tin cá nhân (F2).
        - Workflows yêu thích (F3).
        - Lịch sử sử dụng (F4).
        - Gợi ý cá nhân hóa (Q4 - placeholder).
        - Quản lý thông báo (Q3 - placeholder).
- [ ] **Trang Góp Ý/Yêu Cầu (`/feedback` hoặc component):**
    - [ ] Thiết kế UI cho form Gửi Yêu Cầu/Góp Ý Workflow (Q5 GĐ1).
- [ ] **Cấu hình và Server Actions:**
    - [ ] Hoàn thiện `src/config/workflowRoutes.ts` với các URL mock.
    - [ ] Tạo các Server Actions cơ bản gọi đến URL mock cho các trang trên.
- [ ] **Điều hướng cơ bản:** Menu chính, breadcrumbs (nếu có).
- [ ] **Thẩm mỹ:** Áp dụng theme tối giản, hiện đại, chuyên nghiệp (ShadCN + Tailwind). Responsive cơ bản.
- [ ] (UI Mockup) Cân nhắc vị trí cho nút chuyển đổi Dark/Light mode (Q7).

## Giai đoạn 2: Kết Nối Frontend với Backend n8n

**Checklist chi tiết (App Prototyper & Người dùng):**
- [ ] **(App Prototyper)** Lần lượt cập nhật các Server Actions để sử dụng `webhookUrl` thật từ `src/config/workflowRoutes.ts` cho:
    - [ ] Trang chủ (workflows nổi bật, blog mới nhất).
    - [ ] Danh sách Workflows.
    - [ ] Chi tiết Workflow.
    - [ ] Demo Workflow (kết nối "Ad Insights Bridge" với webhook thật của nó).
    *   [ ] Danh sách Blog.
    *   [ ] Chi tiết Blog.
- [ ] **(App Prototyper)** Tích hợp frontend với Firebase Authentication cho chức năng Đăng nhập/Đăng ký với Gmail (F1). Gọi đến webhook n8n của bạn (theo luồng đã mô tả trong F1) sau khi Firebase xác thực thành công để đồng bộ/tạo hồ sơ người dùng trong PostgreSQL.
- [ ] **(App Prototyper)** Hiển thị thông tin người dùng cơ bản (tên, ảnh đại diện) trên trang Profile sau khi đăng nhập.
- [ ] **(App Prototyper)** (Nếu triển khai) Tích hợp Google Tag Manager (Q11) vào `src/app/layout.tsx` sử dụng biến môi trường.
- [ ] **(App Prototyper)** Kiểm thử việc gọi API và hiển thị dữ liệu thật trên tất cả các trang liên quan.
- [ ] **(App Prototyper)** Xử lý các trường hợp lỗi có thể xảy ra khi gọi webhook (ví dụ: lỗi mạng, lỗi từ n8n).
- [ ] **(Người dùng & App Prototyper)** Đảm bảo dữ liệu được truyền đúng định dạng giữa frontend và backend.

## Giai đoạn 3: Hoàn Thiện Backend n8n, Quản Trị Dữ Liệu và các Tính Năng Người Dùng

**Checklist (App Prototyper & Người dùng):**
- [ ] **(Người dùng)** Database PostgreSQL: Cấu trúc bảng hoàn chỉnh.
- [ ] **(Người dùng)** Backend n8n: Các workflows cho các tính năng mục tiêu đã hoàn thiện.
- [ ] **(App Prototyper)** Frontend:
    - [ ] Hoàn thiện chức năng đăng nhập/đăng ký (F1), quản lý hồ sơ (F2).
    - [ ] Implement chức năng Yêu thích (F3), Lịch sử (F4).
    - [ ] Implement chức năng Bình luận (Q1), Đánh giá (Q2).
    - [ ] Implement Form Góp Ý (Q5 - GĐ1).
    - [ ] Implement Nút Chia Sẻ (Q8).
    - [ ] Implement các phần của Dashboard (Q4), Thông báo (Q3), UX enhancements (Q7) đã được duyệt.
    - [ ] (Nếu triển khai Q5 - GĐ2) Xây dựng UI chatbot và Genkit flow cơ bản để thu thập phản hồi và gửi đến webhook n8n.
- [ ] **(Người dùng - Tùy chọn)** Hệ thống quản trị backend: Đã xây dựng, kiểm thử và sẵn sàng.

## Giai đoạn 4: Tối Ưu, Quốc Tế Hóa, Kiểm Thử Cuối Cùng và Hoàn Thiện

**Checklist chi tiết (App Prototyper):**
- [ ] **Tối ưu hiệu suất (Q10):**
    - [ ] Tối ưu hình ảnh (sử dụng `next/image`).
    - [ ] Kiểm tra và cải thiện tốc độ tải trang (Lighthouse, PageSpeed Insights).
    - [ ] Code splitting và lazy loading (Next.js đã hỗ trợ tốt, cần rà soát).
- [ ] **SEO:**
    - [ ] Đảm bảo các thẻ meta (title, description) được đặt động và chính xác cho từng trang, bao gồm Open Graph và Twitter Cards cho chia sẻ (Q8).
    - [ ] Tạo `sitemap.xml` và `robots.txt`.
    - [ ] Sử dụng semantic HTML.
- [ ] **Quốc tế hóa (F5, F6) (nếu triển khai):**
    - [ ] Tích hợp thư viện i18n.
    - [ ] Tạo các file dịch.
    - [ ] Cập nhật UI.
- [ ] **Cải tiến UX (Q7):**
    - [ ] Triển khai Dark Mode.
    - [ ] Cải thiện tìm kiếm.
- [ ] **Chatbot (Q5 - GĐ2, nếu triển khai):**
    - [ ] Tối ưu Genkit flow.
    - [ ] Kiểm thử kỹ lưỡng các kịch bản hội thoại.
- [ ] **Kiểm thử:**
    - [ ] Kiểm thử responsive, cross-browser.
    - [ ] Kiểm thử luồng người dùng.
    - [ ] Kiểm thử bảo mật cơ bản (ví dụ: input validation).
- [ ] **Hoàn thiện:**
    - [ ] Rà soát UI/UX.
    - [ ] Kiểm tra lỗi chính tả, ngữ pháp.
    - [ ] Tài liệu hóa (nếu cần).

    