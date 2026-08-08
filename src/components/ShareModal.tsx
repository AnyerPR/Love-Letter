import React, { useState, useEffect } from 'react';
import { Share2, Copy, Download, Upload, Check, X, Sparkles, Heart, MessageCircle, ExternalLink, Link2 } from 'lucide-react';
import { LoveLetterData } from '../types';
import { encodeLetterToUrl, exportLetterAsJson, shortenUrl } from '../utils/storage';
import { INITIAL_DEFAULT_LETTER } from '../data/presets';
import { triggerHeartConfetti } from '../utils/confetti';

interface ShareModalProps {
  data: LoveLetterData;
  onClose: () => void;
  onLoadPreset: (preset: LoveLetterData) => void;
  onImportJson: (imported: LoveLetterData) => void;
  onPreviewEnvelope?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  data,
  onClose,
  onLoadPreset,
  onImportJson,
  onPreviewEnvelope,
}) => {
  const [copiedShort, setCopiedShort] = useState<boolean>(false);
  const [copiedFull, setCopiedFull] = useState<boolean>(false);
  const [isShortening, setIsShortening] = useState<boolean>(true);
  const [shortUrl, setShortUrl] = useState<string>('');
  const [showFullUrl, setShowFullUrl] = useState<boolean>(false);

  const fullShareableUrl = encodeLetterToUrl(data);

  useEffect(() => {
    let isMounted = true;
    setIsShortening(true);

    shortenUrl(fullShareableUrl).then((res) => {
      if (isMounted) {
        setShortUrl(res);
        setIsShortening(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fullShareableUrl]);

  const displayLink = shortUrl || fullShareableUrl;

  const handleCopyShort = () => {
    navigator.clipboard.writeText(displayLink);
    setCopiedShort(true);
    triggerHeartConfetti();
    setTimeout(() => setCopiedShort(false), 3000);
  };

  const handleCopyFull = () => {
    navigator.clipboard.writeText(fullShareableUrl);
    setCopiedFull(true);
    triggerHeartConfetti();
    setTimeout(() => setCopiedFull(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const partner = data.basicInfo.partnerName || 'Mi Amor';
    const message = `💌 *Carta Especial para ti, ${partner}* 💖\n\nHe creado algo muy romántico e inolvidable con todo mi cariño. Toca el enlace para abrir tu sobre mágico:\n👇\n${displayLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onImportJson(json);
        onClose();
      } catch (err) {
        alert('El archivo no es una carta de amor válida en formato JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl animate-fade-in text-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif-elegant font-bold">Compartir Carta de Amor</h3>
            <p className="text-xs text-rose-200/70">
              Crea un enlace súper corto y elegante para enviar a tu pareja por WhatsApp
            </p>
          </div>
        </div>

        {/* Highlighted WhatsApp Direct Share Button */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-950 border border-emerald-500/40 shadow-lg shadow-emerald-950/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-950" />
              <span>Opción Recomendada</span>
            </div>
            {isShortening && (
              <span className="text-[10px] text-emerald-200/60 animate-pulse">Generando enlace corto...</span>
            )}
          </div>

          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span>Enviar directamente por WhatsApp</span>
          </button>
          <p className="text-[11px] text-emerald-200/80 mt-2 text-center">
            Abre WhatsApp con un mensaje romántico formateado y el sobre animado listo para abrir.
          </p>
        </div>

        {/* Shortened Link Copy Field */}
        <div className="mb-6 bg-slate-950 p-4 rounded-2xl border border-rose-500/20">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5" /> Enlace Corto Elegante
            </label>
            {isShortening && (
              <span className="text-[10px] text-rose-300/60 animate-pulse">Optimizando URL...</span>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={isShortening ? 'Acortando enlace...' : displayLink}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-rose-200 truncate font-mono"
            />
            <button
              onClick={handleCopyShort}
              disabled={isShortening}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md shadow-rose-500/20"
            >
              {copiedShort ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" /> ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copiar Corto
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-rose-200/80 mt-2.5">
            ✨ Tus fotos y textos personalizados han sido empaquetados en el enlace para que tu pareja abra su sobre mágico directamente en cualquier teléfono.
          </p>

          {/* Expandable option for full direct technical link */}
          <div className="mt-3">
            <button
              onClick={() => setShowFullUrl(!showFullUrl)}
              className="text-[11px] text-slate-400 hover:text-slate-200 underline flex items-center gap-1"
            >
              {showFullUrl ? 'Ocultar enlace original completo' : 'Ver enlace técnico original completo'}
            </button>

            {showFullUrl && (
              <div className="mt-2 pt-2 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={fullShareableUrl}
                  className="flex-1 bg-slate-900/60 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-400 truncate font-mono"
                />
                <button
                  onClick={handleCopyFull}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-medium flex items-center gap-1 shrink-0"
                >
                  {copiedFull ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar Original</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Magic Envelope button */}
        {onPreviewEnvelope && (
          <div className="mb-6 p-3.5 bg-gradient-to-r from-rose-950/60 to-purple-950/60 rounded-2xl border border-rose-500/30 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-rose-200 block">
                ✨ Probar Vista del Destinatario
              </span>
              <span className="text-[10px] text-rose-300/70 block">
                Mira el sobre animado tal como lo recibirá tu pareja
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onPreviewEnvelope();
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-white" /> Probar Sobre
            </button>
          </div>
        )}

        {/* Download / Upload JSON */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => exportLetterAsJson(data)}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex flex-col items-center gap-2 transition-colors"
          >
            <Download className="w-5 h-5 text-rose-400" />
            <span>Descargar Copia JSON</span>
          </button>

          <label className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex flex-col items-center gap-2 transition-colors cursor-pointer">
            <Upload className="w-5 h-5 text-indigo-400" />
            <span>Cargar Copia JSON</span>
            <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Preset loader quick button */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onLoadPreset(INITIAL_DEFAULT_LETTER);
              onClose();
            }}
            className="text-xs text-rose-300 hover:text-rose-200 flex items-center gap-1.5 underline"
          >
            <Sparkles className="w-3.5 h-3.5" /> Restablecer Ejemplo Romántico
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:text-white"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
