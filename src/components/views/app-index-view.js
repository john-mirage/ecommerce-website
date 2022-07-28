const template = document.getElementById("template-app-index-view");

class AppIndexView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.navigationLevel = 1;
    this.fragment = viewTemplate.content.cloneNode(true);
    this.errorElement = false;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("flex", "flex-col", "min-h-screen");
      this.append(this.fragment);
      this.initialCall = false;
    }
  }

  displayError(title, subtitle, link) {
    
  }
}

export default AppIndexView;