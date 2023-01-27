import '../../styles/components/alert-chip.sass';

class Alert extends HTMLElement {
  set error(err) {
    this._error = err;
    this.render(`Error: ${this._error}`);//
    this.style.background = 'red';
  }

  set success(message) {
    this._success = message;
    this.render(`Success: ${this._success}`);//
    this.style.background = 'green';
  }

  async render(data) {
    this.innerHTML = `
    <span>${data}</span>`;

    this.classList.add('on');
    setTimeout(() => {
      this.classList.remove('on');
      this.setAttribute('style', '');
    }, 3400);
  }
}
customElements.define('alert-chip', Alert);
