import React, { useState } from 'react';
import { Heart, Sparkles, Mail, Lock, Key, ArrowDown } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { soundFx } from '../utils/audio';

interface MagicEnvelopeProps {
  partnerName: string;
  creatorName: string;
  onOpen: () => void;
}

export const MagicEnvelope: React.FC<MagicEnvelopeProps> = ({
  partnerName,
  creatorName,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play chime sound & burst heart confetti
    soundFx.playRomanticChime();
    triggerHeartConfetti();

    // After animation finishes, signal parent component to open full letter
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 px-4 overflow-hidden select-none">
      {/* Background ambient lighting glows */}
      <div className="absolute w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-pink-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Main container */}
      <div className="relative z-10 max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Header romantic tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-rose-500/10 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span>Tienes una Carta Especial</span>
        </div>

        {/* Alive breathing envelope container */}
        <div
          onClick={handleEnvelopeClick}
          className={`group relative w-full max-w-sm aspect-[4/3] cursor-pointer transition-all duration-700 transform ${
            isOpening
              ? 'scale-110 opacity-90'
              : 'hover:scale-105 active:scale-95 animate-float'
          }`}
          title="Toca para abrir la carta"
        >
          {/* Subtle heartbeat / glowing pulse aura beneath */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-500/30 via-pink-500/30 to-purple-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />

          {/* Envelope Body */}
          <div className="relative w-full h-full bg-gradient-to-br from-rose-900/90 via-slate-900 to-rose-950 border-2 border-rose-400/40 rounded-3xl shadow-2xl flex flex-col items-center justify-between p-6 overflow-hidden">
            
            {/* Top Envelope Flap visual decoration */}
            <div
              className={`absolute top-0 left-0 right-0 h-24 bg-rose-900/60 border-b border-rose-400/30 origin-top transition-transform duration-700 ease-in-out ${
                isOpening ? '-rotate-x-180 opacity-20' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Recipient Ribbon / Badge */}
            <div className="relative z-10 mt-6 bg-slate-950/80 border border-rose-400/30 rounded-2xl px-5 py-2.5 shadow-md flex items-center gap-2 backdrop-blur-md">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-400 animate-bounce" />
              <div className="text-left">
                <span className="text-[10px] text-rose-300/70 block uppercase tracking-wider">Para:</span>
                <span className="text-sm font-serif-elegant font-bold text-white tracking-wide">
                  {partnerName || 'Mi Gran Amor'}
                </span>
              </div>
            </div>

            {/* Center Wax Seal / Heart Icon with alive pulse */}
            <div className="relative z-10 my-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 p-0.5 shadow-xl shadow-rose-600/40 border-2 border-rose-200/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-full bg-rose-800 flex items-center justify-center border border-white/20">
                  <Heart className="w-8 h-8 fill-rose-300 text-rose-100 animate-pulse" />
                </div>
              </div>
              <span className="mt-2 text-[11px] font-medium text-rose-200/90 tracking-wide">
                {isOpening ? '¡Abriendo carta!' : 'Sello de Amor'}
              </span>
            </div>

            {/* Bottom Signature */}
            <div className="relative z-10 text-xs text-rose-300/80 font-serif-elegant">
              {creatorName ? `De parte de: ${creatorName}` : 'Con todo mi amor'}
            </div>
          </div>
        </div>

        {/* Instructions button below */}
        <div className="mt-8 flex flex-col items-center gap-2 animate-bounce">
          <button
            onClick={handleEnvelopeClick}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs tracking-wider uppercase shadow-xl shadow-rose-500/30 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Haz clic para abrir tu regalo</span>
            <ArrowDown className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-rose-200/60 font-medium">
            Una experiencia romántica e inolvidable te espera adentro
          </span>
        </div>

      </div>
    </div>
  );
};
