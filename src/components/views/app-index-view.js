const template = document.getElementById("template-app-index-view");

class AppIndexView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.navigationLevel = 1;
    this.fragment = template.content.cloneNode(true);
    this.displayAppError = this.displayAppError.bind(this);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.addEventListener("display-error", this.displayAppError);
  }

  disconnectedCallback() {
    this.removeEventListener("display-error", this.displayAppError);
  }

  displayAppError(event) {
    const { title } = event.detail;
    console.log(title);
  }
}

export default AppIndexView;