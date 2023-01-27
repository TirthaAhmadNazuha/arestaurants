import '../../styles/components/footer.sass';

class Footer extends HTMLElement {
  constructor() {
    super();
    this.imageFlower = this.getAttribute('imgFlower');
  }

  connectedCallback() {
    this.insertAdjacentHTML('beforeend', this.render());
  }

  render() {
    return `
    <section>
      <article class="nameAndCreator">
        <span class="logo">Cecilia</span>
        <h4>Created by</h4>
        <span class="creator">
          Tirtha Ahmad Nazuha
        </span>
        <ul class="contact">
          <li><a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRmTWdfwmmfTXkqZTjHhHRzXmGKRvWqFdKQxNcncCVTvqvpGCJFlZQRXBFBMRCwLQMSqMmb" target="_blank" rel="noopener">tirthaahmadnazuha.udah@gmail.com</a></li>
          <li><a href="https://www.instagram.com/tirtha.ahmad.nazuha/" target="_blank" rel="noopener">@tirtha.ahmad.nazuha</a></li>
          <li><a href="https://wa.me/6285778769535" target="_blank" rel="noopener">wa: +628 57787 69535</a></li>
        </ul>
      </article>
      <article>
        <h3>Keywords</h3>
        <ul class="keywords">
          <li>Cecilia</li>
          <li>Ashen</li>
          <li>Food finder</li>
          <li>Restaurants</li>
          <li>Cafe resto</li>
          <li>Restaurants</li>
        </ul>
      </article>
      <article class="description">
        <p>
        The products here are content only, do not contain facts and comments mean nothing.
        Made for practice and not for profit, just practice.
        </p>
      </article>
    </section>
    <section class="copyright">
      <span>Ashen Company 2023</span>
    </section>`;
  }
}
customElements.define('footer-elem', Footer, { extends: 'footer' });
