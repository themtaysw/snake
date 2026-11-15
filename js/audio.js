// Tiny synth for retro sound effects using the Web Audio API
class AudioManager {
  constructor() {
    this.context = null;
    this.muted = false;
  }

  ensureContext() {
    if (!this.context) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.context = new AudioCtx();
    }
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
    return this.context;
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  tone(frequency, duration, type = 'square', volume = 0.08) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }

  melody(notes, gap, duration, type, volume) {
    notes.forEach((frequency, index) => {
      setTimeout(() => this.tone(frequency, duration, type, volume), index * gap);
    });
  }

  eat() {
    this.melody([660, 880], 60, 0.08, 'square');
  }

  bonus() {
    this.melody([523, 659, 784, 1046], 70, 0.1, 'triangle');
  }

  slow() {
    this.melody([440, 330], 150, 0.3, 'sine', 0.1);
  }

  levelUp() {
    this.melody([392, 523, 659], 90, 0.12, 'square');
  }

  gameOver() {
    this.melody([440, 370, 311, 220], 150, 0.2, 'sawtooth', 0.06);
