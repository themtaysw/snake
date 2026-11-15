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
      const touch = event.changedTouches[0];
      this.touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    board.addEventListener('touchend', (event) => {
      if (!this.touchStart) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - this.touchStart.x;
      const dy = touch.clientY - this.touchStart.y;
      this.touchStart = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) {
        this.game.togglePause();
      } else if (Math.abs(dx) > Math.abs(dy)) {
        this.game.handleDirection(dx > 0 ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT);
      } else {
        this.game.handleDirection(dy > 0 ? DIRECTIONS.DOWN : DIRECTIONS.UP);
      }
    }, { passive: true });
  }

  bindButtons() {
    document.querySelectorAll('[data-dir]').forEach((button) => {
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        this.game.handleDirection(DIRECTIONS[button.dataset.dir]);
      });
    });
    const actions = {
      'start-btn': () => this.game.primaryAction(),
      'pause-btn': () => this.game.togglePause(),
      'mute-btn': () => this.game.toggleMute(),
      'wrap-btn': () => this.game.toggleWrap(),
    };
    Object.entries(actions).forEach(([id, action]) => {
      document.getElementById(id).addEventListener('click', (event) => {
        // Drop focus so Space / Enter do not trigger the button again
        event.currentTarget.blur();
        action();
      });
    });
  }
}
