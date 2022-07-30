import { getOneCamera } from "@utils/camera-api";

class AppProductPage extends HTMLElement {
  constructor() {
    super();
    this.level = 2;
    this.appProductDescription = document.createElement("app-product-description");
    this.appProductDescriptionSkeleton = document.createElement("app-product-description-skeleton");
    this.abortController = false;
  }

  connectedCallback() {
    this.innerHTML = "";
    this.append(this.appProductDescriptionSkeleton);
    const url = new URL(window.location.href);
    const cameraUuid = url.searchParams.get("id");
    if (cameraUuid) {
      this.displayCamera(cameraUuid ?? "");
    } else {
      const title = "Oups, il semble que le produit que vous cherchez n'existe pas";
      this.askErrorPage(title);
    }
  }

  disconnectedCallback() {
    if (this.abortController instanceof AbortController) {
      this.abortController.abort();
    }
  }

  askErrorPage(title) {
    const customEvent = new CustomEvent("display-error-page", {
      bubbles: true,
      detail: { title }
    });
    this.dispatchEvent(customEvent);
  }

  async displayCamera(cameraUuid) {
    this.abortController = new AbortController();
    const { camera, error } = await getOneCamera(cameraUuid, this.abortController.signal);
    if (typeof error === "string") {
      if (error !== "aborted") {
        let title = "";
        switch(error) {
          case "error":
            title = "Oups, il semble que l'application ne fonctionne pas correctement";
            break;
          case "not-found":
            title = "Oups, il semble que le produit que vous cherchez n'existe pas";
            break;
          default:
            title = "Erreur inconnue";
            break;
        }
        this.askErrorPage(title);
      }
    } else {
      this.innerHTML = "";
      this.appProductDescription.camera = camera;
      this.append(this.appProductDescription);
      this.abortController = false;
    }
  }
}

export default AppProductPage;