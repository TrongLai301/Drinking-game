import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

// Singleton AudioContext dùng chung, không khởi tạo mới liên tục để tránh nghẽn CPU trên điện thoại
let sharedAudioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function useAudioFeedback() {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('drunkdeck_muted') === 'true';
  });

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      localStorage.setItem('drunkdeck_muted', String(next));
      return next;
    });
  }, []);

  /**
   * Tạo âm thanh bằng Web Audio API (Siêu nhẹ, dùng chung singleton AudioContext)
   */
  const playSound = useCallback((type = 'flip') => {
    if (isMuted) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === 'flip') {
        // Âm thanh vút nhẹ
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.1);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);

      } else if (type === 'lucky') {
        // Hợp âm ăn mừng nhẹ nhàng (3 nốt thanh thoát)
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const startTime = now + idx * 0.07;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.15, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.25);
        });

      } else if (type === 'shuffle') {
        // Âm xáo bài
        for (let i = 0; i < 3; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          const startTime = now + i * 0.04;
          osc.frequency.setValueAtTime(180 + i * 40, startTime);
          gain.gain.setValueAtTime(0.05, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.035);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.035);
        }

      } else if (type === 'heavy') {
        // Âm cảnh báo phạt
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      console.warn("Audio warning:", e);
    }
  }, [isMuted]);

  /**
   * Kích hoạt rung xúc giác trên điện thoại (Tối ưu 1 nhịp đơn ngắn để không nghẽn luồng UI)
   */
  const triggerVibrate = useCallback((duration = 35) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch (e) {
        // Bỏ qua nếu thiết bị không hỗ trợ
      }
    }
  }, []);

  /**
   * Bắn pháo hoa ăn mừng nhẹ nhàng, tối ưu GPU cho điện thoại
   */
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 35, // Giảm từ 80 xuống 35 để không drop FPS trên màn hình Retina điện thoại
        spread: 60,
        origin: { y: 0.65 },
        scalar: 0.85,
        ticks: 120, // Rơi nhanh hơn và giải phóng bộ nhớ sớm hơn
        colors: ['#FF2E93', '#00F0FF', '#FFB800', '#A855F7', '#10B981'],
        disableForReducedMotion: true
      });
    } catch (e) {
      console.warn("Confetti warning:", e);
    }
  }, []);

  return {
    isMuted,
    toggleMute,
    playSound,
    triggerVibrate,
    triggerConfetti
  };
}
