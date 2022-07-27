import { formatCameraPrice } from "@utils/camera-price-formatter";

const viewTemplate = document.getElementById("template-app-cart-view");
const itemTemplate = document.getElementById("template-app-cart-item");

class AppCartView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.level = 3;
    this.fragment = viewTemplate.content.cloneNode(true);
    this.listElement = this.fragment.querySelector('[data-name="list"]');
    this.totalPriceElement = this.fragment.querySelector('[data-name="total-price"]');
  }

  get cart() {
    if (this.hasOwnProperty("_cart") && this._cart !== undefined) {
      return this._cart;
    } else {
      throw new Error("The cart is not defined");
    }
  }

  set cart(cart) {
    this._cart = cart;
    this.listElement.innerHTML = "";
    this.cart.items.forEach((item) => {
      const camera = this.cart.cameras.find((camera) => camera._id === item.uuid);
      const cartItemCard = this.getCartItemCard(item, camera);
      this.listElement.append(cartItemCard);
    });
    const totalPrice = this.getTotalPrice();
    this.totalPriceElement.textContent = formatCameraPrice(totalPrice);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("flex", "flex-col", "min-h-screen");
      this.append(this.fragment);
      this.initialCall = false;
    }
  }

  getTotalPrice() {
    return this.cart.items.reduce((totalPrice, currentItem) => {
      const camera = this.cart.cameras.find((camera) => camera._id === currentItem.uuid);
      return camera ? totalPrice + currentItem.number * camera.price : totalPrice;
    }, 0);
  }

  getCartItemCard(item, camera) {
    const fragment = itemTemplate.content.cloneNode(true);
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    const numberElement = fragment.querySelector('[data-name="number"]');
    const lensElement = fragment.querySelector('[data-name="lens"]');
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = formatCameraPrice(camera.price);
    numberElement.textContent = String(item.number);
    lensElement.textContent = String(item.lens);
    return fragment;
  }
}

export default AppCartView;