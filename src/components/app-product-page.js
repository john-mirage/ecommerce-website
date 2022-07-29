import { getOneCamera } from "@utils/camera-api";

class AppProductPage extends HTMLElement {
  constructor() {
    super();
    this.level = 2;
    this.appProductDescription = document.createElement("app-product-description");
    this.appProductDescriptionSkeleton = document.createElement("app-product-description-skeleton");
  }

  connectedCallback() {
    this.innerHTML = "";
    this.append(this.appProductDescriptionSkeleton);
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
      this.appProductDescription.camera = camera;
      this.innerHTML = "";
      this.append(this.appProductDescription);
    }
  }
}

export default AppProductPage;