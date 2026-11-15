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
      ctx.lineTo(p, this.size);
      ctx.moveTo(0, p);
      ctx.lineTo(this.size, p);
    }
    ctx.stroke();
  }

  roundedCell(x, y, inset, radius, color) {
    const { ctx } = this;
    const size = CONFIG.CELL_SIZE - inset * 2;
    const px = x * CONFIG.CELL_SIZE + inset;
    const py = y * CONFIG.CELL_SIZE + inset;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(px, py, size, size, radius);
    ctx.fill();
  }

  drawObstacles(obstacles) {
    obstacles.forEach((cell) => {
      this.roundedCell(cell.x, cell.y, 1, 4, CONFIG.COLORS.obstacle);
    });
  }

  drawSnake(snake) {
    const { body } = snake;
    for (let i = body.length - 1; i >= 0; i--) {
      const t = body.length > 1 ? i / (body.length - 1) : 0;
      const color = i === 0
        ? CONFIG.COLORS.snakeHead
        : Utils.mixColors(CONFIG.COLORS.snakeBody, CONFIG.COLORS.snakeTail, t);
      this.roundedCell(body[i].x, body[i].y, i === 0 ? 1 : 2, 6, color);
    }
    this.drawEyes(snake);
  }

  drawEyes(snake) {
    const { ctx } = this;
    const { head, direction } = snake;
    const c = CONFIG.CELL_SIZE;
