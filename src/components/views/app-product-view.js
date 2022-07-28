import { formatCameraPrice } from "@utils/camera-price-formatter";

const template = document.getElementById("template-app-product-view");

class AppProductView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.level = 2;
    this.fragment = template.content.cloneNode(true);
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
    this.descriptionElement = this.fragment.querySelector('[data-name="description"]');
    this.buttonElement = this.fragment.querySelector('[data-name="button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  get camera() {
    if (this.hasOwnProperty("_camera") && this._camera !== undefined) {
      return this._camera;
    } else {
      throw new Error("The camera is not defined");
    }
  }

  set camera(camera) {
    this._camera = camera;
    this.imageElement.setAttribute("src", this.camera.imageUrl);
    this.nameElement.textContent = this.camera.name;
    this.priceElement.textContent = formatCameraPrice(this.camera.price);
    this.descriptionElement.textContent = this.camera.description;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("flex", "flex-col", "min-h-screen");
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  handleButtonClick(event) {
    const customEvent = new CustomEvent("cart-update", {bubbles: true, detail: {
      uuid: this.camera._id,
      number: 1,
    }});
    this.dispatchEvent(customEvent);
  }
}

export default AppProductView;