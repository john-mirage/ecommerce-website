import { formatCameraPrice } from "@utils/camera-price-formatter";

const template = document.getElementById("template-app-index-product");

class AppIndexProduct extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = productTemplate.content.cloneNode(true);
    this.linkElement = fragment.querySelector('[data-name="link"]');
    this.imageElement = fragment.querySelector('[data-name="image"]');
    this.nameElement = fragment.querySelector('[data-name="name"]');
    this.priceElement = fragment.querySelector('[data-name="price"]');
  }

  get camera() {
    const cameraIsDefined = this.hasOwnProperty("_camera");
    if (cameraIsDefined) {
      return this._camera;
    } else {
      throw new Error("The camera is not defin");
    }
    return appIndexViewIsDefined ? this._appIndexView : document.createElement("app-index-view");
  }

  set camera(camera) {
    
  }

  connectedCallback() {
    if (this.initialCall) {
      this.initialCall = false;
    }
  }

  getProductCard(camera) {
    linkElement.setAttribute("href", `/orinoco/produit?id=${camera._id}`);
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = formatCameraPrice(camera.price);
    return fragment;
  }
}

export default AppIndexProduct;