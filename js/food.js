// Food items: regular apples, golden bonus orbs and slow-motion orbs
const FOOD_TYPES = {
  NORMAL: 'normal',
  BONUS: 'bonus',
  SLOW: 'slow',
};

class FoodManager {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.items = [];
  }

  reset() {
    this.items = [];
  }

  findFreeCell(isBlocked) {
    for (let attempt = 0; attempt < 500; attempt++) {
      const cell = Utils.randomCell(this.gridSize);
      if (!isBlocked(cell) && !this.at(cell)) return cell;
    }
    return null;
  }

  spawn(type, isBlocked) {
    const cell = this.findFreeCell(isBlocked);
    if (!cell) return null;
