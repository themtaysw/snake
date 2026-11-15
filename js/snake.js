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
