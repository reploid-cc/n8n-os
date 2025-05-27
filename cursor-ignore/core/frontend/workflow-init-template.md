# Template Khởi Tạo Workflow UI

## Thông tin chung

**Workflow Slug**: 
- Tên ngắn gọn, không dấu, không khoảng trắng, dùng cho URL
- Ví dụ: `get-facebook-ads`

**Tên đầy đủ của Workflow**:
- Tên sẽ hiển thị cho người dùng
- Ví dụ: "Lấy dữ liệu Quảng cáo Facebook"

**Mô tả chi tiết**:
- Giải thích mục đích, cách hoạt động, lợi ích của workflow
- Ví dụ: "Workflow này giúp bạn lấy dữ liệu quảng cáo Facebook của tài khoản quảng cáo của bạn, bao gồm chi phí, hiệu suất, và các metrics quan trọng khác."

**Thông tin giá cả/Điều kiện sử dụng**:
- Ví dụ: "Free tier: 10 lần chạy/ngày, Pro tier: 100 lần chạy/ngày, Premium tier: 500 lần chạy/ngày"

**URL Webhook n8n**:
- Đường dẫn API POST đầy đủ của workflow n8n tương ứng
- Ví dụ: "https://n8n.example.com/webhook/facebook-ads-data"

## Định nghĩa Inputs (Form)

### Input Field 1
- **Tên trường (Field Name)**: `campaign_id`
- **Label hiển thị**: "ID Chiến dịch"
- **Loại Input**: Text
- **Bắt buộc (Required?)**: Có
- **Giá trị mặc định**: 
- **Placeholder**: "Nhập ID chiến dịch Facebook của bạn"
- **Validation**: "^[0-9]+$" (chỉ cho phép số)
- **Ghi chú/Hướng dẫn**: "ID chiến dịch là một chuỗi số, bạn có thể tìm thấy trong URL của chiến dịch quảng cáo"

### Input Field 2
- **Tên trường (Field Name)**: `date_range`
- **Label hiển thị**: "Khoảng thời gian"
- **Loại Input**: Select
- **Bắt buộc (Required?)**: Có
- **Tùy chọn**:
  - `last_7_days`: "7 ngày qua"
  - `last_30_days`: "30 ngày qua"
  - `last_90_days`: "90 ngày qua"
  - `custom`: "Tùy chỉnh"
- **Giá trị mặc định**: `last_7_days`
- **Ghi chú/Hướng dẫn**: "Chọn khoảng thời gian bạn muốn xem dữ liệu"

### Input Field 3 (Hiển thị có điều kiện)
- **Tên trường (Field Name)**: `start_date`
- **Label hiển thị**: "Ngày bắt đầu"
- **Loại Input**: Date
- **Bắt buộc (Required?)**: Có (nếu `date_range` = `custom`)
- **Điều kiện hiển thị**: Chỉ hiển thị khi `date_range` = `custom`
- **Giá trị mặc định**: [Ngày hiện tại - 30 ngày]
- **Ghi chú/Hướng dẫn**: "Chọn ngày bắt đầu khoảng thời gian"

### Input Field 4 (Hiển thị có điều kiện)
- **Tên trường (Field Name)**: `end_date`
- **Label hiển thị**: "Ngày kết thúc"
- **Loại Input**: Date
- **Bắt buộc (Required?)**: Có (nếu `date_range` = `custom`)
- **Điều kiện hiển thị**: Chỉ hiển thị khi `date_range` = `custom`
- **Giá trị mặc định**: [Ngày hiện tại]
- **Validation**: Phải sau `start_date`
- **Ghi chú/Hướng dẫn**: "Chọn ngày kết thúc khoảng thời gian"

### Input Field 5
- **Tên trường (Field Name)**: `metrics`
- **Label hiển thị**: "Các chỉ số"
- **Loại Input**: MultiSelect
- **Bắt buộc (Required?)**: Có
- **Tùy chọn**:
  - `impressions`: "Số lần hiển thị"
  - `clicks`: "Số lần nhấp chuột"
  - `ctr`: "Tỷ lệ nhấp chuột (CTR)"
  - `spend`: "Chi phí"
  - `conversions`: "Số lượt chuyển đổi"
  - `cpa`: "Chi phí mỗi lượt chuyển đổi (CPA)"
- **Giá trị mặc định**: `["impressions", "clicks", "spend"]`
- **Ghi chú/Hướng dẫn**: "Chọn các chỉ số bạn muốn xem trong báo cáo"

### Input Field 6
- **Tên trường (Field Name)**: `file_format`
- **Label hiển thị**: "Định dạng file xuất"
- **Loại Input**: Radio
- **Bắt buộc (Required?)**: Có
- **Tùy chọn**:
  - `csv`: "CSV"
  - `xlsx`: "Excel (XLSX)"
  - `json`: "JSON"
- **Giá trị mặc định**: `csv`
- **Ghi chú/Hướng dẫn**: "Chọn định dạng file bạn muốn tải xuống"

### Input Field 7
- **Tên trường (Field Name)**: `access_token`
- **Label hiển thị**: "Access Token"
- **Loại Input**: Password
- **Bắt buộc (Required?)**: Có
- **Placeholder**: "Nhập Facebook API Access Token của bạn"
- **Ghi chú/Hướng dẫn**: "Bạn có thể lấy Access Token từ Facebook Developer Portal"

## Định nghĩa Output

### Cấu trúc JSON Output mẫu (Thành công)
```json
{
  "status": "success",
  "data": {
    "campaign_info": {
      "id": "123456789",
      "name": "Summer Sale 2023",
      "status": "ACTIVE"
    },
    "date_range": {
      "start": "2023-06-01",
      "end": "2023-06-07"
    },
    "metrics": {
      "impressions": 12500,
      "clicks": 350,
      "ctr": 2.8,
      "spend": 125.50,
      "conversions": 15,
      "cpa": 8.37
    },
    "download_url": "https://example.com/files/report_123.csv"
  }
}
```

### Cấu trúc JSON Output mẫu (Thất bại)
```json
{
  "status": "fail",
  "error_message": "Invalid Access Token. Please check your credentials and try again.",
  "error_code": "AUTH_ERROR"
}
```

### Yêu cầu hiển thị Output đặc biệt
- **Thành công**: Hiển thị dưới dạng bảng với các cột tương ứng với các metrics được chọn
- **Tải xuống**: Hiển thị nút tải xuống file nếu có `download_url`
- **Thất bại**: Hiển thị thông báo lỗi dễ hiểu với hướng dẫn khắc phục

## Thông tin khác
- **Icon/Hình ảnh đại diện**: Facebook logo hoặc biểu tượng biểu đồ
- **Tag**: #facebook #marketing #analytics
- **Yêu cầu đặc biệt**: N/A 