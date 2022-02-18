import { BaseComponent } from '../component.js';
import { Component } from './../component.js';
import { Composable } from '../page/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;

  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
              <button class="dialog__close">&times;</button>
              <div class="dialog__body"></div>
              <button class="dialog__submit">ADD</button>
            </div>
          </dialog>`);

    const closeBtn = this.element.querySelector(
      '.dialog__close'
    )! as HTMLButtonElement;
    const submitBtn = this.element.querySelector(
      '.dialog__submit'
    )! as HTMLButtonElement;

    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    const body = this.element.querySelector('dialog__body')! as HTMLDivElement;
    child.attachTo(body);
  }
}
