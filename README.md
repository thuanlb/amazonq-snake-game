# Trò Chơi Rắn Săn Mồi

Một trò chơi rắn săn mồi đơn giản được phát triển bằng HTML, CSS và JavaScript.

![Rắn Săn Mồi](https://i.imgur.com/JfXDJYu.png)

## Mô tả

Trò chơi rắn săn mồi cổ điển, nơi người chơi điều khiển một con rắn để ăn mồi và phát triển dài hơn. Trò chơi kết thúc khi rắn va chạm vào tường hoặc chính nó.

## Tính năng

- Điều khiển rắn bằng các phím mũi tên
- Tính điểm khi ăn mồi
- Rắn dài ra khi ăn mồi
- Hiệu ứng trực quan đẹp mắt
- Màn hình kết thúc trò chơi
- Nút bắt đầu và chơi lại

## Cài đặt

### Phương pháp 1: Tải xuống trực tiếp

1. Nhấn vào nút "Code" màu xanh lá cây trên trang GitHub này
2. Chọn "Download ZIP"
3. Giải nén file ZIP đã tải xuống
4. Mở file `index.html` trong trình duyệt web

### Phương pháp 2: Sử dụng Git

```bash
# Clone repository
git clone https://github.com/thuanlb/amazonq-snake-game.git

# Di chuyển vào thư mục dự án
cd amazonq-snake-game

# Mở file index.html trong trình duyệt web
# Trên Linux:
xdg-open index.html
# Trên macOS:
open index.html
# Trên Windows:
start index.html
```

## Cách chơi

1. Mở file `index.html` trong trình duyệt web
2. Nhấn nút "Bắt Đầu" để bắt đầu trò chơi
3. Sử dụng các phím mũi tên để điều khiển rắn:
   - ↑: Di chuyển lên
   - ↓: Di chuyển xuống
   - ←: Di chuyển sang trái
   - →: Di chuyển sang phải
4. Cố gắng ăn càng nhiều mồi (điểm đỏ) càng tốt để tăng điểm
5. Tránh va chạm vào tường hoặc thân rắn
6. Khi trò chơi kết thúc, nhấn nút "Chơi Lại" để bắt đầu lại

## Cấu trúc dự án

```
amazonq-snake-game/
├── index.html      # Cấu trúc HTML của trò chơi
├── style.css       # Định dạng CSS cho giao diện
├── game.js         # Mã JavaScript điều khiển trò chơi
└── README.md       # Tài liệu hướng dẫn
```

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Tùy chỉnh

Bạn có thể tùy chỉnh trò chơi bằng cách chỉnh sửa các file sau:

- `style.css`: Thay đổi giao diện và màu sắc
- `game.js`: Điều chỉnh tốc độ, kích thước rắn, và các tính năng khác
- `index.html`: Thay đổi cấu trúc và nội dung văn bản

## Đóng góp

Nếu bạn muốn đóng góp vào dự án, hãy tạo một pull request hoặc báo cáo các vấn đề trong phần Issues.

## Giấy phép

Dự án này được phân phối theo giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

Chúc bạn chơi game vui vẻ! 🐍
