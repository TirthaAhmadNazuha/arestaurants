import FavoriteInitiator from '../untils/favorite-initiator';
import './itemCard';
import '../../styles/components/favorite-page.sass';

class FavoritePage extends HTMLElement {
  constructor() {
    super();
    this.favoriteRestaurants = ['Not Found!'];
    this.setRestaurant();
  }

  async setRestaurant() {
    const res = FavoriteInitiator;
    const { db } = await res;
    this.favoriteRestaurants = await db.getItemAll();
    this.innerHTML = this.render();
    const container = this.querySelector('.con');
    for (const resto of this.favoriteRestaurants) {
      const cardElement = document.createElement('a', { is: 'item-card' });
      cardElement.href = `#overview/${resto.id}`;//
      cardElement.resto = resto;
      container.insertAdjacentElement('beforeend', cardElement);
    }
  }

  render() {
    return `
    <h1>Favorite</h1>
    <div class="con"></div>`;
  }
}
customElements.define('favorite-page', FavoritePage);
