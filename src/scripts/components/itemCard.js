import restaurantAPI from '../untils/restaurant-api';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../../styles/components/item-card.sass';

class ItemCard extends HTMLAnchorElement {
  set resto(item) {
    this._resto = item;

    this.classList.add('item-card');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', `Restraurant ${this._resto.name} city: ${this._resto.city} rating: ${this._resto.rating}.`);

    this.render();
    this.querySelector('img').addEventListener('load', () => {
      this.querySelector('.img-unload').classList.add('off');
      this.querySelector('.img-unload').addEventListener('transitionend', (e) => e.target.remove());
    });
  }

  render() {
    this.innerHTML = `
    <article>
      <img class="lazyload" data-src="${restaurantAPI.getImage('small', this._resto.pictureId)}" alt="Image restaurant ${this._resto.name}" />
      <div class="img-unload">
        <div class="loading-indicator"></div>
      </div>
      <h3>${this._resto.name}</h3>
      <p>${this._resto.city} | rating: ${this._resto.rating}</p>
    </article>`;
  }
}
customElements.define('item-card', ItemCard, { extends: 'a' });
