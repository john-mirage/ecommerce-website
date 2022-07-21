const template = document.getElementById("template-app-footer");

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.fragment = template.content.cloneNode(true);
  }

  connectedCallback() {
    this.append(this.fragment);
  }
}

export default AppFooter;