import React from 'react';

export default function DeckStack({ children, remainingCount }) {
  // Hiển thị các lớp bài phía sau tạo độ dày bộ bài
  const showSecondLayer = remainingCount > 1;
  const showThirdLayer = remainingCount > 5;

  return (
    <div className="relative w-[90vw] max-w-[340px] h-[480px] sm:h-[500px] flex items-center justify-center select-none">
      {/* Lớp bài thứ 3 (sau cùng) */}
      {showThirdLayer && (
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl bg-[#0e0b1e] border-2 border-party-border/30 pointer-events-none transition-all duration-300 shadow-xl"
          style={{
            transform: 'translateY(12px) scale(0.92) rotate(2deg)',
            zIndex: 1,
            opacity: 0.4
          }}
        />
      )}

      {/* Lớp bài thứ 2 (ngay phía sau thẻ hiện tại) */}
      {showSecondLayer && (
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl bg-[#130f29] border-2 border-party-border/60 pointer-events-none transition-all duration-300 shadow-xl"
          style={{
            transform: 'translateY(6px) scale(0.96) rotate(-1.5deg)',
            zIndex: 2,
            opacity: 0.8
          }}
        />
      )}

      {/* Thẻ bài chính phía trước */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
