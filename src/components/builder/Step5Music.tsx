import React from 'react';
import { AudioConfig } from '../../types';
import { PRESET_AUDIOS } from '../../data/presets';
import { Music, Disc, Upload, Check } from 'lucide-react';

interface Step5Props {
  data: AudioConfig;
  onChange: (updated: AudioConfig) => void;
}

export const Step5Music: React.FC<Step5Props> = ({ data, onChange }) => {
  const handleSelectPreset = (preset: typeof PRESET_AUDIOS[0]) => {
    onChange({
      ...data,
      sourceType: 'preset',
      presetId: preset.id,
      url: preset.url,
      title: preset.title,
      artist: preset.artist,
    });
  };

  const handleCustomUrl = (url: string) => {
    onChange({
      ...data,
      sourceType: 'url',
      url,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange({
        ...data,
        sourceType: 'upload',
        url: dataUrl,
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Archivo Subido',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 5: Música de Fondo
        </h3>
        <p className="text-xs text-rose-200/70">
          Selecciona una melodía romántica o ingresa tu canción especial.
        </p>
        <p className="text-[11px] text-amber-300/90 bg-amber-950/40 border border-amber-500/30 p-2.5 rounded-xl mt-2 font-medium">
          💡 <strong>Nota para compartir:</strong> Las melodías incluidas en la app o enlaces de audio web (MP3) son las recomendadas para sonar automáticamente al enviar el enlace a tu pareja.
        </p>
      </div>

      {/* Presets Grid */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 mb-2">
          Melodías Románticas Incluidas
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESET_AUDIOS.map((preset) => {
            const isSelected = data.url === preset.url;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-rose-500/20 border-rose-400 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Disc className={`w-5 h-5 ${isSelected ? 'text-rose-400 animate-spin-slow' : 'text-slate-500'}`} />
                  {isSelected && <Check className="w-4 h-4 text-rose-300" />}
                </div>
                <div>
                  <p className="text-xs font-semibold">{preset.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{preset.artist}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom URL or upload */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-rose-500/20 space-y-3">
        <label className="block text-xs font-semibold text-rose-200">
          O bien, ingresa un enlace directo de audio o sube cualquier canción desde tu dispositivo
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={data.url || ''}
            onChange={(e) => handleCustomUrl(e.target.value)}
            placeholder="Enlace de audio directo (https://...)"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />

          <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer shrink-0 border border-slate-700 transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Subir Audio (MP3, WAV, AAC, M4A, OGG...)</span>
            <input
              type="file"
              accept="audio/*,.mp3,.wav,.flac,.aac,.ogg,.m4a,.wma,.webm,.opus,.caf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Título de la canción"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
          <input
            type="text"
            value={data.artist}
            onChange={(e) => onChange({ ...data, artist: e.target.value })}
            placeholder="Artista"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
          />
        </div>
      </div>

      {/* Autoplay setting */}
      <div className="flex items-center justify-between bg-slate-900 p-3.5 rounded-xl border border-slate-800">
        <span className="text-xs text-rose-100 font-medium">Reproducción automática al iniciar</span>
        <input
          type="checkbox"
          checked={data.autoPlay}
          onChange={(e) => onChange({ ...data, autoPlay: e.target.checked })}
          className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
        />
      </div>
    </div>
  );
};
