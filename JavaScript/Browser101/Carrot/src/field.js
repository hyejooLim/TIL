'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor() {
    this.gameField = document.querySelector('.game__field');
    this.fieldRect = this.gameField.getBoundingClientRect();
    this.gameField.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  loadArray() {
    return fetch('data/data.json')
      .then((response) => response.json())
      .then((json) => json.items);
  }

  displayItems(items) {
    this.gameField.innerHTML = items
      .map((item) => this.createString(item))
      .join('');
  }

  onClick = (e) => {
    const target = e.target;

    if (target.matches('.carrot')) {
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot, target);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug, target);
    }
  };

  createString(item) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    return `
      <img src="${item.image}" class="${item.type}" style="position: absolute; left: ${x}px; top: ${y}px" />
    `;
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
