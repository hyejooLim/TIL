'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as field from './field.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const gamefield = new field.Field();
const game = new GameBuilder()
  .withGameTimer(5) //
  .withCarrotCount(9)
  .withBugCount(9)
  .build();

// Game Init
gameFinishBanner.setClickListener(() => {
  game.timer = undefined;
  sound.gameSound.currentTime = 0;
  gamefield.loadArray().then((items) => game.start(items));
});

// Show PopUp Message
game.setGameStopListener((reason) => {
  let message;

  switch (reason) {
    case Reason.win:
      message = 'You win! 🎉';
      break;
    case Reason.bug:
      message = 'You lose! 😢';
      sound.playBug();
      break;
    case Reason.timeOver:
      message = 'Time Over ⏰';
      sound.playLose();
      break;
    default:
      throw new Error('not valid message');
  }
  gameFinishBanner.showWithText(message);
});
