
# Giai đoạn 2: Kết Nối Frontend với Backend n8n (Dữ Liệu Thật cho Workflows/Blog và Bắt đầu Tích hợp Xác thực)

**Điều kiện tiên quyết từ phía bạn (Người dùng):**
-   Đã xác định cấu trúc dữ liệu cho workflows và blog posts trong PostgreSQL.
-   Đã xây dựng n8n workflows và các webhook API thật tương ứng với các route đã định nghĩa trong `src/config/workflowRoutes.ts` cho việc lấy dữ liệu workflows và blog.
-   Cung cấp URL webhook thật và cấu trúc dữ liệu response chi tiết cho App Prototyper.
-   Bắt đầu thiết lập backend n8n cho việc xác thực người dùng với Google (tính năng **F1**) và cung cấp webhook endpoint cho việc này.
-   (Nếu triển khai **Q11** sớm) Cung cấp Google Tag Manager ID.

**Mục tiêu chính (cho App Prototyper):**
- Thay thế toàn bộ mock data cho workflows và blog bằng việc gọi đến các n8n webhook thực tế của bạn.
- Tích hợp logic xác thực người dùng với Google (**F1**) sử dụng Firebase Authentication ở frontend, và gọi đến webhook n8n của bạn để đồng bộ/tạo hồ sơ người dùng trong PostgreSQL.
- Hiển thị thông tin người dùng cơ bản (tên, ảnh đại diện) trên trang Profile sau khi đăng nhập.
- (Nếu có) Tích hợp Google Tag Manager (**Q11**) vào `src/app/layout.tsx`.
- Kiểm thử kỹ lưỡng việc gọi API, hiển thị dữ liệu thật, và xử lý các trường hợp lỗi.

*(Checklist chi tiết cho giai đoạn này có trong `Plan/checklist.md`)*

    