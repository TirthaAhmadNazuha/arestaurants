import IdbHelper from '../data/idb';
import '../components/alert';

const FavoriteInitiator = {
  init() {
    this.objectStoreName = 'favorite-object-store';
    this.keyPath = 'id';
    this.alertChip = document.querySelector('alert-chip');
    this.db = new IdbHelper(this.objectStoreName);
    this.favoritePage = document.getElementById('favorite');
  },

  async addToFavoriteHandle(resto) {
    const item = resto;
    item.favorited = true;
    if (await this.db.putItem(item)) {
      this.favoritePage?.setRestaurant();
      if (this.alertChip) this.alertChip.success = 'Add Favorite';
      return true;
    }

    if (this.alertChip) this.alertChip.error = 'Fail to Add Favorite';
    return false;
  },

  async removeFromFavoriteHandle(resto) {
    const item = resto;
    item.favorited = false;
    if (!await this.db.deleteItem(item.id)) {
      this.favoritePage?.setRestaurant();
      if (this.alertChip) this.alertChip.success = 'Remove Favorite';
      return true;
    }

    if (this.alertChip) this.alertChip.error = 'Fail to Remove Favorite';
    return false;
  },

  async getItem(id) {
    const res = await this.db.getItem(id);
    if (await res) {
      return res;
    }

    if (this.alertChip) this.alertChip.error = 'Not Found';
    return false;
  },

  async getItemIdAll() {
    const res = await this.db.getItemAll();
    if (await res) {
      return res;
    }

    if (this.alertChip) this.alertChip.error = 'Not Found';
    return false;
  },
};

export default FavoriteInitiator;
