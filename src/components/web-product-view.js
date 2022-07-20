class WebProductView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.textContent = "Product page";
  }
}

export default WebProductView;