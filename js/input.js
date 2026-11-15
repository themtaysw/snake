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
        this.game.handleDirection(keyMap[key]);
      } else if (key === ' ' || key === 'p' || key === 'Escape') {
        event.preventDefault();
        this.game.togglePause();
      } else if (key === 'Enter') {
        event.preventDefault();
        this.game.primaryAction();
      } else if (key === 'r') {
        this.game.restart();
      } else if (key === 'm') {
        this.game.toggleMute();
      } else if (key === 'g') {
        this.game.toggleWrap();
      }
    });
  }

  bindTouch() {
    const board = document.getElementById('board');
    board.addEventListener('touchstart', (event) => {
