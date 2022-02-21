import { BaseComponent } from '../../component.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<section class="todo">
            <h2 class="page-item__title todo__title"></h2>
            <input type="checkbox" id="todo-checkbox" />
            <label for="todo-checkbox" class="todo__label"></label>
          </section>`);

    const titleElement = this.element.querySelector(
      '.todo__title'
    )! as HTMLHeadElement;
    titleElement.textContent = title;

    const labelElement = this.element.querySelector(
      '.todo__label'
    )! as HTMLLabelElement;
    labelElement.textContent = todo;
  }
}
