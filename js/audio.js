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
