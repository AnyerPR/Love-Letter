import React, { useState } from 'react';
import { ReasonItem } from '../../types';
import { Heart, Plus, Trash2, Sparkles } from 'lucide-react';

interface Step9Props {
  reasons: ReasonItem[];
  onChange: (updated: ReasonItem[]) => void;
}

export const Step9Reasons: React.FC<Step9Props> = ({ reasons, onChange }) => {
  const [newReasonText, setNewReasonText] = useState<string>('');

  const handleAdd = () => {
    if (!newReasonText) return;
    const item: ReasonItem = {
      id: 'r-' + Date.now(),
      number: reasons.length + 1,
      reason: newReasonText,
    };
    onChange([...reasons, item]);
    setNewReasonText('');
  };

  const handleDelete = (id: string) => {
    const filtered = reasons.filter((r) => r.id !== id);
    const renumbered = filtered.map((r, i) => ({ ...r, number: i + 1 }));
    onChange(renumbered);
  };

  const sampleReasons = [
    'Por la forma en que tus ojos brillan cuando sonríes de verdad.',
    'Porque tus abrazos hacen que cualquier día difícil desaparezca al instante.',
    'Por cómo cantas en el auto aunque no te sepas bien la letra.',
    'Por tu paciencia infinita y por saber escucharme siempre.',
    'Porque eres mi mejor amiga, mi confidente y el amor de mi vida.',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 9: Razones por las que Te Amo
        </h3>
        <p className="text-xs text-rose-200/70">
          Agrega tantas razones como desees. Aparecerán como tarjetas interactivas.
        </p>
      </div>

      <div className="bg-slate-900/80 p-4 rounded-2xl border border-rose-500/20 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newReasonText}
            onChange={(e) => setNewReasonText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Escribe una razón... (ej: 'Por tu sonrisa sincera cada mañana')"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400 font-serif-elegant"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!newReasonText}
            className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>

        {/* Quick suggestions */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Sugerencias:</span>
          <div className="flex flex-wrap gap-1.5">
            {sampleReasons.map((sr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setNewReasonText(sr)}
                className="text-[10px] bg-slate-950 hover:bg-rose-500/20 text-rose-200 border border-slate-800 rounded-lg px-2.5 py-1 text-left transition-colors truncate max-w-xs"
              >
                + "{sr}"
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        <label className="block text-xs font-semibold text-rose-200 sticky top-0 bg-slate-950/80 backdrop-blur-md py-1">
          Lista de Razones ({reasons.length})
        </label>

        {reasons.map((r, index) => (
          <div
            key={r.id}
            className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0">
                #{index + 1}
              </span>
              <p className="text-xs font-serif-elegant text-white truncate">{r.reason}</p>
            </div>

            <button
              type="button"
              onClick={() => handleDelete(r.id)}
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
