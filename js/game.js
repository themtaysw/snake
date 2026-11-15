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
    this.audio = new AudioManager();
    this.snake = new Snake(0, 0, CONFIG.START_LENGTH);
    this.food = new FoodManager(CONFIG.GRID_SIZE);
    this.save = SaveData.load();
