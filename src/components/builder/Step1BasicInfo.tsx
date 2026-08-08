import React from 'react';
import { BasicInfo } from '../../types';
import { Heart, User, Calendar, Type, Image as ImageIcon } from 'lucide-react';

interface Step1Props {
  data: BasicInfo;
  onChange: (updated: BasicInfo) => void;
}

export const Step1BasicInfo: React.FC<Step1Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof BasicInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const coverPresets = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 1: Información Básica
        </h3>
        <p className="text-xs text-rose-200/70">
          Personaliza los nombres, fecha especial y título principal de la carta.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-rose-400" /> Nombre del Creador / Tu nombre
          </label>
          <input
            type="text"
            value={data.creatorName}
            onChange={(e) => handleChange('creatorName', e.target.value)}
            placeholder="Ej: Mateo"
            className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" /> Nombre de tu Pareja
          </label>
          <input
            type="text"
            value={data.partnerName}
            onChange={(e) => handleChange('partnerName', e.target.value)}
            placeholder="Ej: Sofía"
            className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-rose-400" /> Fecha del inicio de la relación
        </label>
        <input
          type="datetime-local"
          value={data.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Esta fecha alimentará el contador de tiempo en vivo en años, meses, días, horas y segundos.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-rose-400" /> Título de la Carta
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ej: Nuestra Historia de Amor"
          className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
          Subtítulo o Dedicatoria Corta
        </label>
        <input
          type="text"
          value={data.subtitle}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          placeholder="Ej: Un espacio digital dedicado a mi lugar favorito en el mundo ❤️"
          className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-rose-400" /> Imagen de Portada (URL o Preset)
        </label>
        <input
          type="text"
          value={data.coverImage}
          onChange={(e) => handleChange('coverImage', e.target.value)}
          placeholder="https://..."
          className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400 mb-3"
        />

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs text-slate-400 shrink-0">Presets:</span>
          {coverPresets.map((imgUrl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleChange('coverImage', imgUrl)}
              className="w-12 h-10 rounded-lg overflow-hidden border border-rose-500/30 shrink-0 hover:scale-105 transition-transform"
            >
              <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
