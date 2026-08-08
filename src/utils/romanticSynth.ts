// Web Audio API Gentle Romantic Piano / Music Box Synthesizer
// Provides smooth, ambient, zero-latency romantic melody directly generated in browser

let audioCtx: AudioContext | null = null;
let isPlayingSynth = false;
let timeoutIds: number[] = [];

// Romantic Chord Progression frequencies (Hz) - Cmaj7, Am7, Fmaj7, G7 (soft octave 4 & 5)
const CHORDS = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
  [196.00, 246.94, 293.66, 349.23], // G7
];

const MELODY_NOTES = [
  523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50
];

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playNote(freq: number, startTime: number, duration: number, volume = 0.15) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Gentle bell/music box waveform
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  // Envelope: Soft attack, gentle exponential decay
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function startRomanticSynth(): void {
  if (isPlayingSynth) return;
  const ctx = getAudioContext();
  isPlayingSynth = true;

  let step = 0;
  const bpm = 48; // Very slow, romantic tempo
  const beatDuration = 60 / bpm; // ~1.25 seconds per beat

  const scheduleLoop = () => {
    if (!isPlayingSynth) return;

    const now = ctx.currentTime;
    const chordIndex = Math.floor(step / 4) % CHORDS.length;
    const currentChord = CHORDS[chordIndex];

    // Play soft arpeggiated bass chord
    currentChord.forEach((freq, idx) => {
      playNote(freq, now + idx * 0.15, beatDuration * 2.5, 0.08);
    });

    // Play a gentle high melody note on alternating beats
    if (step % 2 === 0) {
      const melodyFreq = MELODY_NOTES[(step * 3) % MELODY_NOTES.length];
      playNote(melodyFreq, now + 0.3, beatDuration * 1.8, 0.12);
    }

    step++;
    const nextTime = beatDuration * 1000;
    const timer = window.setTimeout(scheduleLoop, nextTime);
    timeoutIds.push(timer);
  };

  scheduleLoop();
}

export function stopRomanticSynth(): void {
  isPlayingSynth = false;
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend();
  }
}

export function isSynthPlaying(): boolean {
  return isPlayingSynth;
}
