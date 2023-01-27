import 'regenerator-runtime';
import '../styles/index.sass';
import '../styles/components/skip-to-content.sass';
import './components/navigation';
import './components/jumbotron';
import './components/itemList';
import './components/itemCard';
import './components/itemOverview';
import './components/favoritePage';
import './components/footer';
import './components/getingUserName';
import './components/alert';
import router from './untils/router';
import FavoriteInitiator from './untils/favorite-initiator';
import swRegister from './untils/swRegister';

FavoriteInitiator.init();

document.addEventListener('DOMContentLoaded', () => {
  router.init(document.getElementById('overview'));
});

window.onload = () => {
  swRegister();
};
