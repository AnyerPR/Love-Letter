import React, { useState } from 'react';
import { VideoItem } from '../../types';
import { Video, Plus, Trash2, Youtube, Upload, FileVideo, Loader2 } from 'lucide-react';

interface Step4Props {
  videos: VideoItem[];
  onChange: (updated: VideoItem[]) => void;
}

export const Step4Videos: React.FC<Step4Props> = ({ videos, onChange }) => {
  const [url, setUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleAdd = () => {
    if (!url || !title) return;
    const item: VideoItem = {
      id: 'vid-' + Date.now(),
      url,
      title,
      description: desc,
    };
    onChange([...videos, item]);
    setUrl('');
    setTitle('');
    setDesc('');
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileTitle = title.trim() || file.name.replace(/\.[^/.]+$/, '');

    // Use URL.createObjectURL for instant, smooth client-side blob URL without main-thread lockup or layout jumps
    setTimeout(() => {
      try {
        const videoUrl = URL.createObjectURL(file);
        const item: VideoItem = {
          id: 'vid-' + Date.now(),
          url: videoUrl,
          title: fileTitle,
          description: desc || 'Vídeo desde la galería local',
        };
        onChange([...videos, item]);
        setUrl('');
        setTitle('');
        setDesc('');
      } catch (err) {
        console.error('Error creating video object URL:', err);
      } finally {
        setIsUploading(false);
        if (e.target) e.target.value = '';
      }
    }, 100);
  };

  const handleDelete = (id: string) => {
    onChange(videos.filter((v) => v.id !== id));
  };

  const isYouTubeUrl = (testUrl: string) =>
    testUrl.includes('youtube.com') || testUrl.includes('youtu.be');

  const getYouTubeEmbedUrl = (testUrl: string) => {
    if (testUrl.includes('embed/')) return testUrl;
    let videoId = '';
    if (testUrl.includes('v=')) {
      videoId = testUrl.split('v=')[1]?.split('&')[0];
    } else if (testUrl.includes('youtu.be/')) {
      videoId = testUrl.split('youtu.be/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : testUrl;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif-elegant font-bold text-white mb-1">
          Paso 4: Vídeos Especiales
        </h3>
        <p className="text-xs text-rose-200/70">
          Agrega vídeos desde la galería de tu dispositivo o pega enlaces de YouTube para revivir recuerdos en movimiento.
        </p>
      </div>

      <div className="bg-slate-900/80 p-4 rounded-2xl border border-rose-500/20 space-y-3">
        {/* Upload from Gallery Button */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-rose-200 block">Subir desde la Galería de tu Dispositivo</span>
            <span className="text-[10px] text-slate-400 block">Selecciona un clip en formato MP4, MOV, WebM, etc.</span>
          </div>
          <label className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md shadow-rose-500/20 transition-all">
            <Upload className="w-3.5 h-3.5" />
            <span>Seleccionar de Galería</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Uploading Spinner Feedback */}
        {isUploading && (
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 flex items-center justify-center gap-3 text-rose-300 animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin text-rose-400" />
            <span className="text-xs font-medium">Procesando e integrando vídeo...</span>
          </div>
        )}

        <div className="relative flex items-center my-2">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-semibold uppercase">O ingresa un enlace por URL</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enlace del video (ej: https://www.youtube.com/watch?v=...)"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
        />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del video (ej: Nuestro viaje a las montañas)"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
        />

        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Descripción opcional"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
        />

        <button
          type="button"
          onClick={handleAdd}
          disabled={!url || !title || isUploading}
          className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar Vídeo por URL
        </button>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-semibold text-rose-200">
          Vídeos agregados ({videos.length})
        </label>

        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                {isYouTubeUrl(v.url) ? (
                  <Youtube className="w-5 h-5 text-red-500 shrink-0" />
                ) : (
                  <FileVideo className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{v.title}</p>
                  {v.description && (
                    <p className="text-[10px] text-slate-400 truncate">{v.description}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(v.id)}
                className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 shrink-0 transition-colors"
                title="Eliminar vídeo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 relative">
              {isYouTubeUrl(v.url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(v.url)}
                  title={v.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={v.url}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

