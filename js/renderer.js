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
    const cx = head.x * c + c / 2 + direction.x * c * 0.18;
    const cy = head.y * c + c / 2 + direction.y * c * 0.18;
    const side = c * 0.2;
    const eyes = [
      { x: cx - direction.y * side, y: cy + direction.x * side },
      { x: cx + direction.y * side, y: cy - direction.x * side },
    ];
    ctx.fillStyle = CONFIG.COLORS.eyes;
    eyes.forEach((eye) => {
      ctx.beginPath();
      ctx.arc(eye.x, eye.y, c * 0.1, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  foodColor(type) {
    if (type === FOOD_TYPES.BONUS) return CONFIG.COLORS.bonus;
    if (type === FOOD_TYPES.SLOW) return CONFIG.COLORS.slow;
    return CONFIG.COLORS.food;
  }

  drawFood(food, now) {
    const { ctx } = this;
    const c = CONFIG.CELL_SIZE;
    food.items.forEach((item) => {
      const life = food.remainingLife(item, now);
      const blinking = life < 0.3 && Math.floor(now / 120) % 2 === 0;
      if (blinking) return;
      const pulse = 1 + Math.sin(now / 180) * 0.08;
      const color = this.foodColor(item.type);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(item.x * c + c / 2, item.y * c + c / 2, c * 0.36 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  burst(cell, color) {
    const c = CONFIG.CELL_SIZE;
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / CONFIG.PARTICLE_COUNT;
      const speed = 1 + Math.random() * 2.5;
      this.particles.push({
        x: cell.x * c + c / 2,
        y: cell.y * c + c / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
      });
    }
  }

  addShake(amount) {
    this.shake = Math.max(this.shake, amount);
  }

  drawParticles() {
    const { ctx } = this;
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.life -= 0.03;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    });
    ctx.globalAlpha = 1;
    this.particles = this.particles.filter((p) => p.life > 0);
  }

  drawSlowOverlay(active) {
    if (!active) return;
    this.ctx.fillStyle = 'rgba(110, 198, 255, 0.08)';
    this.ctx.fillRect(0, 0, this.size, this.size);
  }

  render(state, now) {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.size, this.size);
    ctx.save();
    if (this.shake > 0.1) {
      const dx = (Math.random() - 0.5) * this.shake;
      const dy = (Math.random() - 0.5) * this.shake;
      ctx.translate(dx, dy);
      this.shake *= 0.9;
    }
    this.clear();
