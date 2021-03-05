'use strict';

import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

const TIMER = 5;
const CARROT_COUNT = 9;

export const Reason = Object.freeze({
  win: 'win',
  bug: 'bug',
  timeOver: 'time over',
});

// Builder Pattern
export class GameBuilder {
  withGameTimer(timer) {
    this.gameTimer = timer;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameTimer, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
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

  onItemClick = (item, target) => {
    if (!this.started) {
      return;
    }

    if (item === ItemType.carrot) {
      this.score--;
      this.gameScore.innerText = `${this.score}`;
      // started = true 일 때에만 당근 제거
      target.remove();
      if (!this.score) {
        sound.stopBackground();
        sound.playWin();
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.bug);
    }
  };

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

  stop(reason) {
    this.started = false;
    clearInterval(this.timer);
    this.showStartBtn();
    this.onGameStop && this.onGameStop(reason);
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
    this.gameScore.innerText = `${this.score}`;
  }

  timerWork() {
    this.gameTimer.innerText = `0 : ${this.sec % 60}`;
    this.timer = setInterval(() => {
      if (this.sec <= 0) {
        this.stop(Reason.timeOver);
        return;
      }
      this.sec--;
      this.gameTimer.innerText = `0 : ${this.sec % 60}`;
    }, 1000);
  }
}
