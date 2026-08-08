import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn, Calendar, Image as ImageIcon } from 'lucide-react';
import { PhotoItem, ThemeConfig } from '../types';

interface GallerySectionProps {
  photos: PhotoItem[];
  theme: ThemeConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos, theme }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  if (!photos || photos.length === 0) return null;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
  };

  const activePhoto = photos[activeIdx];

  return (
    <section id="gallery" className="py-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Camera className="w-4 h-4 text-rose-400" />
          <span>Galería de Memorias</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white">
          Nuestros Momentos Inolvidables
        </h2>
      </div>

      {/* Main Carousel Card */}
      <div className={`rounded-3xl p-4 sm:p-8 ${theme.cardBg} ${theme.cardBorder} border shadow-2xl relative`}>
        <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 group">
          <img
            src={activePhoto.url}
            alt={activePhoto.caption || 'Nuestra foto'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
            {activePhoto.date && (
              <span className="inline-flex items-center gap-1.5 text-xs text-rose-300 font-medium mb-1">
                <Calendar className="w-3.5 h-3.5" />
                {activePhoto.date}
              </span>
            )}
            <p className="text-lg sm:text-xl font-serif-elegant font-medium leading-snug text-rose-50">
              {activePhoto.caption}
            </p>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Zoom button */}
          <button
            onClick={() => openLightbox(activePhoto)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
            title="Ampliar fotografía"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnails reorder bar */}
        <div className="flex items-center gap-3 mt-6 overflow-x-auto pb-2 scrollbar-none">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setActiveIdx(idx)}
              className={`relative shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                activeIdx === idx
                  ? 'border-rose-400 scale-105 shadow-lg shadow-rose-500/30'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={photo.url} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[90vh] flex flex-col items-center">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {selectedPhoto.caption && (
              <p className="mt-4 text-center text-rose-100 font-serif-elegant text-lg sm:text-xl max-w-xl">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
