# Product Requirements Document: Frontend UI Builder cho n8n Workflows

## 1. Tổng quan (Overview)

**Sản phẩm:** Frontend UI Builder cho n8n Workflows (gọi tắt là "UI Builder") là một ứng dụng web dựa trên React, được thiết kế để cung cấp giao diện người dùng trực quan và thân thiện cho việc tương tác với các n8n workflow.

**Mục đích:**
*   Đơn giản hóa quá trình nhập liệu và kích hoạt các n8n workflow cho người dùng cuối, bao gồm cả những người không có chuyên môn kỹ thuật.
*   Cung cấp một cách thức trực quan để xem kết quả trả về từ n8n.
*   Tạo một nền tảng để giới thiệu, quản lý và có khả năng thương mại hóa các n8n workflow dưới dạng các UI tương tác.

**Giá trị cốt lõi:**
*   **Trải nghiệm người dùng cải thiện:** Giao diện đẹp, dễ sử dụng hơn so với việc tương tác trực tiếp với n8n backend hoặc Postman.
*   **Khả năng tiếp cận:** Mở rộng khả năng sử dụng n8n workflow cho nhiều đối tượng người dùng hơn.
*   **Quản lý tập trung:** Cung cấp một nơi duy nhất để khám phá, tìm hiểu thông tin và sử dụng các UI cho workflow.
*   **Tiềm năng thương mại hóa:** Hiển thị thông tin giá cả và tạo tiền đề cho việc bán quyền truy cập/sử dụng các workflow UI.

## 2. Mục tiêu (Goals and Objectives)

*   **GO1:** Phát triển một ứng dụng React SPA (Single Page Application) có khả năng render động các form nhập liệu và hiển thị kết quả cho nhiều n8n workflow khác nhau dựa trên cấu hình.
*   **GO2:** Hỗ trợ xác thực người dùng (đăng nhập/đăng ký) sử dụng Gmail (bắt buộc) và các nhà cung cấp khác (ví dụ: Facebook), với logic xác thực được xử lý qua n8n backend và dữ liệu lưu trữ trên PostgreSQL.
*   **GO3:** Cho phép gửi thông tin người dùng (đã đăng nhập) trong header khi kích hoạt n8n workflow.
*   **GO4:** Cung cấp trang thông tin chi tiết cho mỗi workflow, bao gồm mô tả và giá cả.
*   **GO5:** Đảm bảo giao diện người dùng mobile-first và responsive.


## 3. Phạm vi (Scope)

**Bao gồm (In-Scope - Phiên bản đầu tiên):**

*   **Nền tảng React Host App:**
    *   Ứng dụng React chính, chạy trên Vite, sử dụng React Router.
    *   Route động `/:workflowSlug/demo` cho trang UI tương tác của workflow.
*   **Xác thực Người dùng:**
    *   Luồng đăng nhập/đăng ký cơ bản (Gmail là ưu tiên).
    *   Logic xác thực được xử lý bởi một workflow n8n riêng.
    *   Gửi thông tin người dùng trong header khi trigger workflow (nếu đã đăng nhập).
*   **Trang UI Tương tác Workflow (`/:workflowSlug/demo`):**
    *   Render form nhập liệu động dựa trên cấu hình workflow.
    *   Hỗ trợ các loại input: cơ bản (text, number, date), file upload, danh sách động (dynamic select), multi-select.
    *   Gửi dữ liệu (payload + user header) đến URL webhook n8n cụ thể của workflow.
    *   Hiển thị output từ n8n, bao gồm `status: success/fail` và `error_message`.
    *   Hỗ trợ hiển thị output dạng đặc biệt (ngoài JSON thô, tùy theo cấu hình).
*   **Cấu hình Workflow:**
    *   Cơ chế định nghĩa cấu hình cho mỗi workflow (bao gồm slug, tên, mô tả, giá, URL webhook, định nghĩa input fields, cách hiển thị output).
*   **Môi trường làm việc Docker 100%:**
    *   Toàn bộ quá trình phát triển (development), kiểm thử (testing) và vận hành (production) sẽ được thực hiện trong môi trường Docker để đảm bảo tính nhất quán và tránh các vấn đề "works on my machine".
*   **Triển khai:**
    *   Ứng dụng React được đóng gói bằng Docker.
    *   **Triển khai lên môi trường local/test domain `frontend.ai-automation.cloud` (thường xuyên, tự động nếu có thể).**
    *   **Triển khai lên VPS production domain `masteryflow.cc` (tùy chọn, khi có yêu cầu cụ thể từ người dùng).**

**Không bao gồm (Out-of-Scope - Phiên bản đầu tiên hoặc xem xét sau):**

*   Các tính năng cá nhân hóa phức tạp (ngoài việc gửi user info trong header).
*   Trang quản lý/liệt kê workflow chi tiết với tìm kiếm/lọc nâng cao (phiên bản đầu có thể rất cơ bản hoặc chưa có).
*   Hệ thống thanh toán/đăng ký mua workflow.
*   Phân quyền chi tiết cho người dùng trên từng workflow.
*   Dashboard phân tích, báo cáo.
*   Chỉnh sửa/tạo cấu hình workflow trực tiếp từ UI (cấu hình ban đầu sẽ được thực hiện thủ công hoặc qua một quy trình riêng).

## 4. Đối tượng Người dùng (User Personas / Target Audience)

*   **Người dùng chính (Primary):**
    *   **"Tôi" (Chủ sở hữu/Quản trị viên):** Người xây dựng và quản lý các n8n workflow, muốn có một cách trực quan để sử dụng, giới thiệu và có thể bán các workflow này. Có kiến thức kỹ thuật.
    *   **Người dùng cuối (End Users):** Các cá nhân hoặc đội nhóm khác (có thể có hoặc không có kỹ năng kỹ thuật) cần sử dụng các n8n workflow một cách dễ dàng thông qua giao diện người dùng được cung cấp, thay vì tương tác trực tiếp với n8n.
*   **Nhu cầu chung:**
    *   Giao diện đơn giản, dễ hiểu để nhập liệu.
    *   Hướng dẫn rõ ràng (nếu có) trên UI.
    *   Phản hồi nhanh chóng và dễ hiểu về kết quả của workflow.
    *   Truy cập dễ dàng đến các workflow họ cần.

## 5. Yêu cầu Chức năng (Functional Requirements)

**FR1: Xác thực người dùng**
    *   FR1.1: Người dùng có thể đăng ký tài khoản mới sử dụng địa chỉ Gmail.
    *   FR1.2: Người dùng có thể đăng nhập vào hệ thống bằng tài khoản Gmail đã đăng ký.
    *   FR1.3 (Tùy chọn, P1): Hỗ trợ đăng nhập/đăng ký bằng Facebook.
    *   FR1.4: Logic xác thực được xử lý bởi một workflow n8n chuyên biệt.
    *   FR1.5: Thông tin người dùng cơ bản được lưu trữ trong PostgreSQL (thông qua workflow n8n).

**FR2: Tương tác với Workflow UI (`/:workflowSlug/demo`)**
    *   FR3.1: Hệ thống render động một form nhập liệu dựa trên cấu hình được định nghĩa cho `workflowSlug` tương ứng.
    *   FR3.2: Form hỗ trợ các loại trường input sau:
        *   FR3.2.1: Text (single line, multi-line).
        *   FR3.2.2: Number.
        *   FR3.2.3: Date/Time.
        *   FR3.2.4: Select (chọn một từ danh sách cố định).
        *   FR3.2.5: Multi-select (chọn nhiều từ danh sách cố định).
        *   FR3.2.6: File upload.
        *   FR3.2.7: Dynamic select (chọn một từ danh sách được tải động, ví dụ từ một API).
        *   FR3.2.8 (Đề xuất): Checkbox, Radio button.
    *   FR3.3: Người dùng có thể nhập dữ liệu vào form.
    *   FR3.4: Khi người dùng gửi form, ứng dụng sẽ:
        *   FR3.4.1: Thu thập dữ liệu từ form.
        *   FR3.4.2: Nếu người dùng đã đăng nhập, đính kèm thông tin định danh người dùng vào header của request.
        *   FR3.4.3: Gửi một HTTP POST request đến URL webhook của n8n workflow tương ứng (được định nghĩa trong cấu hình workflow).
    *   FR3.5: Hệ thống hiển thị phản hồi từ n8n workflow:
        *   FR3.5.1: Hiển thị chỉ báo đang tải (loading indicator) trong khi chờ phản hồi.
        *   FR3.5.2: Nếu n8n trả về `status: "success"`, hiển thị thông báo thành công và dữ liệu output.
        *   FR3.5.3: Nếu n8n trả về `status: "fail"`, hiển thị thông báo lỗi và nội dung `error_message`.
        *   FR3.5.4: Output có thể được hiển thị dưới dạng đặc biệt (ví dụ: bảng, danh sách, text đã định dạng) dựa trên cấu hình workflow, không chỉ là JSON thô.

**FR3: Cấu hình Workflow (Backend/Admin Process)**
    *   FR4.1: Cần có một cơ chế (ban đầu có thể là file JSON/JS thủ công) để định nghĩa cấu hình cho mỗi workflow UI, bao gồm:
        *   `workflowSlug` (duy nhất, dùng cho URL).
        *   Tên hiển thị.
        *   Mô tả chi tiết (cho trang thông tin).
        *   Thông tin giá cả.
        *   URL webhook n8n đầy đủ.
        *   Định nghĩa các trường input cho form (tên, label, loại input, tùy chọn, validation cơ bản).
        *   Định nghĩa cách hiển thị output (nếu cần định dạng đặc biệt).

## 6. Yêu cầu Phi Chức năng (Non-Functional Requirements)

*   **NFR1: Thiết kế Giao diện:**
    *   NFR1.1: Giao diện phải được thiết kế theo hướng "Mobile-First".
    *   NFR1.2: Giao diện phải responsive, hiển thị tốt trên các kích thước màn hình phổ biến (desktop, tablet, mobile).
    *   NFR1.3: Giao diện trực quan, dễ sử dụng, hiện đại.
*   **NFR2: Hiệu năng:**
    *   NFR2.1: Thời gian tải trang UI tương tác (`/demo`) ban đầu phải nhanh.
    *   NFR2.2: Phản hồi từ việc submit form phải có độ trễ chấp nhận được (phụ thuộc vào thời gian xử lý của n8n workflow).
*   **NFR3: Bảo mật:**
    *   NFR3.1: Quá trình xác thực người dùng phải an toàn.
    *   NFR3.2: Thông tin nhạy cảm (nếu có) không được lưu trữ ở phía client.
    *   NFR3.3: Sử dụng HTTPS cho tất cả các kết nối.
*   **NFR4: Khả năng Mở rộng (Scalability):**
    *   NFR4.1: Kiến trúc ứng dụng React phải cho phép dễ dàng thêm các UI cho workflow mới (hàng trăm workflows).
    *   NFR4.2: Logic render động phải hiệu quả.
*   **NFR5: Khả năng Bảo trì (Maintainability):**
    *   NFR5.1: Mã nguồn phải được tổ chức rõ ràng, dễ hiểu.
    *   NFR5.2: Sử dụng các thư viện và công nghệ phổ biến, được hỗ trợ tốt (React, Vite, TailwindCSS).
*   **NFR6: Môi trường Phát triển và Triển khai (Development and Deployment Environment):**
    *   NFR6.1: **Toàn bộ quy trình làm việc (phát triển, kiểm thử, sản xuất) phải dựa trên Docker 100%.** Điều này bao gồm việc chạy Vite dev server trong Docker, build ứng dụng trong Docker, và serve ứng dụng production từ Docker container.
    *   NFR6.2: Đảm bảo tính nhất quán tối đa giữa môi trường phát triển local và môi trường sản xuất nhờ Docker.

## 7. Luồng Người dùng Chính (User Journeys)

*   **Journey 1: Người dùng mới khám phá và sử dụng Workflow UI (không đăng nhập)**
    1.  Người dùng truy cập `frontend.ai-automation.cloud/` (môi trường test/local) hoặc `masteryflow.cc/` (môi trường production, nếu đã triển khai).
    2.  (Nếu có) Xem danh sách các workflow.
    3.  Chọn một workflow, điều hướng đến trang thông tin `/[workflow-slug]/`.
    4.  Đọc thông tin, xem giá cả.
    5.  Nhấn vào link/button để đến trang UI tương tác `/[workflow-slug]/demo/`.
    6.  Nhập dữ liệu vào form.
    7.  Nhấn nút "Submit".
    8.  Xem kết quả (thành công hoặc lỗi) được hiển thị.

*   **Journey 2: Người dùng đăng ký và sử dụng Workflow UI**
    1.  Người dùng truy cập trang (ví dụ: `frontend.ai-automation.cloud/` hoặc `masteryflow.cc/`).
    2.  Chọn "Sign Up", hoàn tất quá trình đăng ký bằng Gmail.
    3.  (Đăng nhập tự động sau khi đăng ký thành công).
    4.  Thực hiện các bước tương tự Journey 1 (từ bước 2 đến 8).
    5.  Khi submit form, thông tin người dùng được gửi kèm trong header request đến n8n.

*   **Journey 3: Người dùng đã có tài khoản đăng nhập và sử dụng Workflow UI**
    1.  Người dùng truy cập trang (ví dụ: `frontend.ai-automation.cloud/` hoặc `masteryflow.cc/`).
    2.  Chọn "Sign In", đăng nhập bằng Gmail.
    3.  Thực hiện các bước tương tự Journey 1 (từ bước 2 đến 8).
    4.  Khi submit form, thông tin người dùng được gửi kèm trong header request đến n8n.

*   **Giả định:**
    *   Người dùng có sẵn một hệ thống n8n backend và PostgreSQL trên Docker, sẵn sàng để tích hợp.
    *   Các workflow n8n (bao gồm cả workflow xử lý xác thực) đã được xây dựng hoặc sẽ được xây dựng song song ở phía backend.
    *   `frontend.ai-automation.cloud` là domain chính cho mục đích phát triển, kiểm thử và demo nội bộ. Việc triển khai lên đây diễn ra thường xuyên.
    *   `masteryflow.cc` là domain cho môi trường production trên VPS, việc triển khai lên đây là một bước riêng biệt, có kiểm soát và chỉ thực hiện khi được yêu cầu.
    *   Người dùng sẽ tự cấu hình Nginx trên server production (cho cả hai domain nếu cần, hoặc chỉ cho `masteryflow.cc` nếu `frontend.ai-automation.cloud` được quản lý khác) dựa trên các đề xuất.
    *   Việc tạo và cập nhật các file cấu hình cho workflow UI ban đầu sẽ được thực hiện thủ công (ví dụ: bởi developer).
    *   Toàn bộ quá trình phát triển và triển khai sẽ ưu tiên sử dụng Docker để đảm bảo tính nhất quán.

## Phụ lục A: Template Câu hỏi "Init Workflow UI" (Đề xuất)

Khi người dùng muốn tạo UI cho một n8n workflow mới, cần thu thập các thông tin sau:

1.  **Thông tin chung:**
    *   **Workflow Slug (Định danh URL):** Tên ngắn gọn, không dấu, không khoảng trắng, dùng cho URL (ví dụ: `get-facebook-ads`). Đây có phải là slug bạn muốn không?
    *   **Tên đầy đủ của Workflow:** Tên sẽ hiển thị cho người dùng (ví dụ: "Lấy dữ liệu Quảng cáo Facebook").
    *   **Mô tả chi tiết:** Giải thích mục đích, cách hoạt động, lợi ích của workflow này.
    *   **Thông tin giá cả/Điều kiện sử dụng:** (Văn bản tự do hoặc cấu trúc cụ thể nếu cần).
    *   **URL Webhook n8n:** Đường dẫn API POST đầy đủ của workflow n8n tương ứng.
2.  **Định nghĩa Inputs (Form):** Cho mỗi trường input, cung cấp:
    *   **Tên trường (Field Name):** Định danh kỹ thuật cho trường (ví dụ: `campaign_id`).
    *   **Label hiển thị:** Nhãn người dùng thấy trên form (ví dụ: "ID Chiến dịch").
    *   **Loại Input:** (Chọn từ: Text, TextArea, Number, Date, Select, MultiSelect, FileUpload, DynamicSelect).
    *   **Bắt buộc (Required?):** (Có/Không).
    *   **Giá trị mặc định (Default Value - nếu có):**
    *   **Placeholder (nếu có):**
    *   **Tùy chọn cho Select/MultiSelect/DynamicSelect:**
        *   Nếu là Select/MultiSelect: Cung cấp danh sách các cặp `value:label`.
        *   Nếu là DynamicSelect: Mô tả nguồn dữ liệu hoặc API endpoint để lấy danh sách.
    *   **Ghi chú/Hướng dẫn thêm cho trường (nếu có):**
3.  **Định nghĩa Output:**
    *   **Cấu trúc JSON Output mẫu (Thành công):** Bao gồm trường `status: "success"` và các trường dữ liệu kết quả.
    *   **Cấu trúc JSON Output mẫu (Thất bại):** Bao gồm trường `status: "fail"` và `error_message`.
    *   **Yêu cầu hiển thị Output đặc biệt:** Nếu output không chỉ là text/JSON thô, mô tả cách bạn muốn nó được hiển thị (ví dụ: hiển thị dưới dạng bảng với các cột X, Y, Z; hiển thị biểu đồ; một danh sách các mục được định dạng, v.v.).
4.  **Thông tin khác (Nếu có):**
    *   Có biểu tượng (icon) hay hình ảnh đại diện nào cho workflow này không?
    *   Bất kỳ lưu ý đặc biệt nào khác cho việc xây dựng UI?
