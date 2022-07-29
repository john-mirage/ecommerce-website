import { getOneCamera } from "@utils/camera-api";
import { formatCameraPrice } from "@utils/camera-price-formatter";

const template = document.getElementById("template-app-product-camera");

class AppProductCamera extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
    this.descriptionElement = this.fragment.querySelector('[data-name="description"]');
    this.buttonElement = this.fragment.querySelector('[data-name="button"]');
    this.skeleton = this.fragment.querySelector('[data-name="skeleton"]');
  }

  connectedCallback() {
    if (this.initialCall) {
      this.initialCall = false;
    } else {
      this.innerHTML = "";
      this.append(this.skeleton);
    }
    const url = new URL(window.location.href);
    const cameraUuid = url.searchParams.get("id");
    if (cameraUuid) {
      this.displayCamera(cameraUuid);
    }
  }

  async displayCamera(cameraUuid) {
    const { camera, isError, isNotFound } = await getOneCamera(cameraUuid);
    if (isError) {
      const title = "Oups, il semble que l'application ne fonctionne pas correctement";
      const customEvent = new CustomEvent("display-error-page", {
        bubbles: true,
        detail: { title }
      });
      this.dispatchEvent(customEvent);
    } else if (isNotFound) {
      const title = "Oups, il semble que le produit que vous cherchez n'existe pas";
      const customEvent = new CustomEvent("display-error-page", {
        bubbles: true,
        detail: { title }
      });
      this.dispatchEvent(customEvent);
    } else {
      this.imageElement.setAttribute("src", camera.imageUrl);
      this.nameElement.textContent = camera.name;
      this.priceElement.textContent = formatCameraPrice(camera.price);
      this.descriptionElement.textContent = camera.description;
      this.innerHTML = "";
      this.append(this.fragment);
    }
  }
}

export default AppProductCamera;