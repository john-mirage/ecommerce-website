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
    let items = [];
    uuidsLoop:
    for (const uuid of this.cart.cart.keys()) {
      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      const { camera, error } = await getOneCamera(uuid, signal);
      if (typeof error === "string") {
        switch(error) {
          case "aborted":
            break uuidsLoop;
          case "error":
            break uuidsLoop;
          case "not-found":
            this.cart.deleteCameraByUuid(uuid);
            break;
          default:
            throw new Error("unknown error");
        }
      } else {
        const appCartSummaryItem = this.appCartSummaryItem.cloneNode(true);
        appCartSummaryItem.item = camera;
        items.push(appCartSummaryItem);
      }
    }
    this.listElement.innerHTML = "";
    this.listElement.append(...items);
    this.abortController = false;
  }
}

export default AppCartSummary;