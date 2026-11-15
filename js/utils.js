// Small helper functions shared across modules
const Utils = {
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomCell(gridSize) {
    return {
      x: Utils.randomInt(0, gridSize - 1),
      y: Utils.randomInt(0, gridSize - 1),
    };
  },

  samePosition(a, b) {
    return a.x === b.x && a.y === b.y;
  },

  isOpposite(a, b) {
    return a.x === -b.x && a.y === -b.y;
  },
