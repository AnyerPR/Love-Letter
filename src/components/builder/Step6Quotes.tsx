import React, { useState } from 'react';
import { QuoteItem } from '../../types';
import { Quote, Plus, Trash2 } from 'lucide-react';

interface Step6Props {
  quotes: QuoteItem[];
  onChange: (updated: QuoteItem[]) => void;
}

export const Step6Quotes: React.FC<Step6Props> = ({ quotes, onChange }) => {
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleAdd = () => {
    if (!text) return;
    const item: QuoteItem = {
      id: 'q-' + Date.now(),
      quote: text,
      author,
      category,
    };
    onChange([...quotes, item]);
    setText('');
    setAuthor('');
    setCategory('');
  };

  const handleDelete = (id: string) => {
    onChange(quotes.filter((q) => q.id !== id));
  };

  const sampleQuotes = [
    'Eres mi lugar favorito cuando el mundo se vuelve ruidoso.',
    'Gracias por hacerme sonreír incluso en los días difíciles.',
    'Te elegiría a ti en cien vidas y en cualquier versión de la realidad.',
    'En tus ojos encontré el hogar que siempre busqué.',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 6: Frases Importantes
        </h3>
        <p className="text-xs text-rose-200/70">
          Agrega frases especiales, chistes locales o pensamientos románticos ilimitados.
        </p>
      </div>

      <div className="bg-slate-900/80 p-4 rounded-2xl border border-rose-500/20 space-y-3">
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu frase especial aquí... (ej: 'Eres mi lugar favorito.')"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-400 font-serif-elegant"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor opcional (ej: Tu chico favorito)"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoría opcional (ej: Refugio, Complicidad)"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!text}
          className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar Frase
        </button>
      </div>

      {/* Quick suggestions */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-1.5">
          Sugerencias Rápidas:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {sampleQuotes.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setText(sq)}
              className="text-[11px] bg-slate-900 hover:bg-rose-500/20 text-rose-200 border border-slate-800 rounded-lg px-2.5 py-1 text-left transition-colors truncate max-w-xs"
            >
              "{sq}"
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-semibold text-rose-200">
          Frases agregadas ({quotes.length})
        </label>

        {quotes.map((q) => (
          <div
            key={q.id}
            className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800"
          >
            <div className="min-w-0 flex-1 pr-3">
              <p className="text-xs italic font-serif-elegant text-white">"{q.quote}"</p>
              {(q.author || q.category) && (
                <p className="text-[10px] text-rose-300/70 mt-0.5">
                  {q.category && <span>[{q.category}] </span>}
                  {q.author && <span>— {q.author}</span>}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleDelete(q.id)}
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
