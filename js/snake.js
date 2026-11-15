// The snake: a list of grid cells with the head at index 0
class Snake {
  constructor(startX, startY, length) {
    this.reset(startX, startY, length);
  }

  reset(startX, startY, length) {
    this.body = [];
    for (let i = 0; i < length; i++) {
      this.body.push({ x: startX - i, y: startY });
    }
    this.direction = DIRECTIONS.RIGHT;
    this.queue = [];
    this.growth = 0;
    this.alive = true;
  }

  get head() {
    return this.body[0];
  }

  get length() {
    return this.body.length;
  }

  turn(newDirection) {
    const last = this.queue.length
      ? this.queue[this.queue.length - 1]
      : this.direction;
    if (Utils.samePosition(last, newDirection)) return;
    if (Utils.isOpposite(last, newDirection)) return;
    if (this.queue.length < 3) {
      this.queue.push(newDirection);
    }
  }

  nextHead(gridSize, wrap) {
    if (this.queue.length) {
      this.direction = this.queue.shift();
    }
    let x = this.head.x + this.direction.x;
    let y = this.head.y + this.direction.y;
    if (wrap) {
      x = (x + gridSize) % gridSize;
      y = (y + gridSize) % gridSize;
    }
    return { x, y };
  }

  move(newHead) {
    this.body.unshift(newHead);
    if (this.growth > 0) {
      this.growth--;
    } else {
      this.body.pop();
    }
  }

  grow(amount = 1) {
    this.growth += amount;
  }

  occupies(cell) {
    return this.body.some((part) => Utils.samePosition(part, cell));
  }

  willCollideWithSelf(newHead) {
    // The tail moves out of the way this tick unless the snake is growing
    const limit = this.growth > 0 ? this.body.length : this.body.length - 1;
    for (let i = 0; i < limit; i++) {
      if (Utils.samePosition(this.body[i], newHead)) return true;
    }
    return false;
  }

  isOutside(cell, gridSize) {
    return cell.x < 0 || cell.y < 0 || cell.x >= gridSize || cell.y >= gridSize;
  }
}
