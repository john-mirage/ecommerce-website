import { getOneCamera } from "@api/camera";

const template = document.getElementById("template-app-cart-summary");

class AppCartSummary extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.totalElement = this.fragment.querySelector('[data-name="total"]');
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }

  displayCartItemSkeletons() {
    this.listElement.innerHTML = "";
    for (let index = 0; index < this.cart.cart.size; ++index) {
      const skeleton = this.appCartSummaryItemSkeleton.cloneNode(true);
      this.listElement.append(skeleton);
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