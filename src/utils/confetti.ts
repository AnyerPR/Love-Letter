import confetti from 'canvas-confetti';

export function triggerHeartConfetti() {
  const count = 60;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fbbf24'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function triggerCelebrationBurst() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700'],
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700'],
    });
  }, 250);
}
