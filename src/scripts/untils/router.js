import restaurantAPI from './restaurant-api';

const router = {
  init(overview) {
    this.overview = overview;
    this.checkLocationHasCanged();
  },

  async afterHashCangedRun() {
    const jumbotron = document.querySelector('jumbotron-header');
    const itemList = document.querySelector('item-list');
    const favorite = document.getElementById('favorite');
    const skipToContent = document.querySelector('.skipToContent');
    if (window.location.hash?.includes('overview')) {
      this.overview.locationHashChanged = await restaurantAPI.getDetails(window.location.hash?.replace('#overview/', ''));
      this.overview.classList.add('on');
      for (const child of this.overview.parentElement.children) {
        if (child !== this.overview) {
          child.style.display = 'none';
        }
      }
      jumbotron.style.display = 'none';
    } else if (window.location.hash === '#favorite') {
      favorite.setAttribute('style', '');
      this.overview.classList.remove('on');
      itemList.style.display = 'none';
      jumbotron.style.display = 'none';
    } else {
      for (const child of this.overview.parentElement.children) {
        child.setAttribute('style', '');
      }
      this.overview.classList.remove('on');
    }

    const focusInSkipToContentInter = setInterval(() => {
      skipToContent.focus();
    });
    skipToContent.addEventListener('focusin', () => {
      clearInterval(focusInSkipToContentInter);
    });
    skipToContent.addEventListener('click', () => {
      if (window.location.hash?.includes('overview')) {
        this.overview.querySelector('.first').focus();
      } else if (window.location.hash === '#favorite') {
        favorite.querySelector('.con').firstChild.focus();
      } else {
        document.querySelector('.item-card:first-child').focus();
      }
    });
  },

  checkLocationHasCanged() {
    this.afterHashCangedRun();
    window.addEventListener('hashchange', () => {
      this.afterHashCangedRun();
    });
  },
};

export default router;
