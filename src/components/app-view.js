class AppView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.mainElement = document.createElement("main");
    this.mainElement.classList.add("my-16");
    this.appIndexView = false;
    this.appProductView = false;
    this.appCartView = false;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.mainElement);
      this.initialCall = false;
    }
  }

  switchToIndexView(cameras) {
    document.title = "Orinoco — Appareil photos anciens";
    this.mainElement.innerHTML = "";
    this.appIndexView = this.indexView ? this.indexView : document.createElement("app-index-view");
    this.appIndexView.cameras = cameras;
    this.mainElement.append(this.appIndexView);
    this.currentView = "index";
    console.log("switch to index view");
  }

  switchToProductView(camera) {
    document.title = `Orinoco — ${camera.name}`;
    this.mainElement.innerHTML = "";
    this.appProductView = this.appProductView ? this.appProductView : document.createElement("app-product-view");
    this.appProductView.camera = camera;
    this.mainElement.append(this.appProductView);
    this.currentView = "product";
    console.log("switch to product view");
  }

  switchToFilledCartView(cart, isDegraded) {
    document.title = "Orinoco — Mon panier";
    this.mainElement.innerHTML = "";
    this.appCartView = this.appCartView ? this.appCartView : document.createElement("app-cart-view");
    this.appCartView.cart = cart;
    this.mainElement.append(this.appCartView);
    this.currentView = "cart";
    console.log("switch to cart view");
  }

  switchToErrorView() {
    document.title = "Orinoco — Erreur";
    this.mainElement.innerHTML = "";
    console.log("switch to error view");
  }

  switchToNotFoundView() {
    document.title = "Orinoco — Page introuvable";
    this.mainElement.innerHTML = "";
    console.log("switch to not found view");
  }

  switchToEmptyCartView() {
    document.title = "Orinoco — Le panier est vide";
    this.mainElement.innerHTML = "";
    console.log("switch to empty cart view");
  }
}

export default AppView;