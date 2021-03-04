'use strict';

import PopUp from './popup.js';
import Game from './game.js';
import Field from './field.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const gamefield = new Field();
const game = new Game(5, 9, 9);

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
    case 'win':
      message = 'You win! 🎉';
      break;
    case 'bug':
      message = 'You lose! 😢';
      break;
    case 'time over':
      message = 'Time Over ⏰';
      break;
    default:
      throw new Error('not valid message');
  }
  gameFinishBanner.showWithText(message);
});
