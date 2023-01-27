import '../../styles/components/geting-name-form.sass';

class GetingUserName extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.formSubmitHandler();
    this.closeBtnHandler();
  }

  formSubmitHandler() {
    this.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target[1].value === '') {
        return;
      }

      window.localStorage.setItem('name', e.target[1].value);

      document.querySelector('nav').userNameHasSign();

      this.classList.remove('on');
    });
  }

  closeBtnHandler() {
    this.querySelector('.close').addEventListener('click', () => {
      this.classList.remove('on');
    });
  }

  render() {
    return `
    <button class="close"><span class="material-symbols-outlined">close</span> Close</button>
    <form>
      <h2>Enter your name</h2>
      <fieldset>
        <legend>name</legend>
        <input required type="text" name="name" id="" />
      </fieldset>
      <button type="submit">Submit</button>
    </form>`;
  }
}
customElements.define('geting-name', GetingUserName);
