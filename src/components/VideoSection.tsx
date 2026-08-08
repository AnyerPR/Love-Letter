import React, { useState } from 'react';
import { Video, Play, ExternalLink, AlertCircle } from 'lucide-react';
import { VideoItem, ThemeConfig } from '../types';

interface VideoSectionProps {
  videos: VideoItem[];
  theme: ThemeConfig;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos, theme }) => {
  const [failedVideoIds, setFailedVideoIds] = useState<Record<string, boolean>>({});

  if (!videos || videos.length === 0) return null;

  const isYouTubeUrl = (url: string) =>
    url.includes('youtube.com') || url.includes('youtu.be');

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed/')) return url;
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handleVideoError = (id: string) => {
    setFailedVideoIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="videos" className="py-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Video className="w-4 h-4 text-rose-400" />
          <span>Memorias en Movimiento</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white">
          Nuestros Vídeos Especiales
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((vid) => {
          const hasError = failedVideoIds[vid.id];
          const isYt = isYouTubeUrl(vid.url);

          return (
            <div
              key={vid.id}
              className={`rounded-3xl p-4 sm:p-6 ${theme.cardBg} ${theme.cardBorder} border shadow-xl flex flex-col justify-between`}
            >
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-white/10 relative">
                {hasError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900/80 text-rose-200">
                    <AlertCircle className="w-8 h-8 text-rose-400 mb-2" />
                    <p className="text-xs font-medium">El video no se pudo reproducir directamente en este navegador.</p>
                    {vid.url && (
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] text-rose-300 underline hover:text-white"
                      >
                        Abrir enlace directo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ) : isYt ? (
                  <iframe
                    src={getYouTubeEmbedUrl(vid.url)}
                    title={vid.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={vid.url}
                    controls
                    className="w-full h-full object-cover"
                    onError={() => handleVideoError(vid.id)}
                  />
                )}
              </div>

              <div>
                <h3 className="text-xl font-serif-elegant font-bold text-white mb-2">{vid.title}</h3>
                {vid.description && (
                  <p className="text-sm text-rose-200/80 leading-relaxed">{vid.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
