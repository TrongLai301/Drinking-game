# 🔊 Phase 04: Âm Thanh, Rung (Haptics) & Hiệu Ứng Bữa Tiệc

Mục tiêu của Phase này là nâng cấp trải nghiệm tương tác lên tầm cao mới: tích hợp âm thanh chân thực bằng **Web Audio API** (tổng hợp trực tiếp từ trình duyệt, không lo lag hay mất kết nối mạng khi ở quán nhậu), phản hồi rung xúc giác (**Haptic Vibration**) khi chạm bốc bài trên điện thoại và hiệu ứng bắn pháo hoa **Canvas Confetti**.

---

## 1. Custom Hook Âm Thanh & Rung (`src/hooks/useAudioFeedback.js`)

Tạo file `src/hooks/useAudioFeedback.js`. Hook này dùng trực tiếp `AudioContext` của HTML5 để tạo âm thanh tức thì và `navigator.vibrate` trên thiết bị di động:

```javascript
import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useAudioFeedback() {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('drunkdeck_muted') === 'true';
  });

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      localStorage.setItem('drunkdeck_muted', String(next));
      return next;
    });
  }, []);

  /**
   * Tạo âm thanh bằng Web Audio API (Không phụ thuộc mạng)
   */
  const playSound = useCallback((type = 'flip') => {
    if (isMuted) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'flip') {
        // Âm thanh lật bài (swoosh nhẹ)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);

      } else if (type === 'lucky') {
        // Âm thanh chúc mừng / trúng kim bài miễn tử (hợp âm vui vẻ)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
        });

      } else if (type === 'shuffle') {
        // Âm thanh xáo bài (rột rẹt liên tục)
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(150 + i * 40, ctx.currentTime + i * 0.05);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.05 + 0.04);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.05);
          osc.stop(ctx.currentTime + i * 0.05 + 0.04);
        }
      }
    } catch (e) {
      console.warn("AudioContext error:", e);
    }
  }, [isMuted]);

  /**
   * Kích hoạt rung điện thoại (Haptic feedback)
   */
  const triggerVibrate = useCallback((pattern = [30]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Thiết bị không hỗ trợ rung thì bỏ qua êm ái
      }
    }
  }, []);

  /**
   * Bắn pháo hoa ăn mừng khi trúng thẻ hiếm
   */
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2E93', '#00F0FF', '#FFB800', '#A855F7', '#10B981']
      });
    } catch (e) {
      console.warn("Confetti error:", e);
    }
  }, []);

  return {
    isMuted,
    toggleMute,
    playSound,
    triggerVibrate,
    triggerConfetti
  };
}
```

---

## 2. Tích Hợp Vào `src/App.jsx`

Cập nhật `src/App.jsx` để kết nối âm thanh và rung vào mỗi lượt bốc bài:

```jsx
import React, { useState } from 'react';
import Card3D from './components/Card3D';
import Controls from './components/Controls';
import HistoryModal from './components/HistoryModal';
import { useDrinkingGame } from './hooks/useDrinkingGame';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import { Beer, Sparkles, Volume2, VolumeX } from 'lucide-react';

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

  const {
    isMuted,
    toggleMute,
    playSound,
    triggerVibrate,
    triggerConfetti
  } = useAudioFeedback();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Xử lý bốc bài kèm âm thanh và rung
  const handleDraw = () => {
    drawCard();
    playSound('flip');
    triggerVibrate([40]);
  };

  // Lật bài thủ công
  const handleFlip = () => {
    toggleFlip();
    playSound('flip');
    triggerVibrate([25]);
  };

  // Xáo bài kèm hiệu ứng
  const handleReshuffle = () => {
    reshuffleDeck();
    playSound('shuffle');
    triggerVibrate([30, 50, 30]);
  };

  // Hiệu ứng ăn mừng khi trúng lá Kim bài đặc quyền (lucky)
  React.useEffect(() => {
    if (currentCard?.category === 'lucky' && isFlipped) {
      playSound('lucky');
      triggerConfetti();
      triggerVibrate([60, 40, 80]);
    }
  }, [currentCard, isFlipped, playSound, triggerConfetti, triggerVibrate]);

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

        {/* Nút bật/tắt âm thanh & Badge tiến trình */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <div className="bg-party-card border border-party-border px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Còn {remainingCount}/{totalCardsCount}</span>
          </div>
        </div>
      </header>

      {/* Khu vực thẻ bài trung tâm */}
      <main className="my-auto py-4 z-10 flex flex-col items-center">
        <Card3D
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          isDrawing={isDrawing}
          remainingCount={remainingCount}
        />
      </main>

      {/* Điều khiển dưới cùng */}
      <footer className="w-full max-w-md flex flex-col items-center pb-4 z-10">
        <Controls
          onDraw={handleDraw}
          onReshuffle={handleReshuffle}
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

## 3. Tiêu Chí Kiểm Tra (Checklist Hoàn Thành Phase 04)
- [ ] Bấm nút bốc bài phát ra âm thanh lật bài mượt mà và điện thoại có phản hồi rung nhẹ.
- [ ] Bốc trúng thẻ "Kim Bài Miễn Tử" kích hoạt pháo hoa đa màu và chuỗi âm thanh vui nhộn.
- [ ] Nút loa chuyển đổi qua lại giữa Mute / Unmute và lưu trạng thái vào LocalStorage.
- [ ] Sẵn sàng chuyển tiếp sang [Phase 05: Deploy Lên Git (GitHub Pages & Vercel)](file:///c:/Users/trong/Downloads/Code/phases/05-deployment-and-ci-cd.md).
