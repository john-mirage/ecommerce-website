import { formatCameraPrice } from "@utils/camera-price-formatter";

const viewTemplate = document.getElementById("template-app-cart-view");
const itemTemplate = document.getElementById("template-app-cart-item");

class AppCartView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = viewTemplate.content.cloneNode(true);
    this.listElement = this.fragment.querySelector('[data-name="list"]');
    this.totalPriceElement = this.fragment.querySelector('[data-name="total-price"]');
    this.totalPrice = 0;
  }

  get cart() {
    if (this.hasOwnProperty("_cart") && this._cart !== undefined) {
      return this._cart;
    } else {
      throw new Error("The cart is not defined");
    }
  }

  get cameras() {
    if (this.hasOwnProperty("_cameras") && this._cameras !== undefined) {
      return this._cameras;
    } else {
      throw new Error("The cameras are not defined");
    }
  }

  set cart(cart) {
    this._cart = cart;
  }

  set cameras(cameras) {
    this._cameras = cameras;
    this.listElement.innerHTML = "";
    this.cameras.forEach((camera) => {
      const cameraCard = this.getCameraCard(camera);
      this.listElement.append(cameraCard);
    });
    this.renderTotalPrice();
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }

  renderTotalPrice() {
    const totalPrice = this.cart.reduce((totalPrice, currentItem) => {
      const camera = this.cameras.find((camera) => camera._id === currentItem.uuid);
      return camera ? totalPrice + currentItem.number * camera.price : totalPrice;
    }, 0);
    this.totalPriceElement.textContent = formatCameraPrice(totalPrice);
  }

  getCameraCard(camera) {
    const fragment = itemTemplate.content.cloneNode(true);
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = formatCameraPrice(camera.price);
    return fragment;
  }
}

export default AppCartView;