import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  HelpCircle, 
  ShieldAlert, 
  Users, 
  Crown, 
  Beer, 
  Sparkles,
  ArrowRight,
  Hand
} from 'lucide-react';

const ICON_MAP = {
  Flame: Flame,
  HelpCircle: HelpCircle,
  ShieldAlert: ShieldAlert,
  Users: Users,
  Crown: Crown
};

export default function SwipeCard({ card, onNext, isDeckEmpty, remainingCount, totalCardsCount }) {
  // Hướng bay ra khi thẻ bị vuốt (mặc định bay sang phải)
  const [exitDirection, setExitDirection] = useState('right');

  const handleDragEnd = (e, info) => {
    const swipeThreshold = 60; // Ngưỡng kéo để kích hoạt bốc lá tiếp theo
    const velocityThreshold = 250;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setExitDirection('right');
      onNext();
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setExitDirection('left');
      onNext();
    }
  };

  const handleClick = () => {
    setExitDirection('right');
    onNext();
  };

  const IconComponent = card ? (ICON_MAP[card.iconName] || Beer) : Sparkles;

  return (
    <div className="relative w-[90vw] max-w-[340px] h-[480px] sm:h-[500px] flex items-center justify-center select-none">
      <AnimatePresence mode="popLayout" custom={exitDirection}>
        <motion.div
          key={card ? card.id : 'cover-card'}
          custom={exitDirection}
          drag={isDeckEmpty ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          whileTap={{ scale: 0.98 }}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
          exit={(direction) => ({
            x: direction === 'left' ? -420 : 420,
            y: -60,
            rotate: direction === 'left' ? -22 : 22,
            opacity: 0,
            transition: { duration: 0.32, ease: "easeOut" }
          })}
          className="absolute inset-0 w-full h-full rounded-3xl bg-[#161329] border-2 border-party-border shadow-card-depth flex flex-col justify-between p-6 overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none z-10"
        >
          {/* Hiệu ứng nền Neon lấp lánh */}
          <div className="absolute -top-20 -left-20 w-44 h-44 bg-party-neonPurple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-party-neonPink/20 rounded-full blur-3xl pointer-events-none" />

          {/* ================= NẾU CHƯA BỐC LÁ NÀO (MÀN HÌNH BÌA BỘ BÀI) ================= */}
          {!card ? (
            <div className="flex flex-col items-center justify-between h-full text-center">
              {/* Top Banner */}
              <div className="w-full flex justify-between items-center text-xs tracking-widest text-gray-400 font-semibold uppercase">
                <span className="flex items-center gap-1 text-party-neonCyan">
                  <Sparkles className="w-3.5 h-3.5" /> TRUTH OR DARE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px]">
                  {remainingCount} LÁ BÀI
                </span>
              </div>

              {/* Center Vibe */}
              <div className="flex flex-col items-center my-auto">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-party-neonPink to-party-neonPurple p-[2px] shadow-neon-pink mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-full h-full bg-[#120e24] rounded-3xl flex items-center justify-center">
                    <Beer className="w-12 h-12 text-party-neonPink" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 tracking-tight">
                  THẬT HAY THÁCH?
                </h2>
                <p className="text-xs text-gray-300 mt-2.5 max-w-[240px] leading-relaxed">
                  Vuốt thẻ sang trái/phải hoặc chạm trực tiếp để bốc lá Truth / Uống hoặc Dare / Uống đầu tiên!
                </p>
              </div>

              {/* Bottom Cue */}
              <div className="w-full py-2.5 px-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold text-party-neonCyan">
                <Hand className="w-4 h-4 animate-pulse" />
                <span>CHẠM HOẶC VUỐT THẺ ĐỂ BẮT ĐẦU</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ) : isDeckEmpty ? (
            /* ================= NẾU ĐÃ HẾT BÀI ================= */
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-2xl font-black text-white">ĐÃ HẾT BỘ BÀI!</h3>
              <p className="text-xs text-gray-400 mt-2 max-w-[220px]">
                Toàn bộ {totalCardsCount} lá bài Truth or Dare đã được rút hết trong ván đấu.
              </p>
              <p className="text-xs text-party-neonCyan font-bold mt-4">
                Bấm nút "Xáo Lại" bên dưới để tiếp tục cuộc vui!
              </p>
            </div>
          ) : (
            /* ================= NỘI DUNG LÁ BÀI ĐANG CHƠI ================= */
            <div className="flex flex-col justify-between h-full">
              {/* Header Thẻ */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${card.badgeColor} shadow-md`}>
                    <IconComponent className="w-3.5 h-3.5" />
                    {card.categoryName}
                  </span>

                  {/* Số ly uống phạt & Độ khó */}
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {Array.from({ length: Math.min(card.drinkCount || 1, 2) }).map((_, i) => (
                      <Beer key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-amber-300 ml-0.5">{card.drinkCount} ly</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ml-1 ${
                      card.drinkCount === 2 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {card.difficulty || (card.drinkCount === 2 ? 'Khó' : 'Vừa')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-tight mt-2">
                  {card.title}
                </h3>
              </div>

              {/* Nội dung thử thách */}
              <div className="my-auto py-2">
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {/* Phần chân thẻ: Hình phạt + Gợi ý vuốt */}
              <div className="mt-auto pt-3 border-t border-white/10 space-y-2.5">
                <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-3 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block">
                      Hình Phạt (Nếu từ chối thực hiện / trả lời)
                    </span>
                    <span className="text-xs font-medium text-red-200 leading-snug">
                      {card.penalty}
                    </span>
                  </div>
                </div>

                <div className="text-center text-[10px] text-gray-400 font-medium flex items-center justify-center gap-1.5 pt-0.5">
                  <Hand className="w-3 h-3 text-party-neonCyan" />
                  <span>Vuốt hoặc chạm thẻ để bốc lá tiếp theo</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
