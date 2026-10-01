# 📱 Phase 03: Mobile-First UI & Hiệu Ứng Thẻ Bài 3D

Mục tiêu của Phase này là xây dựng giao diện tối ưu cho điện thoại di động (Mobile-First), bao gồm thẻ bài lật 3D siêu mượt bằng **Framer Motion + Lucide Icons**, thanh điều khiển nút bấm lớn thân thiện ngón tay cái và modal xem lại lịch sử các lá đã rút.

---

## 1. Component Thẻ Bài 3D (`src/components/Card3D.jsx`)

Tạo file `src/components/Card3D.jsx`. Component này hỗ trợ lật 180 độ 3D khi chạm vào thẻ bài:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  HelpCircle, 
  ShieldAlert, 
  Users, 
  Crown, 
  Beer, 
  Sparkles,
  RotateCw
} from 'lucide-react';

// Ánh xạ icon từ tên trong mockup data
const ICON_MAP = {
  Flame: Flame,
  HelpCircle: HelpCircle,
  ShieldAlert: ShieldAlert,
  Users: Users,
  Crown: Crown
};

export default function Card3D({ card, isFlipped, onFlip, isDrawing, remainingCount }) {
  const IconComponent = card ? (ICON_MAP[card.iconName] || Beer) : Sparkles;

  return (
    <div className="w-full max-w-[320px] sm:max-w-[340px] aspect-[2/3] perspective-1000 select-none">
      <motion.div
        className="relative w-full h-full transform-style-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        onClick={onFlip}
      >
        {/* ================= MẶT SAU (LƯNG BÀI - KHI CHƯA LẬT) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl backface-hidden bg-gradient-to-br from-[#1b1536] via-[#120e24] to-[#0a0717] border-2 border-party-border shadow-card-depth flex flex-col items-center justify-between p-6 overflow-hidden">
          {/* Họa tiết ánh sáng viền */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-party-neonPurple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-party-neonPink/20 rounded-full blur-3xl pointer-events-none" />

          {/* Phần trên mặt lưng */}
          <div className="w-full flex justify-between items-center text-xs tracking-widest text-gray-400 uppercase">
            <span className="flex items-center gap-1 font-semibold text-party-neonCyan">
              <Sparkles className="w-3.5 h-3.5" /> DRUNK DECK
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              {remainingCount} LÁ CÒN LẠI
            </span>
          </div>

          {/* Trung tâm mặt lưng */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-party-neonPink to-party-neonPurple p-[2px] shadow-neon-pink mb-4">
              <div className="w-full h-full bg-[#120e24] rounded-2xl flex items-center justify-center">
                <Beer className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 tracking-tight">
              BỐC BÀI ĐI!
            </h2>
            <p className="text-xs text-gray-400 mt-2 max-w-[200px]">
              Chạm vào đây hoặc bấm nút phía dưới để rút 1 lá ngẫu nhiên
            </p>
          </div>

          {/* Dưới cùng mặt lưng */}
          <div className="text-[11px] text-gray-500 font-mono tracking-wider flex items-center gap-1.5">
            <RotateCw className="w-3 h-3 animate-spin text-party-neonPink" />
            CHẠM ĐỂ LẬT BÀI
          </div>
        </div>

        {/* ================= MẶT TRƯỚC (NỘI DUNG LÁ BÀI - KHI ĐÃ LẬT) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl backface-hidden rotate-y-180 bg-[#161329] border-2 border-white/10 shadow-card-depth flex flex-col justify-between p-6 overflow-hidden">
          {card ? (
            <>
              {/* Header của thẻ */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${card.badgeColor} shadow-md`}>
                    <IconComponent className="w-3.5 h-3.5" />
                    {card.categoryName}
                  </span>
                  
                  {/* Hiển thị số ly uống phạt */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {Array.from({ length: Math.min(card.drinkCount || 1, 3) }).map((_, i) => (
                      <Beer key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                    {card.drinkCount > 3 && (
                      <span className="text-xs text-amber-400 font-bold">+{card.drinkCount - 3}</span>
                    )}
                  </div>
                </div>

                {/* Tiêu đề lá bài */}
                <h3 className="text-xl font-bold text-white tracking-tight mt-2 leading-tight">
                  {card.title}
                </h3>
              </div>

              {/* Nội dung thử thách */}
              <div className="my-auto py-2">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {/* Hình phạt phía chân thẻ */}
              <div className="mt-auto pt-3 border-t border-white/10">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400 block">
                      Hình phạt
                    </span>
                    <span className="text-xs font-medium text-red-200">
                      {card.penalty}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="m-auto text-center text-gray-400">Chưa có lá bài nào</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
```

---

## 2. Component Bảng Điều Khiển Nút Bấm (`src/components/Controls.jsx`)

Tạo file `src/components/Controls.jsx` tối ưu hóa ngón tay cái khi cầm điện thoại:

```jsx
import React from 'react';
import { Sparkles, RotateCcw, History } from 'lucide-react';

export default function Controls({ onDraw, onReshuffle, onOpenHistory, isDeckEmpty, isDrawing, drawnCount }) {
  return (
    <div className="w-full max-w-[340px] flex items-center justify-between gap-3 mt-6">
      {/* Nút xem lịch sử */}
      <button
        onClick={onOpenHistory}
        className="w-12 h-12 rounded-2xl bg-party-card border border-party-border flex items-center justify-center text-gray-300 hover:text-white hover:border-party-neonCyan transition active:scale-95 shadow-lg relative"
        title="Lịch sử các lá đã bốc"
      >
        <History className="w-5 h-5" />
        {drawnCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-party-neonPink text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
            {drawnCount}
          </span>
        )}
      </button>

      {/* NÚT BỐC BÀI CHÍNH (Thumb-friendly to bản) */}
      <button
        onClick={onDraw}
        disabled={isDeckEmpty || isDrawing}
        className={`flex-1 h-14 rounded-2xl font-black text-base tracking-wide flex items-center justify-center gap-2 shadow-neon-pink transition duration-200 active:scale-95 ${
          isDeckEmpty
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-party-neonPink via-purple-600 to-indigo-600 text-white hover:brightness-110'
        }`}
      >
        <Sparkles className="w-5 h-5" />
        {isDeckEmpty ? 'ĐÃ HẾT BÀI' : 'BỐC BÀI TIẾP'}
      </button>

      {/* Nút xáo lại bài */}
      <button
        onClick={onReshuffle}
        className="w-12 h-12 rounded-2xl bg-party-card border border-party-border flex items-center justify-center text-gray-300 hover:text-white hover:border-party-neonAmber transition active:scale-95 shadow-lg"
        title="Xáo lại toàn bộ bộ bài"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
}
```

---

## 3. Component Modal Xem Lịch Sử (`src/components/HistoryModal.jsx`)

Tạo file `src/components/HistoryModal.jsx`:

```jsx
import React from 'react';
import { X, Beer } from 'lucide-react';

export default function HistoryModal({ isOpen, onClose, history }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-[#161329] border border-party-border rounded-t-3xl sm:rounded-3xl max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Beer className="w-5 h-5 text-party-neonPink" />
            <h3 className="font-bold text-white text-base">Lịch Sử Các Lá Đã Bốc ({history.length})</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Danh sách thẻ đã bốc */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {history.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">Chưa có lá bài nào được bốc trong ván này.</p>
          ) : (
            history.map((card, idx) => (
              <div 
                key={`${card.id}-${idx}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-start justify-between gap-3"
              >
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white bg-gradient-to-r ${card.badgeColor} mb-1.5`}>
                    {card.categoryName}
                  </span>
                  <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2">{card.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold text-amber-400">{card.drinkCount} ly</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Ghép Nối Hoàn Chỉnh (`src/App.jsx`)

Mở file `src/App.jsx` và cập nhật:

```jsx
import React, { useState } from 'react';
import Card3D from './components/Card3D';
import Controls from './components/Controls';
import HistoryModal from './components/HistoryModal';
import { useDrinkingGame } from './hooks/useDrinkingGame';
import { Beer, Sparkles } from 'lucide-react';

export default function App() {
  const {
    remainingCount,
    totalCardsCount,
    drawnCount,
    currentCard,
    isFlipped,
    isDrawing,
    isDeckEmpty,
    history,
    drawCard,
    toggleFlip,
    reshuffleDeck
  } = useDrinkingGame();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-party-dark flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background Neon Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-party-neonPurple/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-md flex items-center justify-between py-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-party-neonPink/20 border border-party-neonPink/40 flex items-center justify-center">
            <Beer className="w-5 h-5 text-party-neonPink" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
              DRUNK DECK <Sparkles className="w-3.5 h-3.5 text-party-neonCyan" />
            </h1>
            <p className="text-[11px] text-gray-400">Drinking Game Cho Bạn Bè</p>
          </div>
        </div>

        {/* Badge đếm tiến trình */}
        <div className="bg-party-card border border-party-border px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Còn {remainingCount}/{totalCardsCount} lá</span>
        </div>
      </header>

      {/* Khu vực thẻ bài trung tâm */}
      <main className="my-auto py-4 z-10 flex flex-col items-center">
        <Card3D
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={toggleFlip}
          isDrawing={isDrawing}
          remainingCount={remainingCount}
        />
      </main>

      {/* Điều khiển dưới cùng */}
      <footer className="w-full max-w-md flex flex-col items-center pb-4 z-10">
        <Controls
          onDraw={drawCard}
          onReshuffle={reshuffleDeck}
          onOpenHistory={() => setIsHistoryOpen(true)}
          isDeckEmpty={isDeckEmpty}
          isDrawing={isDrawing}
          drawnCount={drawnCount}
        />
      </footer>

      {/* Modal xem lại lịch sử */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
      />
    </div>
  );
}
```

---

## 5. Tiêu Chí Kiểm Tra (Checklist Hoàn Thành Phase 03)
- [ ] Giao diện co giãn chuẩn từ màn hình nhỏ nhất (320px) đến máy tính bảng/desktop.
- [ ] Chạm vào thẻ bài lật mặt mượt mà với chuyển động 3D.
- [ ] Bấm nút "BỐC BÀI TIẾP" rút thẻ mới, trừ số lượng bài còn lại.
- [ ] Modal xem lịch sử hiển thị đầy đủ các lá đã bốc.
- [ ] Sẵn sàng chuyển tiếp sang [Phase 04: Âm Thanh, Rung & Hiệu Ứng Bữa Tiệc](file:///c:/Users/trong/Downloads/Code/phases/04-audio-haptics-and-visual-fx.md).
