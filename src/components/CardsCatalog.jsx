import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowLeft, 
  Sparkles, 
  Beer, 
  Heart, 
  Zap, 
  Crown, 
  HelpCircle, 
  Layers, 
  Copy, 
  Check,
  Flame,
  ShieldAlert,
  Users,
  SlidersHorizontal
} from 'lucide-react';
import { DRINKING_CARDS } from '../data/cardsData';

// Danh mục lọc với icon và badge
const CATEGORY_TABS = [
  { key: 'all', name: 'Tất Cả', icon: Layers, count: 158 },
  { key: 'truth', name: 'Truth / Uống 🤫', icon: HelpCircle, count: 68 },
  { key: 'dare', name: 'Dare / Uống 🔥', icon: Flame, count: 90 }
];

const PENALTY_FILTERS = [
  { key: 'all', label: 'Tất cả mức độ' },
  { key: '1', label: '🥃 1 ly (Độ khó vừa)' },
  { key: '2', label: '🥃🥃 2 ly (Độ khó cao)' }
];

const ICON_MAP = {
  Flame: Flame,
  HelpCircle: HelpCircle,
  ShieldAlert: ShieldAlert,
  Users: Users,
  Crown: Crown,
  Beer: Beer,
  Sparkles: Sparkles,
  Heart: Heart,
  Zap: Zap
};

export default function CardsCatalog({ onBackToGame, onSelectCardToPlay }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPenalty, setSelectedPenalty] = useState('all');
  const [copiedCardId, setCopiedCardId] = useState(null);

  // Lọc danh sách thẻ bài theo tìm kiếm và danh mục
  const filteredCards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return DRINKING_CARDS.filter(card => {
      // 1. Lọc theo danh mục / loại thẻ (truth hoặc dare)
      if (selectedCategory !== 'all') {
        const matchesCategory = 
          card.category === selectedCategory || 
          card.type === selectedCategory;
        if (!matchesCategory) return false;
      }

      // 2. Lọc theo mức độ phạt (1 ly hoặc 2 ly)
      if (selectedPenalty !== 'all') {
        if (selectedPenalty === '1' && card.drinkCount !== 1) return false;
        if (selectedPenalty === '2' && card.drinkCount !== 2) return false;
      }

      // 3. Tìm kiếm theo tên thẻ, nội dung, hình phạt
      if (query) {
        const titleMatch = card.title?.toLowerCase().includes(query);
        const descMatch = card.description?.toLowerCase().includes(query);
        const penaltyMatch = card.penalty?.toLowerCase().includes(query);
        const categoryMatch = card.categoryName?.toLowerCase().includes(query);
        const idMatch = card.id?.toLowerCase().includes(query);

        return titleMatch || descMatch || penaltyMatch || categoryMatch || idMatch;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedPenalty]);

  // Sao chép nội dung thẻ bài
  const handleCopyCard = (card) => {
    const textToCopy = `🎴 [${card.categoryName}] ${card.title}\n📝 Nội dung: ${card.description}\n⚠️ Hình phạt: ${card.penalty}`;
    navigator.clipboard?.writeText?.(textToCopy);
    setCopiedCardId(card.id);
    setTimeout(() => setCopiedCardId(null), 1800);
  };

  // Reset bộ lọc
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPenalty('all');
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col min-h-screen p-3 sm:p-6 text-white z-20">
      {/* Header Điều Hướng */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGame}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 hover:border-party-neonPink/50 flex items-center justify-center text-gray-300 hover:text-white transition active:scale-95 shadow-sm"
            title="Quay lại bàn chơi"
          >
            <ArrowLeft className="w-5 h-5 text-party-neonPink" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              KHO THẺ TRUTH OR DARE
              <Sparkles className="w-5 h-5 text-party-neonCyan" />
            </h1>
            <p className="text-xs text-gray-400">
              Tra cứu & xem trước toàn bộ <span className="text-party-neonPink font-bold">158 thẻ bài Thật hay Thách</span> (Tối đa 2 ly)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onBackToGame}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-party-neonPink to-party-neonPurple text-white shadow-neon-pink hover:brightness-110 transition active:scale-95 flex items-center gap-1.5"
          >
            <Beer className="w-4 h-4" />
            Vào Bàn Bốc Bài
          </button>
        </div>
      </div>

      {/* Thanh Tìm Kiếm & Bộ Lọc Nâng Cao */}
      <div className="mt-4 space-y-3 bg-[#130f24]/90 p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl sticky top-2 z-30">
        {/* Input Tìm Kiếm */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên thẻ, từ khóa nội dung, hình phạt, mã số (#tl_01)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-party-neonCyan focus:ring-1 focus:ring-party-neonCyan text-white text-sm placeholder-gray-500 outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Thanh Lọc Theo Danh Mục (Category Chips) */}
        <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-2 pt-1">
          {CATEGORY_TABS.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-party-neonPink to-party-neonPurple text-white shadow-neon-pink'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Thanh Lọc Phạt & Tóm Tắt Kết Quả */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs border-t border-white/5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-gray-400 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Mức phạt:
            </span>
            {PENALTY_FILTERS.map((pen) => {
              const isActive = selectedPenalty === pen.key;
              return (
                <button
                  key={pen.key}
                  onClick={() => setSelectedPenalty(pen.key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    isActive
                      ? 'bg-party-neonCyan/20 border border-party-neonCyan text-party-neonCyan font-bold'
                      : 'bg-white/5 border border-white/5 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {pen.label}
                </button>
              );
            })}
          </div>

          <div className="text-gray-400 flex items-center gap-2">
            <span>
              Hiển thị <strong className="text-party-neonCyan">{filteredCards.length}</strong> / 158 lá
            </span>
            {(searchQuery || selectedCategory !== 'all' || selectedPenalty !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-party-neonPink hover:underline font-semibold ml-1"
              >
                Đặt lại
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid Danh Sách Toàn Bộ Thẻ Bài */}
      <div className="mt-6 flex-1">
        {filteredCards.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Không tìm thấy thẻ bài phù hợp</h3>
            <p className="text-sm text-gray-400 max-w-sm mb-5">
              Không có lá bài nào khớp với từ khóa "{searchQuery}" trong bộ lọc hiện tại.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
            >
              Xóa Bộ Lọc & Tìm Lại
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
            {filteredCards.map((card) => {
              const IconComp = ICON_MAP[card.iconName] || Beer;
              const isCopied = copiedCardId === card.id;

              return (
                <div
                  key={card.id}
                  className="group relative bg-[#181432]/85 hover:bg-[#1f1940] border border-white/10 hover:border-party-neonPink/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-lg hover:shadow-neon-pink/20 hover:-translate-y-0.5"
                >
                  {/* Hàng Trên: Badge Loại Thẻ & Mã Thẻ */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r ${card.badgeColor} shadow-sm`}>
                        <IconComp className="w-3 h-3" />
                        {card.categoryName}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 uppercase">
                          #{card.id}
                        </span>
                        <button
                          onClick={() => handleCopyCard(card)}
                          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition"
                          title="Sao chép nội dung thẻ"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Tiêu Đề Thẻ */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-party-neonCyan transition-colors leading-snug">
                      {card.title}
                    </h3>

                    {/* Nội Dung Thẻ */}
                    <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Hàng Dưới: Hình Phạt & Mức Độ Uống */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-start justify-between gap-2">
                    <div className="flex-1 pr-2">
                      <span className="text-[10px] uppercase font-bold text-red-400 block tracking-wider mb-0.5">
                        Hình Phạt / Thách Thức
                      </span>
                      <p className="text-xs font-medium text-red-300/90 leading-snug">
                        {card.penalty}
                      </p>
                    </div>

                    <div className="shrink-0 text-right flex flex-col items-end gap-1">
                      <span className={`text-[11px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 ${
                        card.drinkCount === 2 
                          ? 'text-red-400 bg-red-400/10 border-red-400/30' 
                          : 'text-amber-300 bg-amber-400/10 border-amber-400/30'
                      }`}>
                        🥃 {card.drinkCount} ly
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {card.drinkCount === 2 ? 'Độ khó: Khó' : 'Độ khó: Vừa'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer nhỏ trang Catalog */}
      <div className="py-4 text-center border-t border-white/10 text-xs text-gray-500">
        Truth or Dare Party • 158 Thẻ Bài Thật Hay Thách Cho Nhóm Bạn
      </div>
    </div>
  );
}
