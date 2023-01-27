import '../../styles/components/nav-bar.sass';

class Nav extends HTMLElement {
  constructor() {
    super();
    this.state = {
      logo: 'Cecilia',
    };
  }

  connectedCallback() {
    this.innerHTML = this.render();

    this.userNameHasSign();

    this.querySelectorAll('.menuBtn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.querySelector('.listOfNav').classList.toggle('off');
      });
    });

    this.querySelectorAll('.listOfNav a').forEach((a) => {
      a.addEventListener('click', () => {
        this.querySelector('.listOfNav').classList.add('off');
      });
    });
    this.getNameUserBtnhandler();
  }

  getNameUserBtnhandler() {
    this.querySelectorAll('.getNameUserBtn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.textContent === 'logout') {
          window.localStorage.removeItem('name');
          for (let i = 0; i < 2; i++) {
            this.querySelectorAll('.name')[i].innerText = '';
            this.querySelectorAll('.getNameUserBtn')[i].innerText = 'sign';
          }
          this.querySelector('.listOfNav h3').style.display = 'none';
        } else {
          document.querySelector('geting-name').classList.add('on');
        }
      });
    });
  }

  userNameHasSign() {
    if (!window.localStorage?.getItem('name') || window.localStorage?.getItem('name') === '') return;

    for (let i = 0; i < 2; i++) {
      this.querySelectorAll('.name')[i].innerText = window.localStorage.getItem('name');
      this.querySelectorAll('.getNameUserBtn')[i].innerText = 'logout';
    }
    this.querySelector('.name').innerText = window.localStorage.getItem('name').split(' ')[0];

    this.querySelector('.listOfNav h3').style.display = 'block';
  }

  render() {
    return `
      <button class="menuBtn" tabindex="0" aria-label="Navigation button menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <span class="logo">${this.state.logo}</span>
      <a href="/">Home</a>
      <a href="#favorite">Favorite</a>
      <a href="https://www.instagram.com/tirtha.ahmad.nazuha/" target="_blank" rel="noopener">About Us</a>
      <h3 class="name"><h3>
      <button class="getNameUserBtn">sign</button>
      <div class="listOfNav off">
        <button class="menuBtn" tabindex="0   " aria-label="Navigation button menu">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <h3>Hello</h3>
        <p class="name"></p>
        <button class="getNameUserBtn">sign</button>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#favorite">Favorite</a></li>
          <li><a href="https://www.instagram.com/tirtha.ahmad.nazuha/" target="_blank" rel="noopener">About Us</a></li>
        </ul>
      </div>`;
  }
}
customElements.define('nav-bar', Nav, { extends: 'nav' });
