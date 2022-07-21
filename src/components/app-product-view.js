import currencyFormatter from "@utils/currency-formatter";

const template = document.getElementById("template-app-product-view");

class AppProductView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.initialCall = false;
    }
  }

  getProductRow(camera) {
    const fragment = template.content.cloneNode(true);
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    const descriptionElement = fragment.querySelector('[data-name="description"]');
    const cartButton = fragment.querySelector('[data-name="button"]');
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = currencyFormatter.format(camera.price / 100);
    descriptionElement.textContent = camera.description;
  }
}

export default AppProductView;