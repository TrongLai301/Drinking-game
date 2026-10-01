import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DeckStack from './components/DeckStack';
import SwipeCard from './components/SwipeCard';
import Controls from './components/Controls';
import HistoryModal from './components/HistoryModal';
import CardsCatalog from './components/CardsCatalog';
import { useDrinkingGame } from './hooks/useDrinkingGame';
import { useAudioFeedback } from './hooks/useAudioFeedback';

export default function App() {
  const [currentView, setCurrentView] = useState('game'); // 'game' | 'catalog'
  const {
    remainingCount,
    totalCardsCount,
    drawnCount,
    currentCard,
    isDrawing,
    isDeckEmpty,
    history,
    selectedCategory,
    drawCard,
    reshuffleDeck,
    changeCategory
  } = useDrinkingGame();

  const {
    isMuted,
    toggleMute,
    playSound,
    triggerVibrate,
    triggerConfetti
  } = useAudioFeedback();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Tránh lặp lại hiệu ứng ăn mừng cho cùng 1 lá bài
  const celebratedCardIdRef = useRef(null);

  // Bốc bài tiếp theo (kích hoạt khi: bấm nút BỐC BÀI, hoặc vuốt thẻ sang bên, hoặc chạm trực tiếp vào thẻ)
  const handleNextCard = () => {
    const success = drawCard();
    if (success) {
      playSound('flip');
      triggerVibrate(30);
    }
  };

  // Xáo lại bài
  const handleReshuffle = () => {
    celebratedCardIdRef.current = null;
    reshuffleDeck();
    playSound('shuffle');
    triggerVibrate(40);
  };

  // Hiệu ứng ăn mừng khi trúng lá Kim Bài hoặc Thẻ phạt nặng
  // Trì hoãn 260ms để hoạt ảnh trượt thẻ hoàn tất 60fps mượt mà trước khi nổ pháo hoa
  useEffect(() => {
    if (!currentCard) return;
    if (celebratedCardIdRef.current === currentCard.id) return;

    celebratedCardIdRef.current = currentCard.id;

    if (currentCard.category === 'lucky') {
      const timer = setTimeout(() => {
        playSound('lucky');
        triggerConfetti();
        triggerVibrate(45);
      }, 260);
      return () => clearTimeout(timer);

    } else if (currentCard.drinkCount >= 3) {
      const timer = setTimeout(() => {
        playSound('heavy');
        triggerVibrate(50);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [currentCard, playSound, triggerConfetti, triggerVibrate]);

  if (currentView === 'catalog') {
    return (
      <div className="min-h-screen bg-party-dark flex flex-col items-center p-3 sm:p-6 relative overflow-x-hidden">
        {/* Background Neon Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-party-neonPurple/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-party-neonPink/20 rounded-full blur-[110px] pointer-events-none" />

        <CardsCatalog 
          onBackToGame={() => setCurrentView('game')} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-party-dark flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-party-neonPurple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-party-neonPink/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Header với Logo, Counter, Nút Loa, QR Phone và Mode Selector */}
      <Header
        remainingCount={remainingCount}
        totalCardsCount={totalCardsCount}
        selectedCategory={selectedCategory}
        onSelectCategory={changeCategory}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenCatalog={() => setCurrentView('catalog')}
      />

      {/* Khu vực thẻ bài trung tâm với DeckStack và SwipeCard (kéo/chạm để ra thẻ mới) */}
      <main className="my-auto py-3 z-10 w-full flex flex-col items-center justify-center">
        <DeckStack remainingCount={remainingCount}>
          <SwipeCard
            card={currentCard}
            onNext={handleNextCard}
            isDeckEmpty={isDeckEmpty}
            remainingCount={remainingCount}
            totalCardsCount={totalCardsCount}
          />
        </DeckStack>
      </main>

      {/* Thanh điều khiển dưới cùng Thumb-friendly */}
      <footer className="w-full max-w-md flex flex-col items-center pb-2 z-10">
        <Controls
          onDraw={handleNextCard}
          onReshuffle={handleReshuffle}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenCatalog={() => setCurrentView('catalog')}
          isDeckEmpty={isDeckEmpty}
          isDrawing={isDrawing}
          drawnCount={drawnCount}
          totalCount={totalCardsCount}
        />
      </footer>

      {/* Drawer lịch sử các lá bài đã bốc */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
      />
    </div>
  );
}
