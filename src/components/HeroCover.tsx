import React from 'react';
import { Heart, Sparkles, ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import { BasicInfo, ThemeConfig } from '../types';
import { soundFx } from '../utils/audio';

interface HeroCoverProps {
  basicInfo: BasicInfo;
  theme: ThemeConfig;
  onStartStory: () => void;
}

export const HeroCover: React.FC<HeroCoverProps> = ({ basicInfo, theme, onStartStory }) => {
  const handleStart = () => {
    soundFx.playRomanticChime();
    onStartStory();
  };

  const formatDate = (isoStr: string) => {
    if (!isoStr) return '';
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <section id="cover" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-12">
      {/* Background Hero Wallpaper Image */}
      {basicInfo.coverImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${basicInfo.coverImage})` }}
        >
          <div className={`absolute inset-0 ${theme.heroOverlay}`} />
        </div>
      )}

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-300/30 backdrop-blur-md mb-8 shadow-lg shadow-rose-950/40 animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-rose-300" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-rose-100 uppercase">
            Una experiencia romántica para ti
          </span>
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 ml-1" />
        </div>

        {/* Couple Names */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-elegant font-bold text-white tracking-tight drop-shadow-md mb-6 leading-tight">
          {basicInfo.partnerName || 'Mi Amor'}
          <span className="block text-2xl sm:text-4xl text-rose-300 font-normal italic font-romantic-script mt-2">
            & {basicInfo.creatorName || 'Tu Persona Especial'}
          </span>
        </h1>

        {/* Title & Subtitle */}
        <p className="text-xl sm:text-2xl text-rose-100 font-serif-elegant font-light mb-4 max-w-2xl mx-auto leading-relaxed">
          {basicInfo.title || 'Nuestra Historia de Amor'}
        </p>

        {basicInfo.subtitle && (
          <p className="text-sm sm:text-base text-rose-200/80 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            "{basicInfo.subtitle}"
          </p>
        )}

        {/* Date badge */}
        {basicInfo.startDate && (
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-rose-200/70 mb-10 px-4 py-1.5 rounded-full bg-slate-900/40 border border-white/10">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>Juntos desde el {formatDate(basicInfo.startDate)}</span>
          </div>
        )}

        {/* CTA Button: Comenzar nuestra historia */}
        <div>
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-lg shadow-2xl shadow-rose-600/40 hover:shadow-rose-500/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10">Comenzar nuestra historia</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-rose-300/60 animate-bounce">
          <span className="text-xs font-light tracking-widest uppercase">Desliza para descubrir</span>
          <ChevronDown className="w-5 h-5 text-rose-400" />
        </div>
      </div>
    </section>
  );
};
