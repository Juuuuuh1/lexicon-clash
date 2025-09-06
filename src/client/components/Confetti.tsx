import { useEffect } from 'react';
import confetti from 'canvas-confetti';

type ConfettiProps = {
  trigger: boolean;
  onComplete?: () => void;
};

export function Confetti({ trigger, onComplete }: ConfettiProps) {
  useEffect(() => {
    if (!trigger) return;

    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];

    const frame = () => {
      void confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      void confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else if (onComplete) {
        onComplete();
      }
    };

    frame();
  }, [trigger, onComplete]);

  return null;
}
