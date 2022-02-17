import { Component } from './components/component';
import { Composable, PageComponent } from './components/page/page.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/300/150'
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      'Video Title',
      'https://youtu.be/R2sYaJyFETM'
    );
    this.page.addChild(video);

    const note = new NoteComponent('Note Title', 'Note Body');
    this.page.addChild(note);

    const todo = new TodoComponent('Todo Title', 'Todo Item');
    this.page.addChild(todo);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
