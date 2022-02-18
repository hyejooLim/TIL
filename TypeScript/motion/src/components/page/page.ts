import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable
{
  private closeListener?: OnCloseListener;

  constructor() {
    const htmlString = `<li class="page-item">
    <section class="page-item__body"></section>
    <div class="page-item__controls">
      <button class="close">&times;</button>
    </div>
  </li>`;
    super(htmlString);

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    child.attachTo(container, 'afterend');
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    const htmlString = `<ul class="page"></ul>`;
    super(htmlString);
  }

  addChild(child: Component) {
    const item = new PageItemComponent();
    item.addChild(child);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
