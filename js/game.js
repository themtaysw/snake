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
    this.audio.muted = this.save.muted;
    this.wrapWalls = this.save.wrapWalls;
    this.obstacles = [];
    this.lastTime = 0;
    this.accumulator = 0;
    this.pausedAt = 0;
    this.isBlocked = (cell) => this.snake.occupies(cell) || this.isObstacle(cell);
    this.loop = this.loop.bind(this);
    this.reset();
    requestAnimationFrame(this.loop);
  }

  reset() {
    const mid = Math.floor(CONFIG.GRID_SIZE / 2);
    this.snake.reset(mid, mid, CONFIG.START_LENGTH);
    this.food.reset();
    this.score = 0;
    this.level = 1;
    this.eaten = 0;
    this.speed = CONFIG.START_SPEED;
    this.slowUntil = 0;
    this.obstacles = this.buildObstacles(this.level);
    this.food.ensureNormal(this.isBlocked);
    this.state = STATES.READY;
    this.updateUI();
    this.ui.showOverlay('Snake', 'Press Enter or tap Start', 'Start');
  }

  buildObstacles(level) {
    const n = CONFIG.GRID_SIZE;
    const mid = Math.floor(n / 2);
    const cells = [];
    for (let i = 4; i < 9; i++) {
      if (level >= 2) cells.push({ x: i, y: 4 }, { x: n - 1 - i, y: n - 5 });
      if (level >= 3) cells.push({ x: n - 5, y: i }, { x: 4, y: n - 1 - i });
      if (level >= 4) cells.push({ x: mid, y: i - 2 }, { x: mid, y: n - 1 - i + 2 });
    }
    if (level >= 5) {
      for (let i = 1; i < 4; i++) {
        cells.push({ x: i, y: mid }, { x: n - 1 - i, y: mid });
      }
    }
