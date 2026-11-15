// Small helper functions shared across modules
const Utils = {
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomCell(gridSize) {
    return {
