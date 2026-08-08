import React, { useState } from 'react';
import { VoucherItem } from '../../types';
import { Gift, Plus, Trash2, Sparkles } from 'lucide-react';

interface Step7Props {
  vouchers: VoucherItem[];
  onChange: (updated: VoucherItem[]) => void;
}

export const Step7Vouchers: React.FC<Step7Props> = ({ vouchers, onChange }) => {
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('🍕');
  const [color, setColor] = useState<string>('from-rose-500 to-pink-600');

  const handleAdd = () => {
    if (!title) return;
    const item: VoucherItem = {
      id: 'v-' + Date.now(),
      title,
      description: desc || 'Válido cuando tú quieras canjearlo ❤️',
      emoji: emoji || '🎁',
      color,
      redeemed: false,
    };
    onChange([...vouchers, item]);
    setTitle('');
    setDesc('');
  };

  const handleDelete = (id: string) => {
    onChange(vouchers.filter((v) => v.id !== id));
  };

  const quickPresets = [
    { title: 'Cena Romántica Hecha en Casa', desc: 'Válido para tu comida favorita preparada con amor.', emoji: '🍕', color: 'from-amber-500 to-rose-600' },
    { title: 'Masaje Relajante de 30 Minutos', desc: 'Con aceites aromáticos y música relajante.', emoji: '💆', color: 'from-pink-500 to-purple-600' },
    { title: 'Noche de Películas & Snacks', desc: 'Tú eliges las películas y las palomitas.', emoji: '🎬', color: 'from-indigo-500 to-blue-600' },
    { title: 'Escapada de Fin de Semana', desc: 'Un viaje corto a un lugar especial juntos.', emoji: '✈️', color: 'from-emerald-500 to-teal-600' },
    { title: 'Desayuno en la Cama', desc: 'Despertar con café caliente y tus panqueques preferidos.', emoji: '☕', color: 'from-orange-400 to-rose-500' },
    { title: 'Sorpresa Incondicional', desc: 'Válido para un regalo o experiencia sorpresa.', emoji: '🎁', color: 'from-purple-500 to-rose-500' },
  ];

  const handleAddPreset = (p: typeof quickPresets[0]) => {
    const item: VoucherItem = {
      id: 'v-' + Date.now() + Math.random(),
      title: p.title,
      description: p.desc,
      emoji: p.emoji,
      color: p.color,
      redeemed: false,
    };
    onChange([...vouchers, item]);
  };

  const colorOptions = [
    { label: 'Rosa & Pasión', class: 'from-rose-500 to-pink-600' },
    { label: 'Dorado & Cálido', class: 'from-amber-500 to-rose-600' },
    { label: 'Lavanda & Místico', class: 'from-purple-500 to-indigo-600' },
    { label: 'Esmeralda & Fresco', class: 'from-emerald-500 to-teal-600' },
    { label: 'Azul Noche', class: 'from-blue-600 to-slate-800' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 7: Vales Románticos Personalizados
        </h3>
        <p className="text-xs text-rose-200/70">
          Crea cupones interactivos que tu pareja podrá "canjear" en la experiencia web.
        </p>
      </div>

      {/* Preset 1-click buttons */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Presets de Vales Populares:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {quickPresets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddPreset(p)}
              className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/20 hover:border-rose-400 text-left transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span className="text-xl">{p.emoji}</span>
              <span className="text-xs font-medium text-white truncate">{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Add form */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-rose-500/20 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="Emoji"
            className="w-16 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-center text-sm text-white focus:outline-none"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del vale (ej: Cena Romántica)"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
        </div>

        <textarea
          rows={2}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Descripción del vale..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-400"
        />

        <div>
          <label className="block text-[11px] text-slate-400 mb-1.5">Color del Vale:</label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {colorOptions.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setColor(c.class)}
                className={`h-7 px-3 rounded-lg bg-gradient-to-r ${c.class} text-[10px] font-semibold text-white shrink-0 border ${
                  color === c.class ? 'border-white scale-105' : 'border-transparent opacity-70'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!title}
          className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar Vale Personalizado
        </button>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-semibold text-rose-200">
          Vales creados ({vouchers.length})
        </label>

        {vouchers.map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-between bg-slate-900/60 p-3.5 rounded-xl border border-slate-800"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl">{v.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{v.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{v.description}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDelete(v.id)}
              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
