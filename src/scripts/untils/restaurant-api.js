import FavoriteInitiator from './favorite-initiator';
import '../components/alert';
import cacheInitiator from './cache-initiator';

const restaurantAPI = {
  api: 'https://restaurant-api.dicoding.dev/',
  async getList() {
    const res = await fetch(`${this.api}list`);//
    const data = await res.json();
    if (data?.error) {
      const alertChip = document.querySelector('alert-chip');
      alertChip.error = data?.message;
      return false;
    }
    const { restaurants } = data;
    const AllIdHasFavorite = await FavoriteInitiator.getItemIdAll();
    restaurants.forEach((resto, i) => {
      restaurants[i].favorited = false;
      restaurants[i].indexedIn = i;
      AllIdHasFavorite.forEach((favoriteResto) => {
        if (resto.id === favoriteResto.id) {
          restaurants[i].favorited = true;
        }
      });
    });
    this.getList = restaurants;
    cacheInitiator.cachingAPI(restaurants, this.api);

    return true;
  },

  async getDetails(id) {
    if (id === '#favorite') return;
    const res = await fetch(`${this.api}detail/${id}`);//
    const data = await res.json();
    if (data?.error) {
      const alertChip = document.querySelector('alert-chip');
      alertChip.error = data?.message;
      return false;
    }

    const { restaurant } = data;
    this.AllIdHasFavorite = await FavoriteInitiator.getItemIdAll();
    restaurant.favorited = false;
    this.AllIdHasFavorite.forEach((favoriteResto) => {
      if (restaurant.id === favoriteResto.id) {
        restaurant.favorited = true;
      }
    });

    return restaurant;
  },

  getImage(resolution, pictureId) {
    return `${this.api}images/${resolution}/${pictureId}`;//
  },

  async addReview(id, review) {
    const res = await fetch(`${this.api}review`, { //
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        name: window.localStorage.getItem('name'),
        review,
      }),
    });
    const data = await res.json();

    if (data?.error) {
      const alertChip = document.querySelector('alert-chip');
      alertChip.error = data?.message;
      return false;
    }
    return data.customerReviews;
  },
};
export default restaurantAPI;
