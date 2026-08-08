import React, { useState } from 'react';
import { PhotoItem } from '../../types';
import { Camera, Plus, Trash2, ArrowUp, ArrowDown, Upload, Link as LinkIcon } from 'lucide-react';

interface Step3Props {
  photos: PhotoItem[];
  onChange: (updated: PhotoItem[]) => void;
}

export const Step3Gallery: React.FC<Step3Props> = ({ photos, onChange }) => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [newCaption, setNewCaption] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');

  const handleAddPhoto = () => {
    if (!newUrl) return;
    const item: PhotoItem = {
      id: 'photo-' + Date.now(),
      url: newUrl,
      caption: newCaption || 'Un momento especial',
      date: newDate,
    };
    onChange([...photos, item]);
    setNewUrl('');
    setNewCaption('');
    setNewDate('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const item: PhotoItem = {
        id: 'photo-' + Date.now(),
        url: dataUrl,
        caption: newCaption || file.name,
        date: newDate,
      };
      onChange([...photos, item]);
      setNewCaption('');
      setNewDate('');
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= photos.length) return;
    const arr = [...photos];
    const temp = arr[index];
    arr[index] = arr[newIdx];
    arr[newIdx] = temp;
    onChange(arr);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 3: Galería de Fotos
        </h3>
        <p className="text-xs text-rose-200/70">
          Sube tus fotografías favoritas o pega enlaces para crear un carrusel inolvidable.
        </p>
      </div>

      {/* Add photo form */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-rose-500/20 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Pega el enlace de la imagen (https://...)"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
            />
          </div>

          <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0 border border-slate-700">
            <Upload className="w-3.5 h-3.5" />
            <span>Subir Archivo</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            placeholder="Descripción (ej: Atardecer en la playa)"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
          <input
            type="text"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder="Fecha o lugar (ej: 15 de Julio, 2023)"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
        </div>

        <button
          type="button"
          onClick={handleAddPhoto}
          disabled={!newUrl}
          className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar a la Galería
        </button>
      </div>

      {/* Photo list preview & reorder */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-rose-200">
          Fotos agregadas ({photos.length})
        </label>

        {photos.map((p, index) => (
          <div
            key={p.id}
            className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 hover:border-rose-500/30 transition-colors"
          >
            <img src={p.url} alt="photo" className="w-14 h-14 rounded-lg object-cover shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{p.caption}</p>
              {p.date && <p className="text-[10px] text-rose-300/70">{p.date}</p>}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleMove(index, 'up')}
                disabled={index === 0}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleMove(index, 'down')}
                disabled={index === photos.length - 1}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40"
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
