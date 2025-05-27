# 📚 Storybook Component Library Guidelines

---

## 1. Design Principles (Nguyên tắc Thiết kế)

- **Mobile First:** Ưu tiên thiết kế cho mobile trước, mở rộng lên desktop.
- **Responsive:** Tự động thích ứng đa kích thước màn hình (320px–1920px+).
- **Performance First:** Component load nhanh, bundle nhỏ, lazy-load khi cần. Ưu tiên code splitting, tránh load thừa.
- **Progressive Enhancement:** Giao diện usable ngay cả khi JS chưa load hoặc bị disable; base là HTML/CSS chuẩn.
- **Consistency:** Màu sắc, font, spacing, corner radius đồng bộ; sử dụng design token.
- **Accessibility (a11y):** Chuẩn WCAG 2.1 AA, keyboard navigation, screen reader, contrast tốt.
- **Dark/Light Mode:** Hỗ trợ theme switching, kiểm thử kỹ cả 2 chế độ.
- **Touch-friendly:** Vùng chạm tối thiểu 44px trên mobile.
- **Visual Feedback:** Mọi action có trạng thái rõ ràng (hover, loading, error...).
- **Micro-interactions:** Animation nhỏ mượt mà, tăng trải nghiệm người dùng.
- **Reusability:** Theo atomic pattern, component nhỏ dễ ghép, không lặp lại logic.

---

## 2. Technical Stack & Tooling

- **Build Tool:** Vite (cho app/library) hoặc Next.js (SSR/SPA, tree-shaking tốt).
- **CSS Framework:** Tailwind CSS + custom token, hoặc CSS-in-JS như Stitches, Vanilla Extract (nếu cần theming động/phức tạp).
- **Animation:** Framer Motion (complex), CSS transition (basic).
- **Icon:** Lucide React, Heroicons (SVG inline).
- **Typography:** Variable font (Inter, SF Pro…).
- **Color System:** HSL, semantic token, CSS variable, hỗ trợ dark/light.
- **State Management:** Context/Zustand cho UI, tránh Redux nếu không thật sự cần.
- **Bundle Analysis:** Sử dụng Bundle Analyzer để kiểm soát dung lượng.
- **Testing:** Jest, Testing Library, visual regression (Chromatic/Percy), a11y (axe-core).
- **Storybook:** Chuẩn hóa story, doc, demo interaction, a11y checklist.
- **Documentation:** MDX story, usage example, accessibility note.
- **Browser Support:** Matrix rõ ràng (Edge/Chrome/Firefox/Safari >=2 bản mới nhất).

---

## 3. Component Architecture & Pattern

- **Function Component** + **TypeScript** (luôn có type kiểm soát props/state).
- **Compound Components Pattern:** Cho UI phức tạp (Menu, Accordion, Tabs…).
- **Render Props/Children Function:** Đảm bảo custom rendering linh hoạt.
- **Forwarded Refs:** Đảm bảo ref được pass qua cho input, modal, v.v.
- **Strictly Uncontrolled vs Controlled:** API rõ ràng, không lẫn lộn.

---

## 4. Storybook Demo Structure – Standardized Stories

- **Default Story:** Demo trạng thái mặc định đơn giản nhất.
- **All Variants Story:** Show tất cả variant, size, màu, state… trong 1 story.
- **Interactive Story:** Cho phép thay đổi prop real-time (Storybook Controls).
- **Documentation Story:** Dùng MDX, gồm usage, props table, best practice.
- **Accessibility Story:** Thể hiện keyboard navigation, screen reader.
- **Performance Story:** Nếu cần, kiểm thử lazy loading, loading state.

---

## 5. Quality Gates & Checklist

- **Lighthouse Score:** Tối thiểu 90+ cho Performance và Accessibility trên từng component page.
- **Bundle Size Limit:** Mỗi component không vượt quá _X_ KB (tuỳ quy định, vd: <10KB).
- **Browser Support Matrix:** Nêu rõ trình duyệt hỗ trợ và loại trừ.
- **RTL Support:** Bắt buộc cho UI dùng đa ngôn ngữ, test với `dir="rtl"`.
- **Visual Regression:** Có Chromatic/Percy kiểm tra khi có PR.
- **Test Coverage:** Unit test >=80%, kiểm thử prop và interaction chính.
- **Docs Coverage:** Mỗi component đều có usage & a11y doc.
- **Manual QA:** Checklist từng tính năng (mobile, desktop, a11y, trạng thái UI, loading...).

---

## 6. Onboarding Note

> **Mục tiêu cuối cùng:**  
> Xây dựng component library chuẩn quốc tế – _nhẹ, nhanh, an toàn, dễ tái sử dụng, dễ mở rộng, dễ maintain, kiểm thử tốt, sẵn sàng dùng cho nhiều dự án frontend hiện đại._

---

## 7. Docker & Build Optimization

- **Multi-stage builds:** Sử dụng cho production environment để tối ưu image size
- **Volume mapping hợp lý:** Đảm bảo performance trong development
- **CSS Auto-compilation:** Sử dụng Next.js/PostCSS/Tailwind tự động thay vì manual scripts
- **PostCSS Config:** Cấu hình đúng đắn với Tailwind và các plugins cần thiết
- **Hot Module Replacement:** Cấu hình đúng để tăng tốc development
- **Bundle Optimization:** Sử dụng tree-shaking, code splitting, và dynamic imports
- **Debug Panel:** Loại bỏ debug panels và console logs không cần thiết trong production
- **CSS Purging:** Đảm bảo chỉ CSS cần thiết được đưa vào bundle

---

## 8. Development Roadmap & Best Practices

- **Component Priority:** Phát triển theo thứ tự: Atoms → Molecules → Organisms → Templates
- **Code Reuse:** Sử dụng class-variance-authority và clsx/tailwind-merge cho variants
- **Type Safety:** Đảm bảo đầy đủ TypeScript type cho mọi props
- **Props Consistency:** Sử dụng naming convention nhất quán (size, variant, disabled)
- **Interactive States:** Đảm bảo đủ states (hover, focus, active, disabled)
- **Animation Consistency:** Sử dụng các keyframes và transition timing thống nhất
- **Responsive Testing:** Kiểm tra trên nhiều breakpoints (mobile, tablet, desktop)
- **Component Groups:** Phát triển theo nhóm liên quan (Input, Radio, Checkbox, Switch)

---
