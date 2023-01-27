import FavoriteInitiator from '../untils/favorite-initiator';
import restaurantAPI from '../untils/restaurant-api';
import '../../styles/components/item-overview.sass';

class ItemOverview extends HTMLElement {
  constructor() {
    super();
  }

  set locationHashChanged(resto) {
    if (!resto) return;
    this._resto = resto;

    this.innerHTML = this.render();
    window.scroll(0, 0);

    this.checkFavorited();
    this.imageLoadhandler();

    this.favoriteBtnHandler();
    this.addNewReviewHandler();
    this.closeBtnHandler();
  }

  closeBtnHandler() {
    this.querySelector('.close').addEventListener('click', () => {
      window.location.hash = '';
    });
  }

  favoriteBtnHandler() {
    this.querySelector('#addFavorite').addEventListener('click', async (e) => {
      let btn = e.target;
      if (e.target.localName === 'span') {
        btn = e.target.offsetParent;
      }
      await FavoriteInitiator.addToFavoriteHandle(this._resto);

      btn.classList.add('off');
      btn.nextElementSibling.classList.remove('off');
    });

    this.querySelector('#removeFavorite').addEventListener('click', async (e) => {
      let btn = e.target;
      if (e.target.localName === 'span') {
        btn = e.target.offsetParent;
      }
      await FavoriteInitiator.removeFromFavoriteHandle(this._resto);

      btn.classList.add('off');
      btn.previousElementSibling.classList.remove('off');
    });
  }

  checkFavorited() {
    if (this._resto.favorited) {
      this.querySelector('#addFavorite').classList.add('off');
      this.querySelector('#removeFavorite').classList.remove('off');
    }
    if (!this._resto.favorited) {
      this.querySelector('#removeFavorite').classList.add('off');
      this.querySelector('#addFavorite').classList.remove('off');
    }
  }

  imageLoadhandler() {
    const image = this.querySelector('.image-con img');
    image.addEventListener('load', () => {
      this.querySelector('.image-con .img-unload').classList.add('off');
      this.querySelector('.image-con .img-unload').addEventListener('transitionend', (e) => e.target.remove());
    });
    setTimeout(() => {
      if (image.naturalHeight === 0) {
        image.src = restaurantAPI.getImage('small', this._resto.pictureId);
      }
    }, 2000);
  }

  addNewReviewHandler() {
    this.querySelector('form.addNewReview').addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!window.localStorage?.getItem('name') || window.localStorage?.getItem('name') === '') {
        document.querySelector('geting-name').classList.add('on');
        return;
      }
      const customerReviews = await restaurantAPI.addReview(this._resto.id, e.target[0].value);
      if (!customerReviews) return;
      const reviewCon = this.querySelector('.costumerReviews .con');
      reviewCon.innerHTML = '';
      customerReviews.forEach((reviewer) => {
        reviewCon.insertAdjacentHTML('beforeend', `
        <div class="item">
          <b>${reviewer.name}</b>
          <small>${reviewer.date}</small>
          <p>${reviewer.review}</p>
        </div>`);
      });
    });
  }

  render() {
    return `
    <button class="close"><span class="material-symbols-outlined">arrow_back_ios</span></button>
    <section>
      <article tabindex="0" class="first" aria-label="Restraurant ${this._resto.name} city: ${this._resto.city}  rating: ${this._resto.rating} Categories: ${this._resto.categories.map((resto) => resto.name).toString().replaceAll(',', ', ')} Address: ${this._resto.address}">
        <div class="image-con">
          <img src="${restaurantAPI.getImage('medium', this._resto.pictureId)}" alt="Image restaurant ${this._resto.name}" />
          <div class="img-unload">
            <div class="loading-indicator"></div>
          </div>
        </div>
        <div class="text">
          <h1>${this._resto.name}</h1>
          <ul>
            <li>Rating: <b>${this._resto.rating}</b></li>
            <li>Categories: <b>${this._resto.categories.map((resto) => resto.name).toString().replaceAll(',', ', ')}</b></li>
            <li>City: <b>${this._resto.city}</b></li>
            <li>Address: <b>${this._resto.address}</b></li>
          </ul>
          <button class="action" id="addFavorite"><span class="material-symbols-outlined">heart_plus</span> Add to favorite</button>
          <button class="action off" id="removeFavorite"><span class="material-symbols-outlined">heart_minus</span> Remove from favorite</button>
        </div>
      </article>
      <article class="fixed" tabindex="0" aria-label="Description: ${this._resto.description}">
        <h2>Description</h2>
        <label for="showmore">
          <input type="checkbox" id="showmore" />
          <p>${this._resto.description}</p>
        </label>
      </article>
      <article class="under">
        <div class="menus" tabindex="0" aria-label="Menus= drink: ${this._resto.menus.drinks.map((drink) => drink.name).toString().replaceAll(',', ', ')}. Food: ${this._resto.menus.foods.map((food) => food.name).toString().replaceAll(',', ', ')}">
          <h2>Menus</h2>
          <div className="drinks">
            <h3>Drink</h3>
            <p>${this._resto.menus.drinks.map((drink) => drink.name).toString().replaceAll(',', ', ')}</p>
          </div>
          <div className="foods">
            <h3>Food</h3>
            <p>${this._resto.menus.foods.map((food) => food.name).toString().replaceAll(',', ', ')}</p>
          </div>
        </div>
        <div class="costumerReviews">
          <form class="addNewReview">
            <div>
              <input type="text" placeholder="Add review" />
              <button type="reset"><span class="material-symbols-outlined">close</span></button>
            </div>
            <button type="submit"><span class="material-symbols-outlined">arrow_downward</span></button>
          </form>
          <div class="con">
            ${this._resto.customerReviews.map((constumer) => '<div class="item"><b>' + constumer.name + '</b><small>' + constumer.date + '</small><p>' + constumer.review + '</p></div>')}
          </div>
        </div>
      </article>
    </section>`;
  }
}
customElements.define('item-overview', ItemOverview);
