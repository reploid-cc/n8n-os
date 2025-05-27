
# Kế Hoạch Phát Triển Dự Án Website Workflows n8n

## 1. Giới Thiệu và Mục Tiêu Tổng Thể

**Mục tiêu chính của dự án:**
- Cung cấp các workflow n8n cho người khác (khách hàng tiềm năng, người dùng nội bộ).
- Chia sẻ kiến thức, viết blog về n8n, automation và các chủ đề liên quan, hướng tới cộng đồng n8n.

**Đối tượng người dùng mục tiêu (ưu tiên từ trên xuống):**
1. Khách hàng tiềm năng.
2. Người dùng nội bộ.
3. Cộng đồng n8n.

**Công nghệ chủ đạo:**
- Frontend: Next.js, TypeScript, ShadCN UI, Tailwind CSS.
- Backend & Database: Do người dùng tự quản lý (n8n, PostgreSQL). Frontend sẽ tương tác qua Webhook.
- (Cân nhắc) Xác thực: Firebase Authentication cho việc đăng nhập/đăng ký (Tính năng F1).
- (Cân nhắc) Chatbot AI: Genkit cho logic chatbot (Tính năng Q5).

## 2. Quy Trình Làm Việc và Phụ Thuộc Backend

Để đảm bảo quá trình phát triển frontend hiệu quả và dựa trên dữ liệu thực tế (hoặc cấu trúc dữ liệu đã thống nhất), chúng ta sẽ tuân theo quy trình sau cho mỗi cấu phần chính của trang web (ví dụ: Trang chủ, Trang Workflows, Trang Blog, các tính năng người dùng):

1.  **Phía Người Dùng (Bạn):**
    *   **Xác định cấu trúc dữ liệu:** Thống nhất các bảng (tables) cần thiết trong cơ sở dữ liệu PostgreSQL cho cấu phần/tính năng đó. Điều này bao gồm cả các bảng cho thông tin người dùng, danh sách yêu thích, lịch sử sử dụng, bình luận, đánh giá, v.v. nếu các tính năng đó được triển khai.
    *   **Xây dựng Database:** Thiết lập và quản lý các bảng trong PostgreSQL.
    *   **Xây dựng Backend n8n:** Tạo các workflow n8n tương ứng để:
        *   Tương tác với PostgreSQL (đọc/ghi dữ liệu, ví dụ: lấy thông tin người dùng, lưu workflow yêu thích, ghi lịch sử sử dụng, lưu bình luận/đánh giá, lưu trữ phản hồi từ chatbot Q5).
        *   Xử lý logic nghiệp vụ (ví dụ: xác thực, quản lý phiên, thực thi workflow demo, xử lý logic gợi ý, quản lý thông báo, xử lý yêu cầu workflow mới, tích hợp thanh toán).
        *   Cung cấp dữ liệu và chức năng ra bên ngoài thông qua các Webhook API (theo chiến lược đã thống nhất trong mục "Quản Lý Cấu Hình Webhook").
    *   **(Tùy chọn) Xây dựng Trang Quản Trị Backend:** Nếu cần, bạn sẽ tự xây dựng một giao diện quản trị để thực hiện các thao tác CRUD trên dữ liệu trong PostgreSQL.

2.  **Phía App Prototyper (AI):**
    *   **Tiếp nhận thông tin Webhook/Yêu cầu tính năng:** Sau khi bạn hoàn thành backend n8n và webhook đã sẵn sàng (hoặc ít nhất có định nghĩa rõ ràng về URL, method, payload và cấu trúc response cho một tính năng cụ thể), App Prototyper sẽ:
    *   **Cấu hình Webhook (nếu có):** Cập nhật file `src/config/workflowRoutes.ts` với thông tin webhook thực tế hoặc mock dựa trên định nghĩa.
    *   **Xây dựng Frontend UI:** Phát triển các trang và thành phần Next.js để gọi đến các webhook này (thông qua Server Actions) hoặc triển khai UI cho các tính năng mới (ví dụ: form đăng nhập, trang quản lý hồ sơ, nút yêu thích, khu vực bình luận, giao diện chatbot Q5) và hiển thị dữ liệu nhận được hoặc tương tác với backend.

Quy trình này đảm bảo frontend được xây dựng dựa trên một "nguồn sự thật" (source of truth) rõ ràng từ backend, giảm thiểu việc phải làm lại và giúp việc tích hợp dễ dàng hơn.

## 3. Cấu Trúc Trang Web và Chức Năng (Sơ bộ)

- **`/` (Trang chủ):** Giới thiệu, workflows nổi bật, blog mới nhất. Widget Chatbot (Q5).
- **`/workflows` (Tổng quan Workflows):** Danh sách workflows, có bộ lọc, tìm kiếm.
- **`/workflows/[slug]` (Chi tiết Workflow):** Thông tin đầy đủ về 1 workflow, link demo, nút yêu thích (F3), khu vực đánh giá (Q2), khu vực bình luận (Q1).
- **`/workflows/[slug]/demo` (Demo Workflow):** Form nhập liệu và hiển thị kết quả demo (ví dụ: Ad Insights Bridge).
- **`/blog` (Tổng quan Blog):** Danh sách bài viết, lọc, tìm kiếm.
- **`/blog/[slug]` (Chi tiết Bài Blog):** Nội dung bài viết, khu vực bình luận (Q1).
- **`/auth/login` (Đăng nhập/Đăng ký):** Trang xử lý đăng nhập/đăng ký (F1).
- **`/profile` (hoặc `/dashboard` - Trang cá nhân/Tổng quan người dùng):** Xem/sửa thông tin (F2), xem danh sách yêu thích (F3), lịch sử sử dụng (F4), gợi ý cá nhân hóa (Q4), quản lý thông báo (Q3).
- **`/contact` (Liên hệ - tùy chọn).**
- **`/about` (Giới thiệu - tùy chọn).**

*(Lưu ý: Việc triển khai các tính năng sẽ tuân theo danh sách trong `Plan/FEATURES.md`. Các tính năng F1-F6 và Q1-Q11 sẽ được lồng ghép vào các giai đoạn phát triển.)*

## 4. Quản Lý Cấu Hình Webhook

Sử dụng file `src/config/workflowRoutes.ts` để quản lý tập trung các URL webhook, HTTP method và các thông tin liên quan cho từng route/chức năng.

**Chiến lược WebhookURL Động (Đã tinh chỉnh):**

*   **GET Requests (Lấy danh sách, dữ liệu chi tiết ít thay đổi):**
    *   Chủ yếu dùng để lấy **danh sách** các mục (ví dụ: tất cả workflows, tất cả bài blog) hoặc các dữ liệu chung không yêu cầu tham số động trong path.
    *   Cũng có thể dùng để lấy **dữ liệu chi tiết của một mục cụ thể bằng `slug`** (ví dụ: chi tiết workflow tại `/workflows/[slug]`, chi tiết bài blog tại `/blog/[slug]`).
        *   `webhookUrl` trong file config có thể là URL cơ sở (ví dụ: `https://your-n8n.com/api/workflows/`). Frontend (Server Action) sẽ ghép `slug` vào cuối URL (`config.webhookUrl + slug`).
        *   Phía n8n, Webhook node sẽ lắng nghe trên path động (ví dụ: `/api/workflows/:slug`) để trích xuất `slug`. Workflow n8n sau đó sẽ dùng `slug` để truy vấn dữ liệu (có thể cần bước trung gian để đổi slug sang ID nếu database chính dùng ID).
    *   **Lợi ích:** Tận dụng tối đa khả năng caching của Next.js (App Router Data Cache, `fetch` request memoization), giúp tăng tốc độ cho các lần truy cập lặp lại vào cùng một tài nguyên.
    *   Ví dụ:
        *   Trang `/workflows` sẽ gọi `GET` đến `YOUR_N8N_API_ENDPOINT_FOR_ALL_WORKFLOWS`.
        *   Trang `/blog` sẽ gọi `GET` đến `YOUR_N8N_API_ENDPOINT_FOR_BLOG_LIST`.
        *   Trang `/` (trang chủ) sẽ gọi `GET` đến `YOUR_N8N_API_ENDPOINT_FOR_HOMEPAGE`.
        *   Trang `/workflows/[slug]` sẽ gọi `GET` đến `YOUR_N8N_API_ENDPOINT_BASE_FOR_WORKFLOW_DETAIL + slug`.
    *   Next.js Server Action sẽ thực hiện các cuộc gọi `GET` này.

*   **POST Requests (Thực thi hành động, gửi data, hoặc lấy dữ liệu chi tiết khi GET phức tạp/input động):**
    *   Dùng cho việc **thực thi hành động** (ví dụ: chạy demo workflow, đăng nhập, cập nhật hồ sơ, thêm vào yêu thích, gửi bình luận, gửi đánh giá, gửi yêu cầu workflow, xử lý thanh toán).
    *   Dùng để **gửi dữ liệu input** từ form.
    *   Trong một số trường hợp, có thể dùng để **lấy dữ liệu chi tiết của một mục cụ thể bằng `slug`** nếu việc cấu hình GET trong n8n cho slug phức tạp, hoặc để giữ sự đồng nhất nếu đa số các tương tác khác là POST. Tuy nhiên, GET vẫn được ưu tiên cho việc lấy dữ liệu chi tiết nếu khả thi để tận dụng caching.
    *   **Đặc biệt với `/workflows/[slug]/demo`:** Mặc dù về lý thuyết có thể dùng GET, nhưng do **input cho demo thường xuyên thay đổi**, lợi ích caching của GET bị giảm thiểu. Hơn nữa, việc "chạy demo" mang tính chất "thực thi một hành động" dựa trên input, nên **POST là phương thức ngữ nghĩa và thực tế hơn**. Dữ liệu input (form data) sẽ được gửi trong body của POST request.
    *   `webhookUrl` trong file config là một URL cố định cho từng loại hành động/truy vấn này.
    *   Ví dụ:
        *   Trang `/workflows/[slug]/demo`: Server Action sẽ gửi `POST` request đến `YOUR_N8N_WEBHOOK_FOR_WORKFLOW_DEMO`, body chứa `{ "slug": "...", "formData": {...} }`.
        *   Xác thực người dùng: Server Action sẽ gửi `POST` request (ví dụ: chứa ID token từ Google) đến webhook n8n xử lý logic đăng nhập/đăng ký.
        *   Gửi bình luận: Server Action sẽ gửi `POST` request đến webhook n8n, body chứa `user_id`, `target_slug` (workflow/blog), `comment_content`.

## 5. Các Giai Đoạn Triển Khai và Mục Tiêu

Chi tiết về mục tiêu, điều kiện tiên quyết và checklist cho từng giai đoạn triển khai được mô tả trong các tệp sau:

*   **Giai đoạn 1:** [Xây Dựng Nền Tảng Frontend và Giao Diện Mẫu](./phase_1.md)
*   **Giai đoạn 2:** [Kết Nối Frontend với Backend n8n](./phase_2.md)
*   **Giai đoạn 3:** [Hoàn Thiện Backend n8n và Tính Năng Người Dùng](./phase_3.md)
*   **Giai đoạn 4:** [Tối Ưu, Quốc Tế Hóa và Hoàn Thiện](./phase_4.md)

Checklist chi tiết cho từng giai đoạn có thể được tìm thấy trong file [checklist.md](./checklist.md).

*(Lưu ý: Việc triển khai các tính năng trong `Plan/FEATURES.md` sẽ được lồng ghép vào các giai đoạn này. Đặc biệt, F1: Xác thực người dùng nên được ưu tiên sớm nếu các tính năng khác phụ thuộc vào nó.)*

## 6. Các Hướng Phát Triển và Mở Rộng Tiềm Năng (Gợi Ý)

*(Tham khảo thêm các tính năng gợi ý Q1-Q11 trong file `Plan/FEATURES.md`)*

Để dự án không chỉ đáp ứng các yêu cầu cơ bản mà còn tạo ra giá trị vượt trội và "wow" hơn:

*   **Nâng Cao Trải Nghiệm Workflow:**
    *   **Tài liệu hóa Workflow chi tiết hơn:** Ngoài mô tả, có thể thêm video hướng dẫn ngắn, sơ đồ trực quan cho mỗi workflow phức tạp.
    *   **Phiên bản Workflow:** Nếu các workflow của bạn được cập nhật thường xuyên, cân nhắc cách hiển thị thông tin phiên bản hoặc nhật ký thay đổi.
    *   **Call-to-Action (CTA) rõ ràng:** Với mỗi workflow, hướng dẫn người dùng hành động tiếp theo (ví dụ: "Liên hệ tư vấn", "Yêu cầu triển khai", "Xem case study liên quan").
    *   **Ước tính giá trị/ROI:** Nếu có thể, đưa ra các ước tính về lợi ích mà workflow mang lại (ví dụ: tiết kiệm X giờ/tháng).
*   **Phát Triển Nội Dung Blog và Cộng Đồng:**
    *   **Chủ đề Blog đa dạng:** Hướng dẫn kỹ thuật, case study thực tế, phân tích xu hướng automation, so sánh công cụ, mẹo tối ưu n8n.
    *   **Nội dung tương tác:** Các bài viết có thể nhúng các đoạn demo nhỏ, câu đố, hoặc các công cụ tính toán đơn giản liên quan đến n8n.
    *   **Guest Posting/Series Chuyên Sâu:** Mời chuyên gia đóng góp hoặc xây dựng các chuỗi bài viết chuyên sâu.
*   **Cải Tiến Kỹ Thuật và Trải Nghiệm Người Dùng Tổng Thể:**
    *   **Tích hợp Analytics (ngoài Q11 - GTM):** Nếu GTM đã được tích hợp (Q11), bạn có thể dễ dàng thêm Google Analytics hoặc các công cụ phân tích khác thông qua GTM để theo dõi hành vi người dùng chi tiết hơn.
    *   **Thu thập phản hồi (ngoài Q5):** Ngoài chatbot/form, có thể tích hợp một form phản hồi chung đơn giản hoặc công cụ như Hotjar.

## 7. Ý Tưởng Marketing và Tăng Tương Tác (Tham khảo)

*(Đây là các ý tưởng chiến lược, không phải tính năng cần App Prototyper xây dựng UI trực tiếp trong giai đoạn đầu, nhưng có thể định hướng thiết kế và phát triển tính năng trong tương lai)*

1.  **Social Proof & Hiển Thị Thành Tích:**
    *   **Feed hoạt động mới nhất (Activity Feed):** Hiển thị các hành động real-time: "Người dùng X vừa thử demo workflow Y", "5 người đã yêu thích workflow Z tuần này", tạo cảm giác website luôn có hoạt động, tăng niềm tin.
    *   **Section Feedback/Case Study/Testimonials động:** Có thể bật/tắt ở từng workflow, hiển thị feedback kèm quote, avatar (thật/ảo), thậm chí fake data giai đoạn đầu để "làm nóng".

2.  **Workflow Showcase & Demo Cá Nhân Hóa:**
    *   **Workflow Interactive Tour:** Popup/tour step-by-step giải thích từng workflow trực quan, có animation/video hoặc slides (không cần lộ mặt).
    *   **Live Demo “Sandbox” có lưu lịch sử (cho cả guest):** Guest dùng thử workflow, output bị mask/bị giới hạn hoặc chỉ show 1 phần, cuối demo gợi ý đăng ký lấy full kết quả.
    *   **Quiz chọn workflow:** Tích hợp quiz ngắn giúp user (cả guest) chọn giải pháp phù hợp, cuối quiz tự động gợi ý workflow (phễu mềm, convert lead cực mạnh).

3.  **Lead Magnet & Chăm sóc tự động:**
    *   **Tải workflow/freebie chỉ sau khi để lại email/telegram:** "Muốn nhận 3 workflow mẫu? Đăng ký để nhận link tải và hướng dẫn" → Tích hợp automation gửi qua email/zalo.
    *   **Landing page/Popup “Đăng ký nhận bản tin/case study mới nhất”:** Luôn có CTA (kêu gọi hành động) ở các điểm nóng trên web.

4.  **Tăng Engagement & Viral:**
    *   **Workflow share link (deep link - liên quan Q8):** Mỗi workflow có link chia sẻ trực tiếp lên mạng xã hội, hoặc copy link dễ dàng, có UTM tracking để biết nguồn traffic (phân tích lại hiệu quả kênh).
    *   **Nút “Recommend cho bạn bè”:** Gửi qua email/zalo/facebook – ai giới thiệu thành công được credit/ưu đãi.

5.  **Tối ưu cho “tự động hóa bán hàng”:**
    *   **Form booking tư vấn 1-1:** Đặt lịch call tư vấn với bạn (dùng Calendly hoặc workflow tự động của n8n), vừa hỗ trợ lead, vừa upsell.
    *   **Notification động (liên quan Q3):** Ngoài thông báo update, có thể gửi email/push notification khi có workflow mới theo chủ đề khách quan tâm.

6.  **Bổ sung nâng cấp cho cộng đồng & feedback:**
    *   **Hệ thống vote cho tính năng mới (Feature request voting):** User đề xuất và vote lên các tính năng/workflow muốn phát triển tiếp – làm minh bạch roadmap, gắn kết user.
    *   **Notification/alert khi workflow user đã dùng bị update hoặc lỗi (liên quan Q3):** Tạo cảm giác chuyên nghiệp, chăm sóc tốt.


## 8. Các Quyết Định Kỹ Thuật Khác (Cần thảo luận thêm)

- **Xác thực người dùng:** **Firebase Authentication** được đề xuất mạnh mẽ, đặc biệt cho đăng nhập với Google (F1).
- **Quản lý trạng thái global (nếu cần sau khi có nhiều tương tác client-side phức tạp):** Zustand, Jotai, hoặc React Context. (Ưu tiên Server Components và Server Actions trước).
- **Fetching dữ liệu phía client (nếu Server Actions không đủ cho các tương tác phức tạp):** React Query/SWR. (Ưu tiên Server Actions trước).
- **Xử lý Markdown cho Blog:** `react-markdown` hoặc `next-mdx-remote`.
- **Thư viện i18n cho đa ngôn ngữ:** `next-intl` hoặc `react-i18next` (F5).
- **Cổng thanh toán (cho Q6):** Stripe, PayPal, các cổng nội địa.
- **Triển khai (Deployment):** Vercel, Netlify, Firebase Hosting, etc.

---
*Lưu ý: File này sẽ được cập nhật thường xuyên trong quá trình phát triển.*

    