import { useState, useCallback, useMemo } from 'react';
import { DRINKING_CARDS } from '../data/cardsData';

export function useDrinkingGame() {
  // Bộ bài đang hoạt động theo bộ lọc (mặc định là toàn bộ 50 lá)
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Lọc danh sách bài theo category đã chọn
  const baseCards = useMemo(() => {
    if (selectedCategory === 'all') return DRINKING_CARDS;
    return DRINKING_CARDS.filter(card => card.category === selectedCategory);
  }, [selectedCategory]);

  // Danh sách các lá bài CHƯA BỐC (Draw pool)
  const [remainingCards, setRemainingCards] = useState(() => [...DRINKING_CARDS]);

  // Lá bài hiện tại đang hiển thị (null khi mới vào)
  const [currentCard, setCurrentCard] = useState(null);

  // Lịch sử các lá đã bốc trong ván
  const [history, setHistory] = useState([]);

  // Khóa chống spam click liên tục
  const [isDrawing, setIsDrawing] = useState(false);

  // Tổng số lượng lá bài trong bộ hiện tại
  const totalCardsCount = useMemo(() => baseCards.length, [baseCards]);

  // Số lượng lá đã bốc
  const drawnCount = useMemo(() => history.length, [history]);

  // Số lượng lá còn lại trong kho
  const remainingCount = remainingCards.length;

  // Cờ báo hiệu đã rút hết bài
  const isDeckEmpty = remainingCards.length === 0;

  /**
   * Bốc 1 lá bài ngẫu nhiên trong số các lá CHƯA BỐC (Draw without replacement)
   */
  const drawCard = useCallback(() => {
    if (isDrawing) return null;
    if (remainingCards.length === 0) return null;

    setIsDrawing(true);

    // Chọn 1 index ngẫu nhiên trong danh sách còn lại
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const pickedCard = remainingCards[randomIndex];

    // Loại bỏ lá bài vừa bốc ra khỏi remainingCards
    const nextRemaining = [...remainingCards];
    nextRemaining.splice(randomIndex, 1);

    setRemainingCards(nextRemaining);
    setCurrentCard(pickedCard);
    setHistory(prev => [pickedCard, ...prev]);

    // Mở khóa sau khi animation bắt đầu
    setTimeout(() => {
      setIsDrawing(false);
    }, 280);

    return true;
  }, [isDrawing, remainingCards]);

  /**
   * Xáo lại bài (Reset toàn bộ kho bài về đầy đủ)
   */
  const reshuffleDeck = useCallback(() => {
    setIsDrawing(false);
    setCurrentCard(null);
    setRemainingCards([...baseCards]);
    setHistory([]);
  }, [baseCards]);

  /**
   * Thay đổi bộ lọc danh mục bài (Tất cả, Thách thức, Thật thà, Luật nhóm, ...)
   */
  const changeCategory = useCallback((categoryKey) => {
    setSelectedCategory(categoryKey);
    const newBase = categoryKey === 'all' 
      ? DRINKING_CARDS 
      : DRINKING_CARDS.filter(c => c.category === categoryKey);
    
    setIsDrawing(false);
    setCurrentCard(null);
    setRemainingCards([...newBase]);
    setHistory([]);
  }, []);

  return {
    remainingCards,
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
  };
}
