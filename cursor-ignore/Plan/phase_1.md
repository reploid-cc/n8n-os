
# Giai đoạn 1: Xây Dựng Nền Tảng Frontend và Giao Diện Mẫu (Sử dụng Mock Data)

**Mục tiêu chính:**
- Thiết lập cấu trúc dự án Next.js, các layout chính (Header, Footer), và các thành phần UI (ShadCN) có thể tái sử dụng.
- Xây dựng giao diện (UI) cho các trang cốt lõi: Trang chủ (`/`), Danh sách Workflows (`/workflows`), Chi tiết Workflow (`/workflows/[slug]`), Trang Demo Workflow mẫu (`/workflows/[slug]/demo`), Trang Blog (`/blog`), Chi tiết Blog (`/blog/[slug]`). Tất cả sẽ sử dụng dữ liệu giả (mock data) để định hình UI/UX.
- Tạo UI placeholders/mockups cho các tính năng sẽ tích hợp sau:
    - Quản lý người dùng: **F1** (Đăng nhập/Đăng ký), **F2** (Thông tin cá nhân), **F3** (Yêu thích), **F4** (Lịch sử).
    - Cộng đồng & Tương tác: **Q1** (Bình luận), **Q2** (Đánh giá).
    - Cá nhân hóa: **Q4** (Dashboard người dùng - các section cơ bản).
    - Phản hồi: **Q5 Giai đoạn 1** (Form góp ý).
    - (Mockup UI) **Q5 Giai đoạn 2** (Widget Chatbot).
    - Chia sẻ: **Q8** (Nút chia sẻ MXH).
- Hoàn thiện file cấu hình `src/config/workflowRoutes.ts` với các URL webhook giả lập (mock URLs) cho các chức năng trên.
- Tạo các Server Actions cơ bản trong Next.js để gọi đến các URL mock này, giúp kiểm tra luồng hoạt động ban đầu.

**Điều kiện tiên quyết từ phía bạn (Người dùng) cho giai đoạn tiếp theo:**
-   (Không bắt buộc cho GĐ1, nhưng cần cho GĐ2) Xác định cấu trúc dữ liệu cơ bản cho workflows và blog posts.

*(Checklist chi tiết cho giai đoạn này có trong `Plan/checklist.md`)*

    