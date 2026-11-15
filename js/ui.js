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
