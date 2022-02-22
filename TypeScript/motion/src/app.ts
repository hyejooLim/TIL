import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import {
  InputDialog,
  MediaData,
  TextData,
} from './components/dialog/dialog.js';
import { Component } from './components/component.js';
import { MediaSectionInput } from './components/input/media-input.js';
import { TextSectionInput } from './components/input/text-input.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    // For Demo
    this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/400"));
    this.page.addChild(new VideoComponent("Video Title", "https://www.youtube.com/watch?v=R2sYaJyFETM"));
    this.page.addChild(new NoteComponent("Note Title", "Second note!"));
    this.page.addChild(new TodoComponent("Todo Title", "learn typescript"));
    this.page.addChild(new VideoComponent("Video Title", "https://www.youtube.com/watch?v=R2sYaJyFETM"));
    this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/400"));
    this.page.addChild(new TodoComponent("Todo Title", "Eat a biscket"));
    this.page.addChild(new NoteComponent("Note Title", "First note!"));
  }


  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    inputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();

      const inputSection = new inputComponent();
      dialog.addChild(inputSection);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const section = makeSection(inputSection);
        this.page.addChild(section);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
