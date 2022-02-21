import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player">
              <iframe class="video__iframe"></iframe>
            </div>
            <h2 class="page-item__title video__title"></h2>
          </section>`);

    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedUrl(url); // url -> videoId -> embed

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadElement;
    titleElement.textContent = title;
  }

  private convertToEmbeddedUrl(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
