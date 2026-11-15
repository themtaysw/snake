// Persists high scores and settings in localStorage (fails silently)
const SaveData = {
  KEY: 'snake.save.v1',

  defaults() {
    return {
      highScore: 0,
      bestLevel: 1,
      muted: false,
      wrapWalls: CONFIG.WRAP_WALLS,
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(SaveData.KEY);
      const data = raw ? JSON.parse(raw) : {};
      return { ...SaveData.defaults(), ...data };
    } catch (error) {
      return SaveData.defaults();
    }
