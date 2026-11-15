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

  distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  },

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  hexToRgb(hex) {
    const value = parseInt(hex.slice(1), 16);
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255,
    };
  },

  mixColors(hexA, hexB, t) {
    const a = Utils.hexToRgb(hexA);
    const b = Utils.hexToRgb(hexB);
    const red = Math.round(Utils.lerp(a.r, b.r, t));
    const green = Math.round(Utils.lerp(a.g, b.g, t));
    const blue = Math.round(Utils.lerp(a.b, b.b, t));
    return `rgb(${red}, ${green}, ${blue})`;
  },

  formatScore(score) {
    return String(score).padStart(5, '0');
