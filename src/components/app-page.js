const indexPageTemplate = document.getElementById("template-index-page");
const productPageTemplate = document.getElementById("template-product-page");
const cartPageTemplate = document.getElementById("template-cart-page");
const errorPageTemplate = document.getElementById("template-error-page");

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
    return indexPageIsDefined ? this._indexpage : indexPageTemplate.content.cloneNode(true);
  }

  get productPage() {
    const productPageIsDefined = this.hasOwnProperty("_productPage");
    return productPageIsDefined ? this._productPage : productPageTemplate.content.cloneNode(true);
  }

  get cartPage() {
    const cartPageIsDefined = this.hasOwnProperty("_cartPage");
    return cartPageIsDefined ? this._cartPage : cartPageTemplate.content.cloneNode(true);
  }

  get errorPage() {
    const errorPageIsDefined = this.hasOwnProperty("_errorPage");
    return errorPageIsDefined ? this._errorPage : errorPageTemplate.content.cloneNode(true);
  }

  connectedCallback() {
    this.addEventListener("display-error-page", this.handleErrorPage);
  }

  disconnectedCallback() {
    this.removeEventListener("display-error-page", this.handleErrorPage);
  }

  handleErrorPage(event) {
    const fadeOut = this.animate();
    fadeOut.onfinish = (event) => {
      this.mainElement.innerHTML = "";
      this.mainElement.append(this.errorPage);
      this.animate();
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