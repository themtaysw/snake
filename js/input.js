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
