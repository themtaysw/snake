// Updates the HTML around the canvas: scoreboard, overlay and toasts
class UI {
  constructor() {
    this.score = document.getElementById('score');
    this.highScore = document.getElementById('high-score');
    this.level = document.getElementById('level');
    this.length = document.getElementById('length');
    this.overlay = document.getElementById('overlay');
    this.overlayTitle = document.getElementById('overlay-title');
    this.overlayText = document.getElementById('overlay-text');
    this.startButton = document.getElementById('start-btn');
    this.pauseButton = document.getElementById('pause-btn');
    this.muteButton = document.getElementById('mute-btn');
    this.wrapButton = document.getElementById('wrap-btn');
    this.toast = document.getElementById('toast');
    this.toastTimer = null;
  }

  update(data) {
    this.score.textContent = Utils.formatScore(data.score);
    this.highScore.textContent = Utils.formatScore(data.highScore);
    this.level.textContent = data.level;
    this.length.textContent = data.length;
    this.pauseButton.textContent = data.paused ? 'Resume' : 'Pause';
    this.muteButton.textContent = data.muted ? 'Sound: off' : 'Sound: on';
    this.wrapButton.textContent = data.wrapWalls ? 'Walls: wrap' : 'Walls: solid';
  }

  showOverlay(title, text, buttonLabel) {
    this.overlayTitle.textContent = title;
    this.overlayText.textContent = text;
    this.startButton.textContent = buttonLabel;
