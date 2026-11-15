// Core game loop and state machine
const STATES = {
  READY: 'ready',
  PLAYING: 'playing',
  PAUSED: 'paused',
  OVER: 'over',
};

class Game {
  constructor(canvas, ui) {
    this.ui = ui;
    this.renderer = new Renderer(canvas);
