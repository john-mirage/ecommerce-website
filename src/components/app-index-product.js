import { formatCameraPrice } from "@utils/camera-price-formatter";

const template = document.getElementById("template-app-index-product");

class AppIndexProduct extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.linkElement = this.fragment.querySelector('[data-name="link"]');
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
    this.handleLink = this.handleLink.bind(this);
  }

  get camera() {
    const cameraIsDefined = this.hasOwnProperty("_camera");
    if (cameraIsDefined) {
      return this._camera;
    } else {
      throw new Error("The camera is not defined");
    }
  }

  set camera(camera) {
    this._camera = camera;
    this.linkElement.setAttribute("href", `/orinoco/produit?id=${this.camera._id}`);
    this.imageElement.setAttribute("src", this.camera.imageUrl);
    this.nameElement.textContent = this.camera.name;
    this.priceElement.textContent = formatCameraPrice(this.camera.price);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.linkElement.addEventListener("click", this.handleLink);
  }

  disconnectedCallback() {
    this.linkElement.removeEventListener("click", this.handleLink);
  }

  handleLink(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    const customEvent = new CustomEvent("navigation-link-click", {
      bubbles: true,
      detail: { href }
    });
    this.dispatchEvent(customEvent);
  }
}

export default AppIndexProduct;