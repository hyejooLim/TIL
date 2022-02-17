import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable
{
  constructor() {
    const htmlString = `<li class="page-item">
    <section class="page-item__body"></section>
    <div class="page-item__controls">
      <button class="close">&times;</button>
    </div>
  </li>`;
    super(htmlString);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    child.attachTo(container, 'afterend');
  }
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    const htmlString = `<ul class="page"></ul>`;
    super(htmlString);
  }

  addChild(child: Component) {
    const item = new PageItemComponent();
    item.addChild(child);
    item.attachTo(this.element, 'beforeend');
  }
}
