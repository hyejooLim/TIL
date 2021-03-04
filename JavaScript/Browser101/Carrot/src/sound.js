export const gameSound = new Audio('sound/bg.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/alert.wav');
const winSound = new Audio('sound/game_win.mp3');
const loseSound = new Audio('sound/bug_pull.mp3');

export function playBackground() {
  playSound(gameSound);
}

export function stopBackground() {
  stopSound(gameSound);
}

export function playCarrot() {
  playSound(carrotSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playWin() {
  playSound(winSound);
}

export function playLose() {
  playSound(loseSound);
}

function playSound(sound) {
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
