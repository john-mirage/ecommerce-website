const template = document.getElementById("template-app-header");

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.fragment = template.content.cloneNode(true);
  }

  connectedCallback() {
    this.append(this.fragment);
  }
}

export default AppHeader;