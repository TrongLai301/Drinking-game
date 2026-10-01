import React from 'react';
import { Sparkles, RotateCcw, History, Layers } from 'lucide-react';

export default function Controls({ 
  onDraw, 
  onReshuffle, 
  onOpenHistory, 
  onOpenCatalog,
  isDeckEmpty, 
  isDrawing, 
  drawnCount, 
  totalCount 
}) {
  return (
    <div className="w-full max-w-[340px] flex flex-col items-center gap-3">
      {/* Hàng nút bấm */}
      <div className="w-full flex items-center justify-between gap-3">
        {/* Nút xem lịch sử bài đã bốc */}
        <button
          onClick={onOpenHistory}
          className="w-13 h-13 p-3.5 rounded-2xl bg-party-card border border-party-border flex items-center justify-center text-gray-300 hover:text-white hover:border-party-neonCyan transition active:scale-90 shadow-lg relative"
          title="Lịch sử các lá đã bốc"
        >
          <History className="w-5 h-5" />
          {drawnCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-party-neonPink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
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
          <Sparkles className="w-5 h-5 animate-spin text-party-neonCyan" style={{ animationDuration: '6s' }} />
          {isDeckEmpty ? 'ĐÃ HẾT BÀI' : 'BỐC BÀI TIẾP'}
        </button>

        {/* Nút xáo lại bài */}
        <button
          onClick={onReshuffle}
          className="w-13 h-13 p-3.5 rounded-2xl bg-party-card border border-party-border flex items-center justify-center text-gray-300 hover:text-white hover:border-party-neonAmber transition active:scale-90 shadow-lg"
          title="Xáo lại toàn bộ bài"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Thanh tiến trình % rút bài */}
      <div className="w-full flex flex-col gap-1.5 px-1">
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-party-neonPink to-party-neonCyan h-full transition-all duration-300"
            style={{ width: `${(drawnCount / (totalCount || 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] text-gray-400 font-mono">
          <span>ĐÃ BỐC: {drawnCount}/{totalCount} LÁ</span>
          <span>TIẾN ĐỘ: {Math.round((drawnCount / (totalCount || 1)) * 100)}%</span>
        </div>
      </div>

      {/* Nút xem nhanh toàn bộ kho thẻ */}
      <button
        onClick={onOpenCatalog}
        className="text-[11px] text-gray-400 hover:text-party-neonCyan transition flex items-center justify-center gap-1.5 pt-0.5 active:scale-95"
      >
        <Layers className="w-3.5 h-3.5 text-party-neonPink" />
        <span>Xem toàn bộ 158 thẻ bài & tìm kiếm</span>
      </button>
    </div>
  );
}
