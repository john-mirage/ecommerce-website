const template = document.getElementById("template-app-error-page");

class AppErrorPage extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.level = 4;
    this.fragment = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }
}

export default AppErrorPage;