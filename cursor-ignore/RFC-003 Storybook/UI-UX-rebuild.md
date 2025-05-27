- [ ] **2.1 Phát triển Atoms**
  - [x] Button (variants, sizes, states, icons)
  - [ ] Input
  - [ ] Checkbox
  - [ ] Radio
  - [ ] Switch
  - [ ] Select
  - [ ] Textarea
  - [ ] Icon
  - [ ] Badge
  - [ ] Avatar
  - [ ] Spinner
  - [ ] Tooltip
  - [ ] Divider
  - [ ] Tag/Chip
  - [ ] Progress Bar
  - [ ] Skeleton Loader
  - [ ] Rating
  - [ ] Link
  - [ ] Image
  - [ ] Code
  - [ ] Kbd
  - [ ] Label
  - [ ] Separator/Spacer
  - [ ] Portal
  - [ ] Visually Hidden

- [ ] **2.2 Phát triển Molecules**
  - [ ] FormField (Label + Input + Error)
  - [ ] Dropdown
  - [ ] Pagination
  - [ ] Tabs
  - [ ] Card
  - [ ] Alert
  - [ ] Breadcrumb
  - [ ] Accordion
  - [ ] Menu
  - [ ] SearchInput
  - [ ] DatePicker/TimePicker
  - [ ] ListItem
  - [ ] InputGroup
  - [ ] Segmented Control
  - [ ] Color Picker
  - [ ] Stat Widget
  - [ ] Toast/Snackbar
  - [ ] Command Palette
  - [ ] Toggle Group
  - [ ] Number Input
  - [ ] Password Input
  - [ ] OTP Input
  - [ ] Popover
  - [ ] File Drop Zone
  - [ ] Slider/Range
  - [ ] Rating Input

- [ ] **2.3 Phát triển Organisms**
  - [ ] Modal
  - [ ] Drawer
  - [ ] DataTable
  - [ ] Form
  - [ ] FileUpload
  - [ ] Navbar
  - [ ] Sidebar
  - [ ] Footer
  - [ ] Stepper
  - [ ] Notification Center
  - [ ] Profile Menu
  - [ ] Wizard
  - [ ] Calendar
  - [ ] Chat Widget
  - [ ] Map
  - [ ] Header/Hero Section
  - [ ] Data Grid
  - [ ] Timeline
  - [ ] Kanban Board
  - [ ] Tree View
  - [ ] Carousel/Slider
  - [ ] Comparison Table

- [ ] **2.4 Phát triển Templates**
  - [ ] AuthLayout
  - [ ] DashboardLayout
  - [ ] PageLayout
  - [ ] SettingsLayout
  - [ ] ErrorLayout/Empty
  - [ ] LandingLayout
  - [ ] BlogLayout
  - [ ] CheckoutLayout
  - [ ] ProfileLayout
  - [ ] BlogPostTemplate
  - [ ] CheckoutSuccessTemplate
  - [ ] UserOnboardingTemplate
  - [ ] InvoiceTemplate

- [ ] **2.5 Phát triển Animations/Motion Layer**
  - [ ] Fade
  - [ ] Slide
  - [ ] Scale
  - [ ] Collapse
  - [ ] Expand
  - [ ] Skeleton shimmer
  - [ ] Transition Preset
  - [ ] Motion Hooks
  - [ ] Motion Demo Story
  - [ ] Drag & Drop Motion
  - [ ] Parallax/Scroll
  - [ ] Gesture / Touch Motion
  - [ ] Focus / Outline Animation

- [ ] **2.6 Docs/Demo Content/Story Fixtures**
  - [ ] Docs Component/Page
  - [ ] Demo Data/Fixtures
  - [ ] Story Examples
  - [ ] Performance Demo
  - [ ] Accessibility (a11y) Demo

## Tổng quan tiến độ

### Tiến độ đến hiện tại
- **Atoms:** 1/25 (4%)
  - ✅ Button: Hoàn thành với 10 variants, 4 sizes, 10+ animations, và left/right icons

### Roadmap Atoms Tiếp Theo (Ưu tiên)

#### 1. Nhóm ưu tiên cao (3-4 ngày)
- [ ] **Input** - Component tiếp theo cần triển khai
  - Các variants: Text, Email, Number, Password
  - States: Default, Focus, Error, Disabled, ReadOnly
  - Sizes: SM, MD, LG
  - Features: Label, placeholder, icon
  - A11y: Character counter, screen reader support
  - Validation: Error/helper text

- [ ] **Checkbox, Radio, Switch** - Nhóm selection controls
  - Sử dụng cấu trúc tương tự Button đã xây dựng
  - Tạo các biến thể chung (sizes, variants, states)
  - Tích hợp a11y và keyboard navigation
  - Đảm bảo mỗi component đều có đủ props cơ bản: disabled, error, onChange
  - Đảm bảo các component hoạt động trong form

- [ ] **Badge, Tag, Tooltip** - Nhóm hiển thị thông tin
  - Cần animation mượt mà cho Tooltip
  - Badge hỗ trợ dot và content
  - Tag có variants và khả năng xóa (removable)

#### 2. Nhóm ưu tiên vừa (2-3 ngày)
- [ ] **Icon, Spinner, Skeleton** - Nhóm feedback visual
  - Tạo IconProvider để quản lý icon
  - Spinner với nhiều kích thước và variants
  - Skeleton có đa dạng shapes

#### 3. Nhóm ưu tiên thấp (2-3 ngày)
- [ ] **Label, Separator, Portal, VisuallyHidden** - Nhóm layout
  - Đảm bảo a11y cho Label
  - Portal sử dụng React.createPortal
  - Utility components cho layout và accessibility

### Kế hoạch phát triển Input
1. **Cấu trúc cơ bản**
   - Xây dựng component cơ bản sử dụng class-variance-authority
   - Các variants cần thiết: outline, filled, minimal
   - Các sizes: sm, md, lg
   - Hỗ trợ label, placeholder, helper text

2. **Tính năng nâng cao**
   - Icon trái/phải (leftIcon, rightIcon)
   - Password show/hide toggle
   - Character counter
   - Validation state: error, success, warning
   - Animations: focus, hover effects

3. **A11y và UX**
   - Keyboard navigation
   - Label liên kết với input qua id
   - Hỗ trợ screen reader
   - Focus styles rõ ràng
   - Tích hợp ARIA attributes

4. **Test trong Docker**
   - Kiểm tra trong môi trường Docker
   - Kiểm tra tương thích với các browsers
   - Đảm bảo styles được compile đúng

### Phương pháp phát triển
- Sử dụng các patterns tương tự Button component
- Tạo story structure tương tự để đảm bảo tính nhất quán
- Cập nhật globals.css và tailwind.config.js nếu cần
- Test với Docker để đảm bảo tương thích
- Đảm bảo code quality thông qua TypeScript type checking
