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
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.size = size;
  }

  clear() {
    const { ctx } = this;
    ctx.fillStyle = CONFIG.COLORS.background;
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.strokeStyle = CONFIG.COLORS.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 1; i < CONFIG.GRID_SIZE; i++) {
      const p = i * CONFIG.CELL_SIZE + 0.5;
      ctx.moveTo(p, 0);
