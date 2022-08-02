import { cart } from "@utils/cart";

class AppCartSummary extends HTMLElement {
  constructor() {
    super();
    this.cart = cart;
    this.listElement = this.querySelector('[data-name="list"]');
    this.totalElement = this.querySelector('[data-name="total"]');
    this.appCartSummaryItem = document.createElement("app-cart-summary-item");
    this.appCartSummaryItemSkeleton = document.createElement("app-cart-summary-item-skeleton");
  }

  connectedCallback() {
    this.listElement.innerHTML = "";
    for (let index = 0; index < this.cart.cart.size; ++index) {
      const skeleton = this.appCartSummaryItemSkeleton.cloneNode(true);
      this.listElement.append(skeleton);
    }
  }
}

export default AppCartSummary;