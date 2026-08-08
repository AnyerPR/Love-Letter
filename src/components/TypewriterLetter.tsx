import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Stamp, Heart, Feather } from 'lucide-react';
import { LetterContent, ThemeConfig } from '../types';
import { soundFx } from '../utils/audio';

interface TypewriterLetterProps {
  letter: LetterContent;
  partnerName: string;
  theme: ThemeConfig;
}

export const TypewriterLetter: React.FC<TypewriterLetterProps> = ({ letter, partnerName, theme }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const currentIndexRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getSpeedDelay = () => {
    switch (letter.typewriterSpeed) {
      case 'slow':
        return 70;
      case 'medium':
        return 35;
      case 'fast':
        return 15;
      case 'instant':
        return 0;
      default:
        return 35;
    }
  };

  useEffect(() => {
    // Reset and start typing
    setDisplayedText('');
    currentIndexRef.current = 0;
    setIsTyping(true);

    if (letter.typewriterSpeed === 'instant') {
      setDisplayedText(letter.text);
      setIsTyping(false);
      return;
    }

    const typeNextChar = () => {
      if (currentIndexRef.current < letter.text.length) {
        const nextChar = letter.text[currentIndexRef.current];
        setDisplayedText((prev) => prev + nextChar);
        currentIndexRef.current += 1;

        if (soundEnabled && nextChar !== ' ' && nextChar !== '\n') {
          soundFx.playTypewriterClick();
        }

        timerRef.current = setTimeout(typeNextChar, getSpeedDelay());
      } else {
        setIsTyping(false);
      }
    };

    timerRef.current = setTimeout(typeNextChar, getSpeedDelay());

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [letter.text, letter.typewriterSpeed, soundEnabled]);

  const handleRestart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayedText('');
    currentIndexRef.current = 0;
    setIsTyping(true);

    if (letter.typewriterSpeed === 'instant') {
      setDisplayedText(letter.text);
      setIsTyping(false);
      return;
    }

    const typeNextChar = () => {
      if (currentIndexRef.current < letter.text.length) {
        const nextChar = letter.text[currentIndexRef.current];
        setDisplayedText((prev) => prev + nextChar);
        currentIndexRef.current += 1;

        if (soundEnabled && nextChar !== ' ' && nextChar !== '\n') {
          soundFx.playTypewriterClick();
        }

        timerRef.current = setTimeout(typeNextChar, getSpeedDelay());
      } else {
        setIsTyping(false);
      }
    };

    timerRef.current = setTimeout(typeNextChar, getSpeedDelay());
  };

  const handleTogglePause = () => {
    if (isTyping) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsTyping(false);
    } else {
      if (currentIndexRef.current >= letter.text.length) return;
      setIsTyping(true);
      const typeNextChar = () => {
        if (currentIndexRef.current < letter.text.length) {
          const nextChar = letter.text[currentIndexRef.current];
          setDisplayedText((prev) => prev + nextChar);
          currentIndexRef.current += 1;
          timerRef.current = setTimeout(typeNextChar, getSpeedDelay());
        } else {
          setIsTyping(false);
        }
      };
      timerRef.current = setTimeout(typeNextChar, getSpeedDelay());
    }
  };

  const paperStyles = {
    cream: 'bg-amber-50/95 text-slate-900 border-amber-200/50 shadow-2xl shadow-amber-950/40',
    'dark-velvet': 'bg-slate-900/90 text-rose-50 border-rose-500/30 shadow-2xl shadow-rose-950/60',
    'vintage-parchment': 'bg-stone-100 text-stone-900 border-stone-300 shadow-2xl shadow-stone-950/50',
    'modern-minimal': 'bg-white/90 text-slate-900 border-slate-200 shadow-xl',
  };

  const currentPaperClass = paperStyles[letter.paperStyle || 'cream'];

  return (
    <section id="letter" className="py-20 relative z-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Feather className="w-4 h-4 text-rose-400" />
          <span>Mi Carta para Ti</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white">
          Palabras nacidas del corazón
        </h2>
      </div>

      {/* Control bar */}
      <div className="flex items-center justify-between mb-4 bg-slate-950/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-rose-500/20 text-xs text-rose-200">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePause}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors"
          >
            {isTyping ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Continuar
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reiniciar escritura"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Recomenzar
          </button>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors ${
            soundEnabled
              ? 'bg-rose-500/30 text-rose-300 border border-rose-400/30'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Sonido Teclas</span>
        </button>
      </div>

      {/* Letter Paper Container */}
      <div className={`relative rounded-3xl p-8 sm:p-14 border backdrop-blur-md transition-all ${currentPaperClass}`}>
        {/* Wax Seal Badge */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-rose-800 shadow-lg flex items-center justify-center text-rose-100 border-2 border-amber-300/40 transform rotate-12 select-none">
          <Heart className="w-6 h-6 fill-rose-200 text-red-900" />
        </div>

        {/* Letter body with typewriter text */}
        <div className="whitespace-pre-wrap font-serif-elegant text-base sm:text-xl leading-relaxed sm:leading-loose tracking-wide">
          {displayedText}
          {isTyping && (
            <span className="inline-block w-2 h-5 ml-1 bg-rose-500 animate-pulse align-middle" />
          )}
        </div>

        {/* Signature */}
        {letter.signature && (
          <div className="mt-12 text-right pt-6 border-t border-rose-900/10">
            <p className="font-romantic-script text-2xl sm:text-4xl text-rose-800 font-bold">
              {letter.signature}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
