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
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.listElement.innerHTML = "";
    for (let index = 0; index < 5; index++) {
      const skeleton = this.appIndexProductSkeleton.cloneNode(true);
      this.listElement.append(skeleton);
    }
    this.displayProducts();
  }

  async displayProducts() {
    const { cameras, isError } = await getAllCameras();
    if (isError) {
      const title = "Oups, il semble que l'application ne fonctionne pas correctement";
      const customEvent = new CustomEvent("display-error-page", {
        bubbles: true,
        detail: { title }
      });
      this.dispatchEvent(customEvent);
    } else {
      const products = cameras.map((camera) => {
        const product = this.appIndexProduct.cloneNode(true);
        product.camera = camera;
        return product;
      });
      this.listElement.innerHTML = "";
      this.listElement.append(...products);
    }
  }
}

export default AppIndexProductList;