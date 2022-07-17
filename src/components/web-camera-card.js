const numberFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const template = document.getElementById("template-camera-card");

class WebCameraCard extends HTMLLIElement {
  constructor() {
    super();
    this.fragment = template.content.cloneNode(true);
    this.linkElement = this.fragment.querySelector('[data-name="link"]');
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
  }

  get camera() {
    if ("_camera" in this && this._camera !== undefined) {
      return this._camera;
    } else {
      throw new Error("The camera is not defined");
    }
  }

  set camera(camera) {
    this._camera = camera;
  }

  connectedCallback() {
    this.classList.add("space-y-1");
    this.linkElement.setAttribute("href", `/product.html?${this.camera._id}`);
    this.imageElement.setAttribute("src", this.camera.imageUrl);
    this.nameElement.textContent = this.camera.name;
    this.priceElement.textContent = numberFormatter.format(this.camera.price / 100);
    this.append(this.fragment);
  }
}

export default WebCameraCard;