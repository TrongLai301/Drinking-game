# 🍻 DrunkDeck - Drinking Game Online (Mobile-First)

Ứng dụng web thẻ bài tương tác dành riêng cho các buổi tiệc tùng, tụ họp bạn bè. Tối ưu hóa hoàn toàn cho màn hình cảm ứng điện thoại thông minh với cử chỉ vuốt trượt thẻ bài (Swipe/Slide-out), âm thanh chân thực từ Web Audio API và hệ thống 120 lá bài phong phú.

---

## 🌟 Tính Năng Nổi Bật

- 🎴 **Cơ Chế Bốc Bài Không Trùng Lặp**: Thuật toán rút ngẫu nhiên loại bỏ các lá đã bốc trong suốt ván chơi, tự động theo dõi tiến độ còn lại và hỗ trợ xáo lại bộ bài bất cứ lúc nào.
- 📱 **Mobile-First Gesture (Vuốt Kéo Mượt Mà)**:
  - Dùng ngón tay vuốt thẻ bài sang trái hoặc sang phải để bốc lá tiếp theo.
  - Chạm trực tiếp vào bất kỳ vị trí nào trên thẻ bài để rút nhanh.
  - Nút bấm to bản ở thanh dưới thân thiện với thao tác 1 tay trên điện thoại.
- 🔊 **Âm Thanh & Rung Xúc Giác (Haptics)**:
  - Sử dụng **Web Audio API** tổng hợp trực tiếp từ trình duyệt, phản hồi tức thì mà không cần tải file MP3 bên ngoài, không lo giật lag khi mạng yếu.
  - Rung phản hồi (`navigator.vibrate`) khi bốc thẻ và khi trúng hình phạt nặng.
  - Pháo hoa ăn mừng (`canvas-confetti`) rực rỡ khi bốc trúng thẻ Kim Bài Đặc Quyền.
- 📦 **Kho 120 Lá Bài Cực Chất Từ Các Bộ Game Nổi Tiếng**:
  1. **Thổ Lộ & Tình Cảm 💌 (28 lá)**: Những câu hỏi chân thành, cảm xúc sâu lắng, rung động lãng mạn nhưng văn minh, không quá 18+.
  2. **Do or Drink 🥃 (28 lá)**: Thách thức hành động trực diện - hoặc dũng cảm thực hiện hoặc chịu phạt nâng ly!
  3. **Kim Bài Quyền Lực 👑 (12 lá)**: Bùa hộ mệnh, khiên phản đòn, chuyển giao hình phạt, thẩm phán tối cao, bất tử 1 vòng.
  4. **Truth or Dare 🤫 (22 lá)**: Thật hay Thách kinh điển, khám phá đời tư và thử thách lầy lội.
  5. **Phê Far 🍻 (20 lá)**: Sát phạt bàn nhậu đỉnh cao, giao bôi cạn ly, vòng tròn tử thần, bắn tỉa.
  6. **U Là Trời ⚡ (10 lá)**: Mini-game đối kháng, đấu tố vui nhộn, luật nhóm oái oăm của Gen Z.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (Dark Mode Neon Party Theme)
- **Animation**: Framer Motion (Cử chỉ kéo vuốt & hiệu ứng chuyển cảnh)
- **Icons**: Lucide Icons (`lucide-react`) - phong cách chuẩn topgit.dev
- **Effects**: Web Audio API (Âm thanh synthesizer), Canvas Confetti (Pháo hoa), Navigator Vibrate API (Rung điện thoại)

---

## 🚀 Chạy Cục Bộ (Local Development)

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev

# 3. Để các thiết bị cùng mạng Wi-Fi (điện thoại) truy cập được:
npm run dev -- --host 0.0.0.0 --port 3000
```

Truy cập:
- Trên máy tính: `http://localhost:3000`
- Trên điện thoại (cùng Wi-Fi): `http://<dia-chi-ip-may-tinh>:3000`

---

## 🌐 Hướng Dẫn Triển Khai Online (Deploy)

### 🅰️ Triển khai lên Vercel (Khuyên dùng - 1 phút xong)
1. Đẩy mã nguồn lên kho chứa GitHub:
   ```bash
   git add .
   git commit -m "feat: complete drinking game app"
   git push origin main
   ```
2. Đăng nhập [Vercel](https://vercel.com) bằng tài khoản GitHub.
3. Bấm **"Add New Project"** ➔ Chọn repository `Drinking-game`.
4. Bấm **"Deploy"**. Vercel sẽ tự động build và cung cấp link công khai miễn phí.

### 🅱️ Triển khai lên GitHub Pages (Tự động qua GitHub Actions)
1. Vào mục **Settings** của repository trên GitHub ➔ Chọn **Pages**.
2. Tại phần **Source**, chọn **GitHub Actions**.
3. Mỗi khi bạn `git push origin main`, quy trình GitHub Actions tại `.github/workflows/deploy.yml` sẽ tự động build và đưa web lên địa chỉ:  
   👉 `https://<ten-username>.github.io/<ten-repo>/`

---

## 📄 Bản Quyền & Tài Liệu
- Tài liệu chi tiết các Phase: [docs/phases/README.md](file:///c:/Users/trong/Downloads/Code/docs/phases/README.md)
- Kế hoạch tổng quan: [docs/PLAN.md](file:///c:/Users/trong/Downloads/Code/docs/PLAN.md)
