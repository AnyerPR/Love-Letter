import React from 'react';
import { LetterContent } from '../../types';
import { FileText, Smile, Bold, Italic, Feather, Zap } from 'lucide-react';

interface Step2Props {
  data: LetterContent;
  onChange: (updated: LetterContent) => void;
}

export const Step2LetterContent: React.FC<Step2Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof LetterContent, value: unknown) => {
    onChange({ ...data, [field]: value });
  };

  const insertEmoji = (emoji: string) => {
    onChange({ ...data, text: data.text + emoji });
  };

  const quickEmojis = ['❤️', '💖', '🌹', '✨', '🥰', '😍', '💍', '🥂', '💌', '🌸'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 2: Mensaje Principal (Carta de Amor)
        </h3>
        <p className="text-xs text-rose-200/70">
          Escribe tu carta con libertad. Admite saltos de línea, emojis y formatos.
        </p>
      </div>

      {/* Emoji shortcuts */}
      <div className="flex items-center gap-1.5 flex-wrap bg-slate-900/60 p-2.5 rounded-xl border border-rose-500/20">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
          <Smile className="w-3.5 h-3.5 text-rose-400" /> Insertar:
        </span>
        {quickEmojis.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => insertEmoji(e)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-sm flex items-center justify-center transition-colors"
          >
            {e}
          </button>
        ))}
      </div>

      {/* Main text area */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-rose-400" /> Escribe tu Carta
        </label>
        <textarea
          rows={10}
          value={data.text}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Querida personas favorita..."
          className="w-full bg-slate-900 border border-rose-500/20 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-rose-400 leading-relaxed font-serif-elegant"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Typewriter Speed */}
        <div>
          <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-rose-400" /> Velocidad de Máquina de Escribir
          </label>
          <select
            value={data.typewriterSpeed}
            onChange={(e) => handleChange('typewriterSpeed', e.target.value)}
            className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
          >
            <option value="slow">Lento (Romántico & Pausado)</option>
            <option value="medium">Medio (Recomendado)</option>
            <option value="fast">Rápido</option>
            <option value="instant">Instantáneo (Sin animación)</option>
          </select>
        </div>

        {/* Paper style */}
        <div>
          <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-rose-400" /> Estilo del Papel
          </label>
          <select
            value={data.paperStyle}
            onChange={(e) => handleChange('paperStyle', e.target.value)}
            className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
          >
            <option value="cream">Papel Marfil Tradicional</option>
            <option value="dark-velvet">Terciopelo Oscuro Romántico</option>
            <option value="vintage-parchment">Pergamino Vintage</option>
            <option value="modern-minimal">Blanco Minimalista</option>
          </select>
        </div>
      </div>

      {/* Signature */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-1.5">
          Firma al Final de la Carta
        </label>
        <input
          type="text"
          value={data.signature}
          onChange={(e) => handleChange('signature', e.target.value)}
          placeholder="Ej: Con todo mi amor, Mateo ❤️"
          className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400 font-romantic-script text-lg"
        />
      </div>
    </div>
  );
};
