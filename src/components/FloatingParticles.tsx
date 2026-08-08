import React, { useMemo } from 'react';
import { ParticleType } from '../types';

interface FloatingParticlesProps {
  type: ParticleType;
}

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ type }) => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [type]);

  const renderSymbol = (p: Particle) => {
    switch (type) {
      case 'hearts':
        return '❤️';
      case 'sparkles':
        return '✨';
      case 'petals':
        return '🌸';
      case 'glow':
        return '💖';
      default:
        return '❤️';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.4))',
          }}
        >
          {renderSymbol(p)}
        </div>
      ))}
    </div>
  );
};
