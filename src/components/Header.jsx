import React, { useState } from 'react';
import { 
  Beer, 
  Sparkles, 
  Layers, 
  Flame, 
  Crown, 
  Smartphone, 
  X, 
  QrCode,
  Volume2,
  VolumeX,
  Heart,
  HelpCircle,
  Zap
} from 'lucide-react';

const CATEGORIES = [
  { key: 'all', name: 'Tất Cả (158)', icon: Layers },
  { key: 'tho-lo', name: 'Thổ Lộ 💌 (40)', icon: Heart },
  { key: 'do-drink', name: 'Do or Drink 🥃 (40)', icon: Zap },
  { key: 'truth-dare', name: 'Truth or Dare 🤫 (36)', icon: HelpCircle },
  { key: 'phe-far', name: 'Phê Far 🍻 (20)', icon: Beer },
  { key: 'lucky', name: 'Kim Bài 👑 (12)', icon: Crown },
  { key: 'u-la-troi', name: 'U Là Trời ⚡ (10)', icon: Sparkles }
];

export default function Header({ 
  remainingCount, 
  totalCardsCount, 
  selectedCategory, 
  onSelectCategory,
  isMuted,
  onToggleMute,
  onOpenCatalog
}) {
  const [showQR, setShowQR] = useState(false);
  const localUrl = "http://192.168.51.19:3000";

  return (
    <>
      <header className="w-full max-w-md flex flex-col gap-3 py-2 z-20">
        {/* Hàng trên: Logo, Đếm bài, Loa & Nút QR Phone */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-party-neonPink to-party-neonPurple p-[2px] shadow-neon-pink">
              <div className="w-full h-full bg-[#120e24] rounded-2xl flex items-center justify-center">
                <Beer className="w-5 h-5 text-party-neonPink" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                DRUNK DECK <Sparkles className="w-4 h-4 text-party-neonCyan" />
              </h1>
              <p className="text-[11px] text-gray-400 font-medium">158 Thẻ Bài Drinking Game</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Nút xem toàn bộ kho 158 thẻ bài */}
            <button
              onClick={onOpenCatalog}
              className="px-2.5 py-1.5 rounded-full bg-party-card border border-party-neonPink/40 hover:border-party-neonPink text-party-neonPink text-xs font-semibold flex items-center gap-1 shadow-sm transition active:scale-95"
              title="Xem và tra cứu toàn bộ 158 thẻ bài"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kho Thẻ</span>
            </button>

            {/* Nút bật / tắt âm thanh */}
            <button
              onClick={onToggleMute}
              className="w-8 h-8 rounded-full bg-party-card border border-party-border flex items-center justify-center text-gray-300 hover:text-white transition active:scale-90"
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Nút mở mã QR kết nối điện thoại */}
            <button
              onClick={() => setShowQR(true)}
              className="px-2.5 py-1.5 rounded-full bg-party-card border border-party-neonCyan/40 hover:border-party-neonCyan text-party-neonCyan text-xs font-semibold flex items-center gap-1 shadow-sm transition active:scale-95"
              title="Mở trên điện thoại qua Wi-Fi"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chơi trên</span> ĐT
            </button>

            {/* Badge số lá bài còn lại */}
            <div className="bg-party-card border border-party-border px-3 py-1.5 rounded-full text-xs font-semibold text-gray-200 flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{remainingCount}/{totalCardsCount}</span>
            </div>
          </div>
        </div>

        {/* Hàng dưới: Thanh chọn chế độ bài */}
        <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-2 pt-1 pb-0.5">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const targetKey = cat.filterKey || cat.key;
            const isActive = selectedCategory === targetKey;
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(targetKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-party-neonPink to-party-neonPurple text-white shadow-neon-pink' 
                    : 'bg-party-card/80 border border-party-border text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </header>

      {/* Modal QR Code cho điện thoại kết nối */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-xs bg-[#161329] border border-party-neonCyan/50 rounded-3xl p-6 text-center shadow-2xl relative">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-party-neonCyan/10 border border-party-neonCyan flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6 text-party-neonCyan" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">Quét Mã Chơi Trên Điện Thoại</h3>
            <p className="text-xs text-gray-300 mb-4">
              Đảm bảo điện thoại kết nối cùng mạng Wi-Fi với máy tính này:
            </p>

            {/* QR Code Image */}
            <div className="bg-white p-3 rounded-2xl inline-block shadow-lg mb-3">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(localUrl)}`}
                alt="QR Code kết nối điện thoại"
                className="w-40 h-40 object-contain mx-auto"
              />
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-party-neonCyan select-all break-all mb-2">
              {localUrl}
            </div>

            <p className="text-[11px] text-gray-400">
              Hoặc mở trình duyệt Chrome / Safari trên điện thoại và gõ địa chỉ trên.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
