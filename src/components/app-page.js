import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeInAnimationTiming,
  fadeOutAnimationTiming
} from "@utils/fade-animations";

class AppPage extends HTMLElement {
  constructor() {
    super();
    this.currentPage = false;
    this.mainElement = this.querySelector('[data-name="main"]');
    this.handleError = this.handleError.bind(this);
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
    this.addEventListener("display-error-page", this.handleError);
  }

  disconnectedCallback() {
    this.removeEventListener("display-error-page", this.handleError);
  }

  handleError(customEvent) {
    if (customEvent instanceof CustomEvent) {
      const { title } = customEvent.detail;
      this.errorPage.title = title;
      this.updatePageWithAnimation(this.errorPage);
    } else {
      throw new Error("The event must be a custom event in order to extract the title");
    }
  }

  updatePage(page) {
    if (page instanceof HTMLElement) {
      this.mainElement.innerHTML = "";
      this.mainElement.append(page);
      this.currentPage = page;
    } else {
      throw new Error("The page must be an HTML element");
    }
  }

  updatePageWithAnimation(page) {
    if (page instanceof HTMLElement) {
      const fadeOut = this.animate(fadeOutAnimation, fadeOutAnimationTiming);
      fadeOut.onfinish = () => {
        this.updatePage(page);
        this.animate(fadeInAnimation, fadeInAnimationTiming);
      };
    } else {
      throw new Error("The page must be an HTML element");
    }
  }
}

export default AppPage;