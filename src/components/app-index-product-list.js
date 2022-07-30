import { getAllCameras } from "@utils/camera-api";

const template = document.getElementById("template-app-index-product-list");

class AppIndexProductList extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.listElement = this.fragment.querySelector('[data-name="list"]');
    this.appIndexProduct = document.createElement("app-index-product");
    this.appIndexProductSkeleton = document.createElement("app-index-product-skeleton");
    this.abortController = false;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.listElement.innerHTML = "";
    for (let index = 0; index < 6; ++index) {
      const skeleton = this.appIndexProductSkeleton.cloneNode(true);
      this.listElement.append(skeleton);
    }
    this.displayProducts();
  }

  disconnectedCallback() {
    if (this.abortController instanceof AbortController) {
      this.abortController.abort();
    }
  }

  async displayProducts() {
    this.abortController = new AbortController();
    const { cameras, error } = await getAllCameras(this.abortController.signal);
    if (typeof error === "string") {
      if (error !== "aborted") {
        const title = "Oups, il semble que l'application ne fonctionne pas correctement";
        const customEvent = new CustomEvent("display-error-page", {
          bubbles: true,
          detail: { title }
        });
        this.dispatchEvent(customEvent);
      }
    } else {
      this.listElement.innerHTML = "";
      cameras.forEach((camera) => {
        const product = this.appIndexProduct.cloneNode(true);
        product.camera = camera;
        this.listElement.append(product);
      });
    }
    this.abortController = false;
  }
}

export default AppIndexProductList;