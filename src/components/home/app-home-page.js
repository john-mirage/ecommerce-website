const template = document.getElementById("template-app-home-page");

class AppHomePage extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.level = 1;
    this.fragment = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }
}

export default AppHomePage;