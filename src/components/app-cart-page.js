const template = document.getElementById("template-app-cart-page");

class AppCartPage extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.level = 3;
    this.fragment = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }
}

export default AppCartPage;