import restaurantAPI from '../untils/restaurant-api';
import './itemCard';
import '../../styles/components/item-list.sass';

class ItemList extends HTMLElement {
  constructor() {
    super();
    this.restaurants = restaurantAPI.getList();
  }

  async connectedCallback() {
    this.restaurants = await this.restaurants && restaurantAPI.getList;
    this.restaurants.forEach((restaurant) => {
      const elem = document.createElement('a', { is: 'item-card' });
      elem.href = `#overview/${restaurant.id}`;//
      elem.resto = restaurant;
      this.insertAdjacentElement('beforeend', elem);
    });
  }
}
customElements.define('item-list', ItemList);
