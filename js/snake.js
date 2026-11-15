// The snake: a list of grid cells with the head at index 0
class Snake {
  constructor(startX, startY, length) {
    this.reset(startX, startY, length);
  }

  reset(startX, startY, length) {
    this.body = [];
    for (let i = 0; i < length; i++) {
      this.body.push({ x: startX - i, y: startY });
