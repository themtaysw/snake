// Keyboard, touch swipe and on-screen button controls
class InputHandler {
  constructor(game) {
    this.game = game;
    this.touchStart = null;
    this.bindKeyboard();
    this.bindTouch();
    this.bindButtons();
  }

  bindKeyboard() {
    const keyMap = {
      ArrowUp: DIRECTIONS.UP,
      ArrowDown: DIRECTIONS.DOWN,
      ArrowLeft: DIRECTIONS.LEFT,
      ArrowRight: DIRECTIONS.RIGHT,
      w: DIRECTIONS.UP,
      s: DIRECTIONS.DOWN,
      a: DIRECTIONS.LEFT,
      d: DIRECTIONS.RIGHT,
    };
    window.addEventListener('keydown', (event) => {
      if (event.repeat && !keyMap[event.key]) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (keyMap[key]) {
        event.preventDefault();
