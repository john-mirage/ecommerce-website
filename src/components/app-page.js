const template = document.getElementById("template-app-page");

export const fadeInAnimation = [
  { opacity: 0, offset: 0 },
  { opacity: 1, offset: 1 }
];

export const fadeOutAnimation = [
  { opacity: 1, offset: 0 },
  { opacity: 0, offset: 1 }
];

export const fadeAnimationTiming = {
  duration: 300,
  easing: "ease-in-out",
}

class AppPage extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.currentPage = false;
    this.fragment = template.content.cloneNode(true);
    this.mainElement = this.fragment.querySelector('[data-name="main"]');
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
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
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
      window.scrollTo({top: 0, left: 0});
      this.mainElement.append(page);
      this.currentPage = page;
    } else {
      throw new Error("The page must be an HTML element");
    }
  }

  updatePageWithAnimation(page) {
    if (page instanceof HTMLElement) {
      const fadeOut = this.animate(fadeOutAnimation, fadeAnimationTiming);
      fadeOut.onfinish = () => {
        this.updatePage(page);
        this.animate(fadeInAnimation, fadeAnimationTiming);
      };
    } else {
      throw new Error("The page must be an HTML element");
    }
  }
}

export default AppPage;