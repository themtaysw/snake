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
    const item = {
      ...cell,
      type,
      createdAt: performance.now(),
      lifetime: type === FOOD_TYPES.NORMAL ? Infinity : CONFIG.SPECIAL_LIFETIME,
    };
    this.items.push(item);
    return item;
  }

  ensureNormal(isBlocked) {
    const hasNormal = this.items.some((item) => item.type === FOOD_TYPES.NORMAL);
    if (!hasNormal) this.spawn(FOOD_TYPES.NORMAL, isBlocked);
  }

  maybeSpawnSpecial(isBlocked) {
    const roll = Math.random();
    if (roll < CONFIG.SLOW_CHANCE) {
