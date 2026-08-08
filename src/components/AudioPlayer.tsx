import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';
import { AudioConfig } from '../types';
import { startRomanticSynth, stopRomanticSynth } from '../utils/romanticSynth';

interface AudioPlayerProps {
  config: AudioConfig;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ config }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume] = useState<number>(0.7);
  const [progress, setProgress] = useState<number>(0);
  const [usingSynth, setUsingSynth] = useState<boolean>(config.url === 'synth');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setUsingSynth(config.url === 'synth');
    setIsPlaying(false);
    stopRomanticSynth();
  }, [config.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (config.autoPlay) {
      if (config.url === 'synth') {
        startRomanticSynth();
        setUsingSynth(true);
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            startRomanticSynth();
            setUsingSynth(true);
            setIsPlaying(true);
          });
      }
    }
  }, [config.url, config.autoPlay]);

  const togglePlay = () => {
    if (usingSynth || config.url === 'synth') {
      if (isPlaying) {
        stopRomanticSynth();
        setIsPlaying(false);
      } else {
        startRomanticSynth();
        setUsingSynth(true);
        setIsPlaying(true);
      }
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          startRomanticSynth();
          setUsingSynth(true);
          setIsPlaying(true);
        });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (usingSynth && isPlaying) {
      if (!isMuted) stopRomanticSynth();
      else startRomanticSynth();
    }
  };

  const handleTimeUpdate = () => {
    if (usingSynth) return;
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      if (!isNaN(current) && !isNaN(total)) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleAudioError = () => {
    startRomanticSynth();
    setUsingSynth(true);
    setIsPlaying(true);
  };

  if (!config.url) return null;

  const titleText = usingSynth ? 'Caja de Música Mágica (En Vivo)' : config.title || 'Música Romántica';
  const artistText = usingSynth ? 'Melodía Romántica Garantizada' : config.artist || 'Canción de fondo';

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm w-full bg-slate-900/90 backdrop-blur-md border border-rose-500/30 rounded-2xl p-3 shadow-xl text-white flex items-center gap-3 transition-all duration-300 hover:border-rose-500/50">
      {config.url && config.url !== 'synth' ? (
        <audio
          ref={audioRef}
          src={config.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={handleAudioError}
          preload="auto"
          loop
        />
      ) : null}

      <div className="relative shrink-0 flex items-center justify-center">
        <div className={isPlaying ? 'w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center animate-spin-slow' : 'w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center'}>
          <Disc className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold truncate text-rose-200">
            {titleText}
          </p>
          <span className="text-[10px] text-rose-300/70 shrink-0 ml-1">
            {artistText}
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-1 mt-1.5 overflow-hidden">
          <div
            className={usingSynth && isPlaying ? 'bg-gradient-to-r from-rose-500 to-pink-400 h-full transition-all duration-200 w-full animate-pulse' : 'bg-gradient-to-r from-rose-500 to-pink-400 h-full transition-all duration-200'}
            style={{ width: usingSynth ? '100%' : progress + '%' }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={togglePlay}
          className="p-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors"
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={handleMuteToggle}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title={isMuted ? 'Activar Sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
