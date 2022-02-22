import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type ChildrenState = 'mute' | 'unmute';
type DragState = 'start' | 'end' | 'enter' | 'leave';
type OnDragListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragListener(listener: OnDragListener<SectionContainer>): void;
  muteChildren(state: ChildrenState): void;
  getBoundingRect(): DOMRect;
}

// 어떠한 인자도 받지 않는 생성자가 호출되면 SectionContainer 인터페이스 규격에 맞는 어떤 클래스든 사용 가능
type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragListener?: OnDragListener<PageItemComponent>;

  constructor() {
    super(`<li class="page-item" draggable="true">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    this.element.addEventListener('dragstart', (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener('dragend', (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener('dragenter', (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener('dragleave', (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragState('start');
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragState('end');
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragState('enter');
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragState('leave');
  }

  notifyDragState(state: DragState) {
    this.dragListener && this.dragListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnDragListener(listener: OnDragListener<PageItemComponent>) {
    this.dragListener = listener;
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  muteChildren(state: ChildrenState) {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private children = new Set<SectionContainer>();
  private dragTarget?: SectionContainer;
  private dropTarget?: SectionContainer;

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event);
    });
    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDrop(event);
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    if (!this.dragTarget) {
      return;
    }

    if (this.dropTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const dragElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(
        this.dragTarget,
        dragElement.y < dropY ? 'afterend' : 'beforebegin'
      );
    }
  }

  addChild(child: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(child);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragListener((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          this.updateSections('mute');
          break;
        case 'end':
          this.dragTarget = undefined;
          this.updateSections('unmute');
          break;
        case 'enter':
          this.dropTarget = target;
          break;
        case 'leave':
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unsupported state: ${state}`);
      }
    });
  }

  private updateSections(state: ChildrenState) {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
