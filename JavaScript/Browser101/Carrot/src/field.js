'use strict';

const CARROT_SIZE = 80;

export default class Field {
  constructor() {
    this.gameField = document.querySelector('.game__field');
    this.fieldRect = this.gameField.getBoundingClientRect();
    this.gameField.addEventListener('click', (e) => {
      this.onClick && this.onClick(e);
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  displayItems(items) {
    this.gameField.innerHTML = items
      .map((item) => this.createString(item))
      .join('');
  }

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
