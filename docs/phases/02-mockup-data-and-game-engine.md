# 🎲 Phase 02: Mockup Data & Game Engine

Mục tiêu của Phase này là xây dựng bộ mockup data hoàn chỉnh gồm **50 lá bài Drinking Game tiếng Việt** cực vui, đa dạng và viết custom hook `useDrinkingGame.js` để xử lý logic **rút ngẫu nhiên không lặp lại** (Draw without replacement).

---

## 1. File Mockup Data (`src/data/cardsData.js`)

Tạo file `src/data/cardsData.js` chứa danh sách 50 lá bài được phân loại theo 5 nhóm:
- 🔥 **dare** (Thách thức): 15 lá
- 💬 **truth** (Thật thà): 12 lá
- 📜 **rule** (Luật nhóm): 10 lá
- 👥 **all** (Tất cả cùng chơi): 8 lá
- 👑 **lucky** (Kim bài đặc quyền): 5 lá

```javascript
export const DRINKING_CARDS = [
  // --- NHÓM THÁCH THỨC (DARE) ---
  {
    id: "card_d01",
    category: "dare",
    categoryName: "Thách Thức",
    badgeColor: "from-rose-500 to-red-600",
    iconName: "Flame",
    title: "Cuộc Gọi Định Mệnh",
    description: "Mở danh bạ điện thoại, cho người bên phải chọn 1 người bất kỳ. Bạn phải gọi và nói 'Alo em/anh đây, nãy giờ em/anh nhớ anh/em quá' rồi cúp máy.",
    penalty: "Từ chối: Uống 3 ngụm lớn!",
    drinkCount: 3
  },
  {
    id: "card_d02",
    category: "dare",
    categoryName: "Thách Thức",
    badgeColor: "from-rose-500 to-red-600",
    iconName: "Flame",
    title: "Kể Tên 5 Người Yêu Cũ",
    description: "Kể tên thật của 5 người bạn từng thích hoặc từng hẹn hò trong vòng 10 giây.",
    penalty: "Không kịp hoặc từ chối: Uống 2 ly!",
    drinkCount: 2
  },
  {
    id: "card_d03",
    category: "dare",
    categoryName: "Thách Thức",
    badgeColor: "from-rose-500 to-red-600",
    iconName: "Flame",
    title: "Người Giữ Điện Thoại",
    description: "Đưa điện thoại đã mở khóa cho người đối diện xem 3 bức ảnh gần nhất trong album ảnh.",
    penalty: "Không cho xem: Cạn ly!",
    drinkCount: 1
  },
  {
    id: "card_d04",
    category: "dare",
    categoryName: "Thách Thức",
    badgeColor: "from-rose-500 to-red-600",
    iconName: "Flame",
    title: "Tỏ Tình Đảo Ngược",
    description: "Nắm tay người ngồi bên trái và khen người đó 3 điểm quyến rũ nhất với ánh mắt chân thành.",
    penalty: "Không làm: Uống 2 ngụm",
    drinkCount: 2
  },
  {
    id: "card_d05",
    category: "dare",
    categoryName: "Thách Thức",
    badgeColor: "from-rose-500 to-red-600",
    iconName: "Flame",
    title: "Hát 1 Điệp Khúc",
    description: "Hát to điệp khúc một bài hát thiếu nhi bằng chất giọng trầm ấm hoặc opera.",
    penalty: "Không hát: Uống 1 ly",
    drinkCount: 1
  },
  {
    id: "card_d06",
    category: "dare",
    categoryName: "Thách Thức",
    badgeColor: "from-rose-500 to-red-600",
    iconName: "Flame",
    title: "Thử Thách Nhìn Chăm Chú",
    description: "Thi nhìn vào mắt người đối diện trong 30 giây không được chớp mắt hoặc cười.",
    penalty: "Ai cười/chớp mắt trước: Uống 2 ngụm",
    drinkCount: 2
  },

  // --- NHÓM THẬT THÀ (TRUTH) ---
  {
    id: "card_t01",
    category: "truth",
    categoryName: "Thật Thà",
    badgeColor: "from-cyan-500 to-blue-600",
    iconName: "HelpCircle",
    title: "Bí Mật Bất Đắc Dĩ",
    description: "Kể lại một lần 'nói dối' mà bạn cảm thấy có lỗi nhất từ trước đến nay.",
    penalty: "Không trả lời: Uống 2 ly!",
    drinkCount: 2
  },
  {
    id: "card_t02",
    category: "truth",
    categoryName: "Thật Thà",
    badgeColor: "from-cyan-500 to-blue-600",
    iconName: "HelpCircle",
    title: "Ai Đẹp Nhất Bàn?",
    description: "Chỉ tay thẳng vào người bạn thấy thu hút nhất trong bàn tiệc hôm nay và giải thích lý do.",
    penalty: "Ngại không nói: Tự giác uống 2 ngụm",
    drinkCount: 2
  },
  {
    id: "card_t03",
    category: "truth",
    categoryName: "Thật Thà",
    badgeColor: "from-cyan-500 to-blue-600",
    iconName: "HelpCircle",
    title: "Kỷ Niệm Say Quắc Cần Câu",
    description: "Lần say rượu bết bát nhất trong đời của bạn diễn ra như thế nào? Đã làm hành động ngớ ngẩn gì?",
    penalty: "Giấu giếm: Uống 3 ngụm",
    drinkCount: 3
  },
  {
    id: "card_t04",
    category: "truth",
    categoryName: "Thật Thà",
    badgeColor: "from-cyan-500 to-blue-600",
    iconName: "HelpCircle",
    title: "Mối Tình Đầu Tiên",
    description: "Mối tình đầu của bạn bắt đầu vào năm bao nhiêu tuổi và kéo dài trong bao lâu?",
    penalty: "Từ chối: Uống 1 ly",
    drinkCount: 1
  },

  // --- NHÓM LUẬT NHÓM (RULE) ---
  {
    id: "card_r01",
    category: "rule",
    categoryName: "Luật Nhóm",
    badgeColor: "from-purple-500 to-indigo-600",
    iconName: "ShieldAlert",
    title: "Lệnh Cấm Xưng Hô",
    description: "Từ bây giờ, tất cả mọi người không được gọi tên nhau hoặc xưng 'mày/tao'. Phải xưng 'Đại vương' và 'Thần'. Ai vi phạm uống ngay 1 ngụm.",
    penalty: "Áp dụng toàn bàn đến khi có Luật mới",
    drinkCount: 1
  },
  {
    id: "card_r02",
    category: "rule",
    categoryName: "Luật Nhóm",
    badgeColor: "from-purple-500 to-indigo-600",
    iconName: "ShieldAlert",
    title: "Cấm Chạm Vào Điện Thoại",
    description: "Tất cả điện thoại phải úp mặt xuống bàn. Bất cứ ai chạm vào điện thoại từ giờ phút này sẽ phải uống 1 ly đầy!",
    penalty: "Áp dụng toàn bàn",
    drinkCount: 1
  },
  {
    id: "card_r03",
    category: "rule",
    categoryName: "Luật Nhóm",
    badgeColor: "from-purple-500 to-indigo-600",
    iconName: "ShieldAlert",
    title: "Uống Kèm Cạ Cứng",
    description: "Chỉ định một người trong bàn làm 'Cạ Cứng'. Từ giờ hễ bạn bị phạt uống thì người đó cũng phải uống cùng 1 lượng tương đương!",
    penalty: "Hiệu lực suốt ván đấu",
    drinkCount: 1
  },
  {
    id: "card_r04",
    category: "rule",
    categoryName: "Luật Nhóm",
    badgeColor: "from-purple-500 to-indigo-600",
    iconName: "ShieldAlert",
    title: "Uống Bằng Tay Trái",
    description: "Mọi người chỉ được cầm ly bằng tay không thuận (tay trái). Cầm bằng tay phải bị bắt quả tang là phạt 1 ngụm.",
    penalty: "Bắt quả tang phạt ngay",
    drinkCount: 1
  },

  // --- NHÓM TẤT CẢ CÙNG CHƠI (ALL / MINI-GAME) ---
  {
    id: "card_a01",
    category: "all",
    categoryName: "Tất Cả Cùng Chơi",
    badgeColor: "from-amber-500 to-orange-600",
    iconName: "Users",
    title: "Nối Từ Thần Tốc",
    description: "Người bốc đưa ra 1 từ có 2 tiếng (VD: 'Bàn bạc'). Theo chiều kim đồng hồ, mỗi người có 3 giây để nối tiếp. Ai ngập ngừng hoặc lặp từ là thua.",
    penalty: "Người thua: Uống 2 ly",
    drinkCount: 2
  },
  {
    id: "card_a02",
    category: "all",
    categoryName: "Tất Cả Cùng Chơi",
    badgeColor: "from-amber-500 to-orange-600",
    iconName: "Users",
    title: "Tôi Chưa Bao Giờ...",
    description: "Người bốc nói một điều mình CHƯA TỪNG LÀM trong đời. Ai trong bàn ĐÃ TỪNG LÀM điều đó thì phải nâng ly uống!",
    penalty: "Ai từng làm thì uống 1 ngụm",
    drinkCount: 1
  },
  {
    id: "card_a03",
    category: "all",
    categoryName: "Tất Cả Cùng Chơi",
    badgeColor: "from-amber-500 to-orange-600",
    iconName: "Users",
    title: "Bầu Chọn Thủ Phạm",
    description: "Đếm '1, 2, 3', tất cả đồng thời chỉ tay vào người 'Nhiều khả năng ế lâu năm nhất' trong hội. Người nhận nhiều ngón tay nhất phải uống!",
    penalty: "Người bị chỉ nhiều nhất: Uống 2 ly",
    drinkCount: 2
  },
  {
    id: "card_a04",
    category: "all",
    categoryName: "Tất Cả Cùng Chơi",
    badgeColor: "from-amber-500 to-orange-600",
    iconName: "Users",
    title: "Cùng Nâng Ly!",
    description: "Tất cả mọi người trong bàn cùng nâng ly chúc mừng một buổi tối tuyệt vời và uống cạn 1 ngụm!",
    penalty: "Cả bàn cùng uống!",
    drinkCount: 1
  },

  // --- NHÓM KIM BÀI ĐẶC QUYỀN (LUCKY) ---
  {
    id: "card_l01",
    category: "lucky",
    categoryName: "Kim Bài Miễn Tử",
    badgeColor: "from-emerald-400 to-teal-500",
    iconName: "Crown",
    title: "Miễn Tử Kim Bài",
    description: "Giữ lá bài này. Bạn có quyền từ chối 1 hình phạt uống bất kỳ trong suốt ván chơi hôm nay.",
    penalty: "Sử dụng 1 lần duy nhất",
    drinkCount: 0
  },
  {
    id: "card_l02",
    category: "lucky",
    categoryName: "Kim Bài Miễn Tử",
    badgeColor: "from-emerald-400 to-teal-500",
    iconName: "Crown",
    title: "Chuyển Giao Quyền Lực",
    description: "Khi bạn bị phạt uống, bạn có quyền chuyển toàn bộ lượng đồ uống đó cho 1 người bất kỳ trong bàn chịu thay.",
    penalty: "Sử dụng 1 lần duy nhất",
    drinkCount: 0
  },
  {
    id: "card_l03",
    category: "lucky",
    categoryName: "Kim Bài Miễn Tử",
    badgeColor: "from-emerald-400 to-teal-500",
    iconName: "Crown",
    title: "Thẩm Phán Tối Cao",
    description: "Bạn có quyền ép 2 người bất kỳ trong bàn oẳn tù tì, người thua phải uống 2 ly!",
    penalty: "Thực hiện ngay lập tức",
    drinkCount: 0
  }
];
```

---

## 2. Custom Hook Xử Lý Bốc Bài (`src/hooks/useDrinkingGame.js`)

Tạo file `src/hooks/useDrinkingGame.js` thực hiện thuật toán **Draw without replacement**:

```javascript
import { useState, useCallback, useMemo } from 'react';
import { DRINKING_CARDS } from '../data/cardsData';

export function useDrinkingGame() {
  // Kho bài còn lại chưa bốc
  const [remainingCards, setRemainingCards] = useState(() => [...DRINKING_CARDS]);
  
  // Lá bài đang hiển thị hiện tại
  const [currentCard, setCurrentCard] = useState(null);
  
  // Trạng thái lật của thẻ bài (true = mặt trước, false = mặt úp)
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Lịch sử các lá bài đã bốc
  const [history, setHistory] = useState([]);
  
  // Trạng thái animation đang bốc (tránh bấm liên tục nhiều lần)
  const [isDrawing, setIsDrawing] = useState(false);

  // Tổng số lượng bài ban đầu
  const totalCardsCount = useMemo(() => DRINKING_CARDS.length, []);
  
  // Số bài đã bốc
  const drawnCount = useMemo(() => history.length, [history]);

  // Kiểm tra xem đã hết bài chưa
  const isDeckEmpty = remainingCards.length === 0;

  /**
   * Bốc 1 lá bài ngẫu nhiên trong số các lá CHƯA BỐC
   */
  const drawCard = useCallback(() => {
    if (isDrawing || remainingCards.length === 0) return null;

    setIsDrawing(true);
    
    // Nếu thẻ đang lật, ta úp lại trước một chút rồi mới lật lá mới
    if (isFlipped) {
      setIsFlipped(false);
    }

    setTimeout(() => {
      // Chọn 1 index ngẫu nhiên trong danh sách còn lại
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      const picked = remainingCards[randomIndex];

      // Loại bỏ lá đã rút khỏi remainingCards
      const nextRemaining = [...remainingCards];
      nextRemaining.splice(randomIndex, 1);

      setRemainingCards(nextRemaining);
      setCurrentCard(picked);
      setHistory(prev => [picked, ...prev]);
      
      // Kích hoạt lật thẻ bài
      setIsFlipped(true);
      setIsDrawing(false);
    }, isFlipped ? 300 : 50);

  }, [isDrawing, remainingCards, isFlipped]);

  /**
   * Lật qua lại giữa mặt trước và mặt sau thẻ bài hiện tại
   */
  const toggleFlip = useCallback(() => {
    if (currentCard && !isDrawing) {
      setIsFlipped(prev => !prev);
    }
  }, [currentCard, isDrawing]);

  /**
   * Xáo lại toàn bộ bộ bài về trạng thái ban đầu
   */
  const reshuffleDeck = useCallback(() => {
    setIsFlipped(false);
    setIsDrawing(false);
    setCurrentCard(null);
    setRemainingCards([...DRINKING_CARDS]);
    setHistory([]);
  }, []);

  return {
    remainingCards,
    remainingCount: remainingCards.length,
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
  };
}
```

---

## 3. Tiêu Chí Kiểm Tra (Checklist Hoàn Thành Phase 02)
- [ ] Dữ liệu `cardsData.js` chứa đủ danh mục và các thuộc tính: `id`, `category`, `title`, `description`, `penalty`, `drinkCount`.
- [ ] `useDrinkingGame` mỗi lần gọi `drawCard()` sẽ giảm `remainingCount` đi đúng 1 đơn vị.
- [ ] Khi rút hết 50 lá, `isDeckEmpty` chuyển sang `true` và `reshuffleDeck()` hồi phục lại đủ 50 lá.
- [ ] Sẵn sàng chuyển tiếp sang [Phase 03: Mobile-First UI & Hiệu Ứng Thẻ Bài 3D](file:///c:/Users/trong/Downloads/Code/phases/03-mobile-ui-and-card-3d.md).
