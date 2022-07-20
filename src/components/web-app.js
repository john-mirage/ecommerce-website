import { URLHasValidUuid, getUrlPathname } from "@utils/url";

class WebApp extends HTMLDivElement {
  constructor() {
    super();
    this.viewElement = this.querySelector('[data-name="view"]');
    this.routes = {
      "404": this.mountErrorView.bind(this),
      "/orinoco": this.mountIndexView.bind(this),
      "/orinoco/produit": this.mountProductView.bind(this),
      "/orinoco/panier": this.mountCartView.bind(this),
    };
    this.errorView = false;
    this.indexView = false;
    this.productView = false;
    this.cartView = false;
    this.currentView = "";
    this.handleLocation = this.handleLocation.bind(this);
    this.handleRouterLink = this.handleRouterLink.bind(this);
  }

  connectedCallback() {
    this.handleLocation();
    window.addEventListener("popstate", this.handleLocation);
    this.addEventListener("router-link-click", this.handleRouterLink);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleLocation);
    this.removeEventListener("router-link-click", this.handleRouterLink);
  }

  handleRouterLink(event) {
    const link = event.detail.link;
    window.history.pushState({}, "", link);
    this.handleLocation();
  }

  handleLocation() {
    const pathname = getUrlPathname(window.location.href).toLowerCase();
    const navigate = this.routes[pathname] || this.routes["404"];
    navigate();
  }

  mountErrorView() {
    console.log("mount error view")
  }

  mountIndexView() {
    if (this.currentView !== "index") {
      console.log("mount index view")
      this.viewElement.innerHTML = "";
      document.title = "Orinoco — Appareil photos anciens";
      this.indexView = this.indexView ? this.indexView : document.createElement("web-index-view");
      this.viewElement.append(this.indexView);
      this.currentView = "index";
    }
  }

  mountProductView() {
    if (URLHasValidUuid(window.location.href)) {
      console.log("mount product view")
      this.viewElement.innerHTML = "";
      document.title = "Orinoco — Page produit";
      this.productView = this.productView ? this.productView : document.createElement("web-product-view");
      this.viewElement.append(this.productView);
      this.currentView = "product";
    } else {
      this.mountErrorView();
    }
  }

  mountCartView() {

  }
}

export default WebApp;