// Draws everything onto the canvas
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.shake = 0;
    this.resize();
  }

  resize() {
    const size = CONFIG.GRID_SIZE * CONFIG.CELL_SIZE;
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = size * ratio;
    this.canvas.height = size * ratio;
