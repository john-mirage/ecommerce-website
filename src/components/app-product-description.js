import { formatCameraPrice } from "@utils/camera-price-formatter";
import { cart } from "@utils/cart";

const template = document.getElementById("template-app-product-description");

class AppProductDescription extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
    this.descriptionElement = this.fragment.querySelector('[data-name="description"]');
    this.buttonElement = this.fragment.querySelector('[data-name="button"]');
    this.skeleton = this.fragment.querySelector('[data-name="skeleton"]');
    this.handleCartButtonClick = this.handleCartButtonClick.bind(this);
    this.cart = cart
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
    this.imageElement.setAttribute("src", camera.imageUrl);
    this.nameElement.textContent = camera.name;
    this.priceElement.textContent = formatCameraPrice(camera.price);
    this.descriptionElement.textContent = camera.description;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.buttonElement.addEventListener("click", this.handleCartButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleCartButtonClick);
  }

  handleCartButtonClick() {
    this.cart.addCameraByLens(this.camera._id, this.camera.lenses[0], 1);
    const customEvent = new CustomEvent("cart-updated", { bubbles: true });
    this.dispatchEvent(customEvent);
  }
}

export default AppProductDescription;