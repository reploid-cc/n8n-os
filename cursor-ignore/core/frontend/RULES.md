# RULES.md: Frontend UI Builder cho n8n Workflows

## Giới thiệu

Tài liệu này định nghĩa các quy tắc và hướng dẫn kỹ thuật cho việc phát triển dự án "Frontend UI Builder cho n8n Workflows". Mục tiêu là đảm bảo tính nhất quán, chất lượng cao và sự tuân thủ các yêu cầu đã được đặt ra trong Product Requirements Document (PRD) và Features List. Tất cả các thành viên trong nhóm, bao gồm cả AI hỗ trợ, cần tuân thủ các quy tắc này.

## Tổng quan Dự án

Dự án nhằm xây dựng một ứng dụng React SPA (Single Page Application) đóng vai trò là một "Host" để render động các giao diện người dùng (UI) cho các n8n workflow khác nhau. Người dùng cuối có thể tương tác với các UI này để nhập liệu, kích hoạt workflow và xem kết quả. Ứng dụng hỗ trợ xác thực người dùng (Gmail ưu tiên), gửi thông tin người dùng trong header, hiển thị thông tin chi tiết và giá cả của workflow (lấy động), và được thiết kế theo hướng mobile-first. Toàn bộ quá trình phát triển và triển khai sẽ dựa trên Docker.

## Workflow Process Flow

```
┌────────────────┐     ┌─────────────────┐     ┌────────────────────┐
│                │     │                 │     │                    │
│  Frontend UI   │────▶│  n8n Backend   │────▶│  Frontend UI        │
│  (Input Form)  │     │  (Processing)   │     │  (Output Display)  │
│                │     │                 │     │                    │
└────────────────┘     └─────────────────┘     └────────────────────┘
        │                      │                        │
        │                      │                        │
        ▼                      ▼                        ▼
┌────────────────┐     ┌─────────────────┐     ┌────────────────────┐
│                │     │                 │     │                    │
│  Submit Form   │────▶│ Webhook POST   │     │  Process Response  │
│  (User Action) │     │ (HTTP Request) │     │  (JSON Parsing)    │
│                │     │                 │     │                    │
└────────────────┘     └─────────────────┘     └────────────────────┘
```

## 1. Định nghĩa Ngăn xếp Công nghệ (Technology Stack)

*   **Core Frontend:**
    *   **React:** 
    *   **Vite:** 
    *   **TypeScript:** 
    *   **React Router:** 
*   **Styling:**
    *   **TailwindCSS:**
*   **State Management:**
    *   Ưu tiên sử dụng Context API của React cho state đơn giản và global.
    *   Xem xét Zustand hoặc Redux Toolkit cho state phức tạp hơn nếu cần thiết (sẽ quyết định khi có nhu cầu cụ thể).
*   **API Interaction:**
    *   **Fetch API (native):** Sử dụng cho các lời gọi API cơ bản.
    *   Xem xét `axios` nếu cần các tính năng nâng cao hơn (interceptors, cancel requests).
*   **Linting & Formatting:**
    *   **ESLint:** Với các plugin cho React, TypeScript, Accessibility (ví dụ: `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `@typescript-eslint/eslint-plugin`).
    *   **Prettier:** Để tự động format code.
    *   Cấu hình để chạy tự động khi commit (Husky + lint-staged).
*   **Testing:**
    *   **Vitest:** Cho unit tests và integration tests.
    *   **React Testing Library:** Cho component tests.
*   **Development & Deployment:**
    *   **Docker:** Latest stable version.
    *   **Docker Compose:** Latest stable version.
    *   **Node.js:** Version 20.x LTS (cho môi trường build và chạy các script).
*   **Version Control:**
    *   **Git:** Sử dụng GitFlow hoặc GitHub Flow cho branching model (sẽ thống nhất).

## 2. Ưu tiên Kỹ thuật (Technical Preferences)

*   **Naming Conventions:**
    *   **Files:**
        *   Components: `PascalCase.tsx` (ví dụ: `MyComponent.tsx`).
        *   Hooks: `useCamelCase.ts` (ví dụ: `useUserData.ts`).
        *   Services/Utils: `camelCase.ts` (ví dụ: `apiClient.ts`).
        *   Config files: `[name].config.ts` (ví dụ: `auth.config.ts`, `workflows/[slug].config.ts`).
    *   **Components:** `PascalCase` (ví dụ: `<WorkflowForm />`).
    *   **Variables & Functions:** `camelCase` (ví dụ: `const workflowData = ...; const handleSubmit = () => ...;`).
    *   **Constants:** `UPPER_SNAKE_CASE` (ví dụ: `const API_BASE_URL = '.'.'.';`).
    *   **CSS Classes (Tailwind):** Sử dụng class của Tailwind.
    *   **Event Handlers:** `handleEventName` (ví dụ: `handleClick`, `handleInputChange`).
*   **Code Organization:**
    *   **Folder Structure (Đề xuất ban đầu, có thể điều chỉnh):**
    *   **Modularity:** Chia nhỏ components và logic thành các module nhỏ, dễ quản lý và tái sử dụng.
    *   **DRY (Don't Repeat Yourself):** Tránh lặp code, sử dụng hàm và component tái sử dụng.
*   **Architectural Patterns:**
    *   **Component-Based Architecture:** Theo chuẩn React.
    *   **Container/Presentational Pattern (nếu cần):** Tách biệt logic và UI.
*   **Data Handling & State Management:**
    *   Dữ liệu workflow (forms, output) nên được quản lý cục bộ trong component hoặc qua Context nếu cần chia sẻ.
    *   Thông tin người dùng (sau khi đăng nhập) có thể lưu trong Context.
    *   Session token được lưu an toàn (`localStorage` là lựa chọn ban đầu).
    *   Sử dụng TypeScript interfaces/types cho tất cả cấu trúc dữ liệu.
*   **API Interactions:**
    *   Tất cả các lời gọi API nên được tập trung trong thư mục `services/` hoặc `features/[featureName]/services/`.
    *   Xử lý lỗi API một cách nhất quán (hiển thị thông báo cho người dùng, log lỗi).
    *   Sử dụng `async/await` cho code bất đồng bộ.
    *   Header `Authorization: Bearer <sessionToken>` và `X-User-Email: <user_email>` phải được gửi theo đúng yêu cầu.
*   **Performance Requirements:**
    *   Tối ưu hóa thời gian tải ban đầu (lazy loading cho routes/components nếu cần).
    *   Sử dụng `React.memo`, `useMemo`, `useCallback` khi cần thiết để tránh re-render không cần thiết.
    *   Tối ưu hóa kích thước bundle (code splitting).
*   **Security Practices:**
    *   Không lưu trữ thông tin nhạy cảm ở client-side trừ session token.
    *   Sử dụng HTTPS cho tất cả các kết nối (Nginx sẽ xử lý SSL).
    *   Validation input ở cả client-side (cơ bản) và server-side (n8n workflow là nguồn tin cậy).
    *   Thận trọng với XSS: sanitize user-generated content nếu hiển thị trực tiếp HTML (mặc định React đã có bảo vệ).
    *   Quản lý dependencies và cập nhật thường xuyên để vá lỗi bảo mật.

## 3. Tiêu chuẩn Phát triển (Development Standards)

*   **Testing:**
    *   **Unit Tests (Vitest):**
        *   Tập trung vào các hàm tiện ích, logic phức tạp trong hooks và services.
        *   Coverage mục tiêu: >70% cho logic cốt lõi.
    *   **Component Tests (React Testing Library + Vitest):**
        *   Kiểm tra các UI components quan trọng, tương tác người dùng và việc render dựa trên props/state.
        *   Đặc biệt quan trọng cho cơ chế render form động và hiển thị output.
    *   **E2E Tests (Cypress/Playwright - P2):**
        *   Tập trung vào các luồng người dùng chính: đăng nhập, xem thông tin workflow, submit form, xem kết quả.
        *   Chạy trên môi trường staging trước khi triển khai production.
    *   Tests phải được viết song song với việc phát triển tính năng.
*   **Documentation:**
    *   **Code Comments:** Bình luận các đoạn code phức tạp, các quyết định thiết kế không rõ ràng. Không bình luận code hiển nhiên.
    *   **Component Props:** Sử dụng TypeScript interfaces để định nghĩa rõ ràng props cho components.
    *   **README.md:**
        *   `README.md` ở thư mục gốc: Hướng dẫn cài đặt, chạy dự án, cấu trúc thư mục, quy trình làm việc.
        *   `README.md` trong các thư mục `features/` hoặc `components/` phức tạp: Giải thích mục đích và cách sử dụng.
    *   **Memory Bank:** Cập nhật `memory_bank/` thường xuyên theo quy định.
*   **Error Handling & Logging:**
    *   **Error Handling:**
        *   Sử dụng `try...catch` cho các tác vụ bất đồng bộ và các đoạn code có khả năng gây lỗi.
        *   Hiển thị thông báo lỗi thân thiện cho người dùng. Không hiển thị lỗi kỹ thuật chi tiết cho người dùng cuối.
        *   Sử dụng Error Boundaries của React để bắt lỗi trong cây component.
    *   **Logging:**
        *   Log lỗi chi tiết ở console phía client trong môi trường dev.
        *   Xem xét tích hợp một dịch vụ logging từ xa (Sentry, LogRocket) cho môi trường production (Tương lai).
*   **Accessibility (a11y):**
    *   Tuân thủ các tiêu chuẩn WCAG 2.1 AA ở mức tối thiểu.
    *   Sử dụng HTML ngữ nghĩa.
    *   Đảm bảo tất cả các yếu tố tương tác có thể truy cập bằng bàn phím.
    *   Cung cấp `alt text` cho hình ảnh, `aria-label` cho các nút/icon không có text.
    *   Kiểm tra bằng các công cụ như Lighthouse, Axe.
*   **Responsive Design:**
    *   Thiết kế mobile-first, sau đó mở rộng cho tablet và desktop.
    *   Sử dụng breakpoints của TailwindCSS.
    *   Kiểm thử trên nhiều kích thước màn hình và thiết bị thực (nếu có thể).
