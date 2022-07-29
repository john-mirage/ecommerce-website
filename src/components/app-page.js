import { fadeInAnimation, fadeOutAnimation, fadeInAnimationTiming, fadeOutAnimationTiming } from "@utils/fade-animations";

class AppPage extends HTMLElement {
  static get observedAttributes() {
    return ["page"];
  }

  constructor() {
    super();
    this.mainElement = this.querySelector('[data-name="main"]');
  }

  get indexPage() {
    const indexPageIsDefined = this.hasOwnProperty("_indexPage");
    if (!indexPageIsDefined) {
      this._indexPage = document.createElement("app-index-page");
    }
    return this._indexPage;
  }

  get productPage() {
    const productPageIsDefined = this.hasOwnProperty("_productPage");
    if (!productPageIsDefined) {
      this._productPage = document.createElement("app-product-page");
    }
    return this._productPage;
  }

  get cartPage() {
    const cartPageIsDefined = this.hasOwnProperty("_cartPage");
    if (!cartPageIsDefined) {
      this._cartPage = document.createElement("app-cart-page");
    }
    return this._cartPage;
  }

  get errorPage() {
    const errorPageIsDefined = this.hasOwnProperty("_errorPage");
    if (!errorPageIsDefined) {
      this._errorPage = document.createElement("app-error-page");
    }
    return this._errorPage;
  }

  connectedCallback() {
    this.addEventListener("display-error-page", this.handleErrorPage);
  }

  disconnectedCallback() {
    this.removeEventListener("display-error-page", this.handleErrorPage);
  }

  handleErrorPage(event) {
    const fadeOut = this.animate(fadeOutAnimation, fadeOutAnimationTiming);
    fadeOut.onfinish = (event) => {
      this.mainElement.innerHTML = "";
      this.mainElement.append(this.errorPage);
      this.animate(fadeInAnimation, fadeInAnimationTiming);
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.mainElement.innerHTML = "";
    if (name === "page") {
      switch(newValue) {
        case "index":
          this.mainElement.append(this.indexPage);
          break;
        case "product":
          this.mainElement.append(this.productPage);
          break;
        case "cart":
          this.mainElement.append(this.cartPage);
          break;
        case "error":
          this.mainElement.append(this.errorPage);
          break;
        default:
          throw new Error("The page do not exist");
      }
    }
  }
}

export default AppPage;