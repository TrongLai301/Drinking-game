import React from 'react';
import { X, Beer, Sparkles } from 'lucide-react';

export default function HistoryModal({ isOpen, onClose, history }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-[#161329] border border-party-border rounded-t-3xl sm:rounded-3xl max-h-[82vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Beer className="w-5 h-5 text-party-neonPink" />
            <h3 className="font-bold text-white text-base">Lịch Sử Các Lá Đã Bốc ({history.length})</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Danh Sách Thẻ Bài Đã Rút */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {history.length === 0 ? (
            <div className="py-12 text-center">
              <Sparkles className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Chưa có lá bài nào được bốc trong ván này.</p>
              <p className="text-gray-500 text-xs mt-1">Hãy rút bài để bắt đầu lưu lịch sử!</p>
            </div>
          ) : (
            history.map((card, idx) => (
              <div 
                key={`${card.id}-${idx}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-start justify-between gap-3 hover:border-party-border transition"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${card.badgeColor}`}>
                      {card.categoryName}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      #{history.length - idx}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{card.description}</p>
                  <p className="text-[11px] text-red-400 mt-2 font-medium">⚠️ {card.penalty}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-400 px-2 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20">
                    {card.drinkCount > 0 ? `${card.drinkCount} ly` : 'Đặc quyền'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
