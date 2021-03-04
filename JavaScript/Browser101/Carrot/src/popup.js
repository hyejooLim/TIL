'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop_up__message');
    this.refreshBtn = document.querySelector('.pop-up__refresh');
    this.refreshBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpMessage.innerText = text;
    this.popUp.classList.remove('pop-up--hidden');
  }

  hide() {
    this.popUp.classList.add('pop-up--hidden');
  }
}
