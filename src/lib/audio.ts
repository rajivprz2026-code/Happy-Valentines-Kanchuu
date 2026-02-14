// Client-side audio using Web Audio API - no backend needed

let audioCtx: AudioContext | null = null;

function getCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Play a pleasant chime for correct answers */
export function playCorrectSound() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, now + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.12);
    osc.stop(now + i * 0.12 + 0.5);
  });
}

/** Play a soft buzz for wrong answers */
export function playWrongSound() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = 200;
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);
}

/** Play a soft click sound */
export function playClickSound() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 800;
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.08);
}

/** Simple background music using oscillators - a gentle repeating melody */
class BackgroundMusic {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private _playing = false;

  get playing() {
    return this._playing;
  }

  start() {
    if (this._playing) return;
    this._playing = true;
    const ctx = getCtx();

    // A gentle looping arpeggio
    const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
    let noteIndex = 0;

    const playNote = () => {
      if (!this._playing) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = notes[noteIndex % notes.length];
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
      noteIndex++;
    };

    playNote();
    this.intervalId = setInterval(playNote, 900);
  }

  stop() {
    this._playing = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const bgMusic = new BackgroundMusic();
