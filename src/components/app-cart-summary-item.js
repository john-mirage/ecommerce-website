import { formatCameraPrice } from "@utils/camera-price-formatter";

const template = document.getElementById("template-app-cart-summary-item");

class AppCartSummaryItem extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
    this.numberElement = this.fragment.querySelector('[data-name="number"]');
    this.lensElement = this.fragment.querySelector('[data-name="lens"]');
  }

  get item() {
    const itemIsDefined = this.hasOwnProperty("_item");
    if (itemIsDefined) {
      return this._item;
    } else {
      throw new Error("The item is not defined");
    }
  }

  set item(item) {
    this._item = item;
    this.imageElement.setAttribute("src", this.item.imageUrl);
    this.nameElement.textContent = this.item.name;
    this.priceElement.textContent = formatCameraPrice(this.item.price);
    this.numberElement.textContent = String(this.item.number);
    this.lensElement.textContent = String(this.item.lens);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }
}

export default AppCartSummaryItem;