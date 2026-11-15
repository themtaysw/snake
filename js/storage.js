// Persists high scores and settings in localStorage (fails silently)
const SaveData = {
  KEY: 'snake.save.v1',

  defaults() {
    return {
      highScore: 0,
      bestLevel: 1,
      muted: false,
      wrapWalls: CONFIG.WRAP_WALLS,
