import React from 'react';
import { ThemeConfig, ParticleType, FontPairing } from '../../types';
import { THEMES } from '../../data/presets';
import { Palette, Sparkles, Heart, Type } from 'lucide-react';

interface Step10Props {
  theme: ThemeConfig;
  onChange: (updated: ThemeConfig) => void;
}

export const Step10Theme: React.FC<Step10Props> = ({ theme, onChange }) => {
  const handleSelectTheme = (themeId: string) => {
    if (THEMES[themeId]) {
      onChange(THEMES[themeId]);
    }
  };

  const handleParticleChange = (particles: ParticleType) => {
    onChange({ ...theme, particles });
  };

  const handleFontChange = (fontFamily: FontPairing) => {
    onChange({ ...theme, fontFamily });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 10: Personalización Estética & Tema
        </h3>
        <p className="text-xs text-rose-200/70">
          Elige los colores, tipografías y efectos de partículas de tu experiencia romántica.
        </p>
      </div>

      {/* Theme selection */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-2 flex items-center gap-1">
          <Palette className="w-3.5 h-3.5 text-rose-400" /> Paleta de Colores & Tema Principal
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(THEMES).map((t) => {
            const isSelected = theme.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTheme(t.id)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/50 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <span className="text-[10px] text-slate-400 capitalize">
                    Partículas: {t.particles}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${t.bgGradient} border border-white/20 shrink-0`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Particle Effects */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Efectos de Fondo Flotantes
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'hearts', label: '❤️ Corazones' },
            { id: 'sparkles', label: '✨ Destellos' },
            { id: 'petals', label: '🌸 Pétalos' },
            { id: 'glow', label: '💖 Brillos' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleParticleChange(p.id as ParticleType)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-colors ${
                theme.particles === p.id
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-2 flex items-center gap-1">
          <Type className="w-3.5 h-3.5 text-rose-400" /> Estilo de Tipografía
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { id: 'serif-elegant', label: 'Playfair Display (Serif Elegante)', class: 'font-serif-elegant' },
            { id: 'classic-cinzel', label: 'Cinzel (Clásico & Sobrio)', class: 'font-classic-cinzel' },
            { id: 'romantic-script', label: 'Dancing Script (Manuscrito)', class: 'font-romantic-script' },
            { id: 'modern-sans', label: 'Plus Jakarta (Moderno)', class: 'font-modern-sans' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFontChange(f.id as FontPairing)}
              className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                theme.fontFamily === f.id
                  ? 'bg-rose-500/20 border-rose-400 text-white'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={`block font-medium ${f.class}`}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
