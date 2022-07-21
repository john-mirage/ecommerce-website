import currencyFormatter from "@utils/currency-formatter";

const template = document.getElementById("template-app-product-view");

class AppProductView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
    this.descriptionElement = this.fragment.querySelector('[data-name="description"]');
    this.buttonElement = this.fragment.querySelector('[data-name="button"]');
  }

  get camera() {
    if ("_camera" in this && this._camera !== undefined) {
      return this._camera;
    } else {
      throw new Error("The camera is not defined");
    }
  }

  set camera(camera) {
    this._camera = camera;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.imageElement.setAttribute("src", this.camera.imageUrl);
    this.nameElement.textContent = this.camera.name;
    this.priceElement.textContent = currencyFormatter.format(this.camera.price / 100);
    this.descriptionElement.textContent = this.camera.description;
  }
}

export default AppProductView;