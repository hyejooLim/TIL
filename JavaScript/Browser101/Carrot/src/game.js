'use strict';

import Field from './field.js';
import * as sound from './sound.js';

const TIMER = 5;
const CARROT_COUNT = 9;

export default class Game {
  constructor(gameTimer, carrotCount, bugCount) {
    this.gameTimer = gameTimer;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector('.game__btn');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.started = false;
    this.timer = undefined;
    this.score = CARROT_COUNT;
    this.sec = TIMER;

    this.gameField = new Field();
    this.gameField.setClickListener(this.onItemClick);
    this.gameField.loadArray().then((items) => this.onClickBtn(items));
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onClickBtn(items) {
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop('resum');
      } else {
        this.start(items);
      }
    });
  }

  onItemClick = (e) => {
    if (!this.started) {
      return;
    }
    const target = e.target;

    if (target.matches('.carrot')) {
      sound.playCarrot();
      this.score--;
      this.gameScore.innerText = `${this.score}`;
      target.remove();

      if (!this.score) {
        sound.stopBackground();
        sound.playWin();
        this.stop('win');
        this.onGameStop && this.onGameStop('win');
      }
    } else if (target.matches('.bug')) {
      this.stop('bug');
      this.onGameStop && this.onGameStop('bug');
    }
  };

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  start(items) {
    this.started = true;
    sound.playBackground();
    // If you restart game
    if (this.timer === undefined) {
      this.sec = TIMER;
      this.score = CARROT_COUNT;
      this.gameField.displayItems(items);
    }
    this.showStopBtn();
    this.showTimerAndScore();
    this.timerWork();
  }

  stop(state) {
    this.started = false;
    if (state === 'bug') {
      sound.stopBackground();
      sound.playBug();
    } else if (state === 'time over') {
      sound.stopBackground();
      sound.playLose();
    }
    clearInterval(this.timer);
    this.showStartBtn();
  }

  showStartBtn() {
    const icon = document.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
  }

  showStopBtn() {
    const icon = document.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  timerWork() {
    this.gameTimer.innerText = `0 : ${this.sec % 60}`;
    this.timer = setInterval(() => {
      if (this.sec <= 0) {
        this.stop('time over');
        this.onGameStop && this.onGameStop('time over');
        return;
      }
      this.sec--;
      this.gameTimer.innerText = `0 : ${this.sec % 60}`;
    }, 1000);
  }
}
