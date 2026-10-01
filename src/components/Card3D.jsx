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
    <div className="w-full h-full perspective-1000 select-none">
      <motion.div
        className="relative w-full h-full transform-style-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        onClick={onFlip}
      >
        {/* ================= MẶT SAU (LƯNG BÀI - KHI CHƯA LẬT) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl backface-hidden bg-gradient-to-br from-[#1b1536] via-[#120e24] to-[#0a0717] border-2 border-party-border shadow-card-depth flex flex-col items-center justify-between p-6 overflow-hidden">
          {/* Họa tiết ánh sáng viền Neon */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-party-neonPurple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-party-neonPink/20 rounded-full blur-3xl pointer-events-none" />

          {/* Phần trên mặt lưng */}
          <div className="w-full flex justify-between items-center text-xs tracking-widest text-gray-400 uppercase font-semibold">
            <span className="flex items-center gap-1 text-party-neonCyan">
              <Sparkles className="w-3.5 h-3.5" /> DRUNK DECK
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px]">
              {remainingCount} LÁ CÒN
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
            <p className="text-xs text-gray-400 mt-2 max-w-[200px] leading-relaxed">
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
              {/* Header thẻ bài */}
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
                    {card.drinkCount === 0 && (
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Đặc quyền</span>
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
            <div className="m-auto text-center text-gray-400 text-sm">
              Chưa có lá bài nào được bốc.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
