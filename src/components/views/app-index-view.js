const template = document.getElementById("template-app-index-view");

class AppIndexView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.navigationLevel = 1;
    this.fragment = viewTemplate.content.cloneNode(true);
    this.errorElement = false;
    this.displayError = this.displayError.bind(this);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("flex", "flex-col", "min-h-screen");
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.addEventListener("display-error", this.displayError);
  }

  disconnectedCallback() {
    this.removeEventListener("display-error", this.displayError);
  }

  displayError(event) {
    const { title } = event.detail;
  }
}

export default AppIndexView;