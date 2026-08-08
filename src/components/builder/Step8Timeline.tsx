import React, { useState } from 'react';
import { TimelineEvent } from '../../types';
import { Calendar, Plus, Trash2, Sparkles, Edit3, Check, X } from 'lucide-react';

interface Step8Props {
  timeline: TimelineEvent[];
  onChange: (updated: TimelineEvent[]) => void;
}

export const Step8Timeline: React.FC<Step8Props> = ({ timeline, onChange }) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [iconName, setIconName] = useState<string>('Heart');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!title || !date) return;

    if (editingId) {
      // Update existing item
      const updatedList = timeline.map((item) =>
        item.id === editingId
          ? { ...item, title, date, description: desc, iconName }
          : item
      );
      onChange(updatedList);
      setEditingId(null);
    } else {
      // Add new item
      const item: TimelineEvent = {
        id: 'tl-' + Date.now(),
        title,
        date,
        description: desc,
        iconName,
      };
      onChange([...timeline, item]);
    }

    setTitle('');
    setDate('');
    setDesc('');
    setIconName('Heart');
  };

  const handleStartEdit = (item: TimelineEvent) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDate(item.date);
    setDesc(item.description || '');
    setIconName(item.iconName || 'Heart');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDate('');
    setDesc('');
    setIconName('Heart');
  };

  const handleDelete = (id: string) => {
    if (editingId === id) {
      handleCancelEdit();
    }
    onChange(timeline.filter((t) => t.id !== id));
  };

  const icons = [
    { name: 'Coffee', label: '☕ Café / Cita' },
    { name: 'HeartHandshake', label: '🤝 Complicidad' },
    { name: 'Sparkles', label: '✨ Beso Mágico' },
    { name: 'Heart', label: '❤️ Aniversario' },
    { name: 'MapPin', label: '📍 Viaje juntos' },
    { name: 'Gift', label: '🎁 Sorpresa' },
  ];

  const quickPresets = [
    { title: 'Primer Beso', date: 'Fecha del primer beso', iconName: 'Sparkles', desc: 'Bajo la luz del atardecer...' },
    { title: 'Primera Cita', date: 'Fecha de la primera cita', iconName: 'Coffee', desc: 'Paseando por el centro...' },
    { title: 'Comenzamos Oficialmente', date: 'Fecha de noviazgo', iconName: 'Heart', desc: 'Prometimos cuidar nuestro amor...' },
    { title: 'Primer Viaje Juntos', date: 'Fecha del viaje', iconName: 'MapPin', desc: 'Descubriendo nuevos rincones...' },
  ];

  const handleAddQuickPreset = (p: typeof quickPresets[0]) => {
    const item: TimelineEvent = {
      id: 'tl-' + Date.now() + Math.random(),
      title: p.title,
      date: 'Fecha especial',
      description: p.desc,
      iconName: p.iconName,
    };
    onChange([...timeline, item]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 8: Fechas Importantes (Línea del Tiempo)
        </h3>
        <p className="text-xs text-rose-200/70">
          Destaca y edita los hitos principales de tu historia (primer beso, cita, compromiso, aniversarios).
        </p>
      </div>

      {/* Presets */}
      {!editingId && (
        <div>
          <label className="block text-xs font-semibold text-rose-200 mb-2">
            Hitos Sugeridos (1-Clic):
          </label>
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddQuickPreset(p)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-rose-200 border border-slate-800 text-xs font-medium transition-colors"
              >
                + {p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form (Add or Edit) */}
      <div className={`p-4 rounded-2xl border space-y-3 transition-colors ${
        editingId
          ? 'bg-rose-950/40 border-rose-400/50 ring-1 ring-rose-400/30'
          : 'bg-slate-900/80 border-rose-500/20'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-rose-300">
            {editingId ? '✏️ Editando Evento de la Historia' : '➕ Agregar Nuevo Evento'}
          </span>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 underline"
            >
              <X className="w-3 h-3" /> Cancelar
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del evento (ej: El Primer Beso)"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Fecha (ej: 14 de Febrero, 2023)"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
        </div>

        <textarea
          rows={2}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Descripción del evento..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-400"
        />

        <div>
          <label className="block text-[11px] text-slate-400 mb-1.5">Icono del Evento:</label>
          <div className="flex flex-wrap gap-1.5">
            {icons.map((ic) => (
              <button
                key={ic.name}
                type="button"
                onClick={() => setIconName(ic.name)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  iconName === ic.name
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {ic.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAddOrUpdate}
            disabled={!title || !date}
            className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {editingId ? (
              <>
                <Check className="w-4 h-4" /> Guardar Cambios del Evento
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Agregar Evento a la Línea del Tiempo
              </>
            )}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-semibold text-rose-200">
          Fechas en la Línea del Tiempo ({timeline.length})
        </label>

        {timeline.map((t) => (
          <div
            key={t.id}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
              editingId === t.id
                ? 'bg-rose-900/30 border-rose-400/80 ring-1 ring-rose-400/40'
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="min-w-0 pr-2">
              <span className="text-[10px] text-rose-400 font-semibold uppercase">{t.date}</span>
              <p className="text-xs font-bold text-white">{t.title}</p>
              {t.description && <p className="text-[10px] text-slate-400 truncate">{t.description}</p>}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleStartEdit(t)}
                className="p-1.5 rounded-lg bg-slate-800 text-rose-300 hover:bg-slate-700 transition-colors"
                title="Editar este evento"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                title="Eliminar evento"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

