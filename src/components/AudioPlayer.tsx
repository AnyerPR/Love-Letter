import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';
import { AudioConfig } from '../types';

interface AudioPlayerProps {
  config: AudioConfig;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ config }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [progress, setProgress] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHasError(false);
    setIsPlaying(false);
  }, [config.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (config.autoPlay && audioRef.current && !hasError) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Autoplay policy might block initial play until user click
        setIsPlaying(false);
      });
    }
  }, [config.url, config.autoPlay, hasError]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      if (!isNaN(current) && !isNaN(total)) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    setHasError(true);
  };

  if (!config.url) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm w-full bg-slate-900/80 backdrop-blur-md border border-rose-500/20 rounded-2xl p-3 shadow-xl text-white flex items-center gap-3 transition-all duration-300 hover:border-rose-500/40">
      <audio
        ref={audioRef}
        src={config.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={handleAudioError}
        preload="metadata"
        loop
      />

      <div className="relative shrink-0 flex items-center justify-center">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Disc className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium truncate text-rose-200">
            {hasError ? 'Audio no disponible' : (config.title || 'Música Romántica')}
          </p>
          <span className="text-[10px] text-rose-300/60 shrink-0">
            {hasError ? 'Error de carga' : (config.artist || 'Canción de fondo')}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-1 mt-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-400 h-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={togglePlay}
          disabled={hasError}
          className="p-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 disabled:opacity-40 text-rose-300 transition-colors"
          title={hasError ? 'No disponible' : isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          disabled={hasError}
          className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-40 text-slate-400 hover:text-white transition-colors"
          title={isMuted ? 'Activar Sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
