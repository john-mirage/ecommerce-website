import { formatCameraPrice } from "@utils/camera-price-formatter";

const viewTemplate = document.getElementById("template-app-index-view");
const productTemplate = document.getElementById("template-app-index-product");

class WebIndexView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = viewTemplate.content.cloneNode(true);
    this.listElement = this.fragment.querySelector('[data-name="list"]');
    this.handleProductCardClick = this.handleProductCardClick.bind(this);
  }

  get cameras() {
    if (this.hasOwnProperty("_cameras") && this._cameras !== undefined) {
      return this._cameras;
    } else {
      throw new Error("The cameras are not defined");
    }
  }

  set cameras(cameras) {
    this._cameras = cameras;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
    this.listElement.innerHTML = "";
    this.cameras.forEach(camera => {
      const productCard = this.getProductCard(camera);
      this.listElement.append(productCard);
    });
  }

  disconnectedCallback() {
    const links = this.listElement.querySelectorAll('[data-name="link"]');
    if (links.length > 0) {
      console.log("remove listeners")
      links.forEach((link) => {
        link.removeEventListener("click", this.handleProductCardClick);
      });
    }
  }

  getProductCard(camera) {
    const fragment = productTemplate.content.cloneNode(true);
    const linkElement = fragment.querySelector('[data-name="link"]');
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    linkElement.setAttribute("href", `/orinoco/produit?id=${camera._id}`);
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = formatCameraPrice(camera.price);
    console.log("add listener");
    linkElement.addEventListener("click", this.handleProductCardClick);
    return fragment;
  }

  handleProductCardClick(event) {
    event.preventDefault();
    const customEvent = new CustomEvent("router-link-click", {
      bubbles: true,
      detail: {
        href: event.currentTarget.href,
      }
    });
    this.dispatchEvent(customEvent);
  }
}

export default WebIndexView;