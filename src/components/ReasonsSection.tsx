import React, { useState } from 'react';
import { Heart, Sparkles, Shuffle, Check, X } from 'lucide-react';
import { ReasonItem, ThemeConfig } from '../types';
import { triggerHeartConfetti } from '../utils/confetti';
import { soundFx } from '../utils/audio';

interface ReasonsSectionProps {
  reasons: ReasonItem[];
  theme: ThemeConfig;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ reasons, theme }) => {
  const [randomModalReason, setRandomModalReason] = useState<ReasonItem | null>(null);

  if (!reasons || reasons.length === 0) return null;

  const handlePickRandom = () => {
    soundFx.playRomanticChime();
    triggerHeartConfetti();
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setRandomModalReason(reasons[randomIndex]);
  };

  return (
    <section id="reasons" className="py-20 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500/40" />
          <span>Razones Infinitas</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white mb-4">
          Razones por las que Te Amo
        </h2>

        {/* Random picker button */}
        <button
          onClick={handlePickRandom}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-sm shadow-xl shadow-rose-600/30 hover:shadow-rose-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Shuffle className="w-4 h-4" />
          <span>Dime una razón al azar</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {reasons.map((item, idx) => (
          <div
            key={item.id}
            className={`group rounded-3xl p-6 ${theme.cardBg} ${theme.cardBorder} border shadow-xl flex flex-col justify-between hover:border-rose-400/60 transition-all duration-300 hover:-translate-y-1`}
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center font-bold text-rose-300 text-sm mb-4">
                #{idx + 1}
              </div>
              <p className="text-rose-100 text-sm sm:text-base leading-relaxed font-serif-elegant">
                "{item.reason}"
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Heart className="w-4 h-4 text-rose-400/60 group-hover:text-rose-400 group-hover:fill-rose-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Random Reason Modal */}
      {randomModalReason && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-8 max-w-lg w-full text-center relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setRandomModalReason(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 font-bold text-xl mb-6 shadow-inner">
              #{reasons.findIndex((r) => r.id === randomModalReason.id) + 1}
            </div>

            <h3 className="text-xl sm:text-2xl font-serif-elegant font-bold text-white mb-4 leading-relaxed">
              "{randomModalReason.reason}"
            </h3>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handlePickRandom}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" /> Otra Razón
              </button>
              <button
                onClick={() => setRandomModalReason(null)}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors"
              >
                Cerrar ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
