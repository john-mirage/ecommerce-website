import { cart } from "@utils/cart";
import { getOneCamera } from "@utils/camera-api";

class AppCartSummary extends HTMLElement {
  constructor() {
    super();
    this.cart = cart;
    this.listElement = this.querySelector('[data-name="list"]');
    this.totalElement = this.querySelector('[data-name="total"]');
    this.appCartSummaryItem = document.createElement("app-cart-summary-item");
    this.appCartSummaryItemSkeleton = document.createElement("app-cart-summary-item-skeleton");
    this.abortController = false;
  }

  connectedCallback() {
    this.listElement.innerHTML = "";
    for (let index = 0; index < this.cart.cart.size; ++index) {
      const skeleton = this.appCartSummaryItemSkeleton.cloneNode(true);
      this.listElement.append(skeleton);
    }
    this.displayCartItems();
  }

  disconnectedCallback() {
    if (this.abortController) {
      this.abortController.abort();
      console.log("aborted");
    }
  }

  async displayCartItems() {
    const { items, error } = await this.getCartItems();
    if (typeof error === "string") {
      if (error === "error") {
        console.log("error");
      }
    } else {
      this.listElement.innerHTML = "";
      items.forEach((item) => {
        const appCartSummaryItem = this.appCartSummaryItem.cloneNode(true);
        appCartSummaryItem.item = item;
        this.listElement.append(appCartSummaryItem);
      });
    }
  }

  async getCartItems() {
    let items = [];
    let itemsError = false;
    for (const uuid of this.cart.cart.keys()) {
      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      const { camera, error } = await getOneCamera(uuid, signal);
      if (typeof error === "string") {
        if (error === "aborted" || error === "error") {
          itemsError = error;
          break;
        }
        itemsError = error;
      } else if (error === "not-found") {
        this.cart.deleteCameraByUuid(uuid);
      } else {
        items.push(camera);
      }
    }
    this.abortController = false;
    return { items, error: itemsError };
  }
}

export default AppCartSummary;