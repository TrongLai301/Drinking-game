# 📑 Danh Mục Các Phase Triển Khai Drinking Game (React.js)

Toàn bộ quá trình phát triển web **Drinking Game Mobile-First** được module hóa thành 5 Phase độc lập, chi tiết và có thể thực thi ngay:

---

## 📂 Danh Sách Các Phase

| Phase | Tên Phase & Nội Dung | File Chi Tiết | Trạng Thái |
| :---: | :--- | :---: | :---: |
| **01** | **Setup Project & Cấu hình UI System**<br>- Khởi tạo Vite + React.js, Tailwind CSS, Lucide Icons, HeroUI / Framer Motion.<br>- Cấu hình CSS 3D transform (perspective, backface-visibility). | [01-setup-and-config.md](file:///c:/Users/trong/Downloads/Code/phases/01-setup-and-config.md) | 📋 Ready |
| **02** | **Bộ Mockup Data & Game Engine**<br>- Bộ 50 lá bài mẫu tiếng Việt chia 5 danh mục (Dare, Truth, Rule, All, Lucky).<br>- Custom hook `useDrinkingGame` xử lý rút ngẫu nhiên không lặp lại & theo dõi tiến độ. | [02-mockup-data-and-game-engine.md](file:///c:/Users/trong/Downloads/Code/phases/02-mockup-data-and-game-engine.md) | 📋 Ready |
| **03** | **Mobile-First UI & Hiệu Ứng Thẻ Bài 3D**<br>- Component `Card3D.jsx` lật mặt trước/mặt sau 3D cảm ứng mượt mà.<br>- Component `DeckStack.jsx` hiệu ứng sấp bài xếp lớp.<br>- `Controls.jsx` (Thumb-friendly nút Bốc bài, Xáo bài).<br>- `HistoryModal.jsx` xem lại các lá đã rút. | [03-mobile-ui-and-card-3d.md](file:///c:/Users/trong/Downloads/Code/phases/03-mobile-ui-and-card-3d.md) | 📋 Ready |
| **04** | **Âm Thanh (Sound FX), Rung (Haptics) & Hiệu Ứng Bữa Tiệc**<br>- Web Audio API tổng hợp âm thanh lật bài/cạn ly (không lo lỗi thiếu file mp3).<br>- `navigator.vibrate` phản hồi xúc giác trên điện thoại.<br>- Pháo hoa canvas-confetti khi bốc trúng thẻ đặc quyền. | [04-audio-haptics-and-visual-fx.md](file:///c:/Users/trong/Downloads/Code/phases/04-audio-haptics-and-visual-fx.md) | 📋 Ready |
| **05** | **Deploy Lên Git (GitHub Pages & Vercel)**<br>- Hướng dẫn deploy 1-click lên Vercel tự động CI/CD khi push Git.<br>- Cấu hình GitHub Actions workflow deploy lên GitHub Pages miễn phí. | [05-deployment-and-ci-cd.md](file:///c:/Users/trong/Downloads/Code/phases/05-deployment-and-ci-cd.md) | 📋 Ready |

---

> [!TIP]
> Bạn có thể thực hiện tuần tự từ Phase 1 đến Phase 5 để hoàn thiện ứng dụng web Drinking Game hoàn chỉnh và đưa lên online.
