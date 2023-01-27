import '../../styles/components/jumbotron.sass';

class Jumbotron extends HTMLElement {
  constructor() {
    super();
    this.state = {
      'heading-text': this.getAttribute('heading-text') || null,
      'sub-text': this.getAttribute('sub-text') || null,
      'image-bg': this.getAttribute('image-bg') || null,
    };
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.querySelector('img').addEventListener('load', () => {
      this.querySelector('.img-unload')?.classList.add('off');
      this.querySelector('.img-unload.off')?.addEventListener('transitionend', (e) => e.target.remove());
    });
  }

  render() {
    return `
    <picture>
      <source media="(max-width: 410px)" srcset="${this.state['image-bg'].split('.')[1].concat(['-small', this.state['image-bg'].split('.')[2]]).replace(',', '.')}" />
      <source media="(max-width: 768px)" srcset="${this.state['image-bg'].split('.')[1].concat(['-medium', this.state['image-bg'].split('.')[2]]).replace(',', '.')}" />
      <img src="${this.state['image-bg'] && this.state['image-bg']}" alt="Gambar hero" width="100%" />
    </picture>
    <div class="img-unload">
      <div class="loading-indicator"></div>
    </div>
    <div class="text">
      <h1>${this.state['heading-text'] && this.state['heading-text']}</h1>
      <p>${this.state['sub-text'] && this.state['sub-text']}</p>
    </div>`;
  }
}
customElements.define('jumbotron-header', Jumbotron);
