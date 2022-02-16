import { PageComponent } from './components/page/page.js';
import { ImageComponent } from './components/page/item/image.js';
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('sky', 'https://picsum.photos/300/150');
        image.attachTo(appRoot, 'beforeend');
    }
}
new App(document.querySelector('.document'));
