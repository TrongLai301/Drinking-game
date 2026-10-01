# 🛠️ Phase 01: Setup Project & Cấu Hình UI System

Mục tiêu của Phase này là khởi tạo môi trường phát triển React.js với Vite, cài đặt Tailwind CSS, hệ thống icon chuẩn **Lucide** (tương tự như trên topgit.dev), và cấu hình các lớp CSS hỗ trợ hiệu ứng xoay lật 3D (3D transform).

---

## 1. Khởi Tạo Dự Án Với Vite

Mở terminal tại thư mục làm việc và chạy các lệnh sau:

```bash
# Khởi tạo React app với Vite (sử dụng template JavaScript hoặc TypeScript)
npm create vite@latest drinking-game -- --template react

# Chuyển vào thư mục dự án
cd drinking-game

# Cài đặt các gói phụ thuộc cơ bản
npm install
```

---

## 2. Cài Đặt Thư Viện UI, Animation & Icon

Cài đặt các gói cần thiết cho giao diện, hiệu ứng và icon:

```bash
# Cài đặt Tailwind CSS và các công cụ hỗ trợ
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Cài đặt Framer Motion (cho physics animation mượt mà)
npm install framer-motion

# Cài đặt Lucide Icons (chuẩn icon minimalist của topgit.dev)
npm install lucide-react

# Cài đặt Canvas Confetti (cho hiệu ứng pháo hoa khi trúng thẻ hiếm)
npm install canvas-confetti
```

---

## 3. Cấu Hình Tailwind CSS

Mở file `tailwind.config.js` và cập nhật cấu hình:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        party: {
          dark: '#0B0914',
          card: '#161329',
          border: '#282347',
          neonPink: '#FF2E93',
          neonCyan: '#00F0FF',
          neonAmber: '#FFB800',
          neonPurple: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 25px -5px rgba(255, 46, 147, 0.5)',
        'neon-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.5)',
        'card-depth': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
```

---

## 4. Cấu Hình CSS 3D Lật Thẻ Bài (`src/index.css`)

Mở file `src/index.css` và bổ sung các utility class phục vụ lật thẻ 3D:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  /* Hỗ trợ không gian 3D */
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
}

/* Tối ưu trải nghiệm màn hình cảm ứng điện thoại */
html, body {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  background-color: #0B0914;
  color: #F3F4F6;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  height: 100%;
}

/* Thanh cuộn phong cách tối */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0B0914;
}
::-webkit-scrollbar-thumb {
  background: #282347;
  border-radius: 9999px;
}
```

---

## 5. Cấu Trúc Thư Mục Dự Án Hoàn Chỉnh

Thiết lập cấu trúc thư mục trong `src/`:

```
src/
├── components/
│   ├── Card3D.jsx           # Thẻ bài lật 3D
│   ├── DeckStack.jsx        # Hiệu ứng sấp bài xếp tầng
│   ├── Controls.jsx         # Nút bốc bài, xáo bài
│   ├── Header.jsx           # Logo, bộ đếm lá bài, nút bật âm thanh
│   ├── HistoryModal.jsx     # Xem danh sách các lá đã bốc
│   └── CategoryBadge.jsx    # Nhãn phân loại bài
├── data/
│   └── cardsData.js         # Toàn bộ danh sách 50 lá bài
├── hooks/
│   ├── useDrinkingGame.js   # Logic bốc ngẫu nhiên & đếm bài
│   └── useAudioFeedback.js  # Âm thanh Web Audio & rung
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

---

## 6. Tiêu Chí Kiểm Tra (Checklist Hoàn Thành Phase 01)
- [ ] Chạy lệnh `npm run dev` không bị lỗi.
- [ ] Tailwind CSS nhận diện các màu `party-dark`, `party-neonPink`.
- [ ] Thư viện `lucide-react` import được các icon `Flame`, `ShieldAlert`, `Users`, v.v.
- [ ] Sẵn sàng chuyển tiếp sang [Phase 02: Mockup Data & Game Engine](file:///c:/Users/trong/Downloads/Code/phases/02-mockup-data-and-game-engine.md).
