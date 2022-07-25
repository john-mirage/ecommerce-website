class AppView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.mainElement = document.createElement("main");
    this.mainElement.classList.add("my-16");
    this.currentView = "";
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
    if (this.currentView !== "index") {
      this.mainElement.innerHTML = "";
      this.appIndexView = this.indexView ? this.indexView : document.createElement("app-index-view");
      this.appIndexView.cameras = cameras;
      this.mainElement.append(this.appIndexView);
      this.currentView = "index";
      console.log("switch to index view");
    } else {
      this.appIndexView.cameras = cameras;
      console.log("only reload the cameras");
    }
  }

  switchToProductView(camera) {
    if (this.currentView !== "product") {
      this.mainElement.innerHTML = "";
      this.appProductView = this.appProductView ? this.appProductView : document.createElement("app-product-view");
      this.appProductView.camera = camera;
      this.mainElement.append(this.appProductView);
      this.currentView = "product";
      console.log("switch to index view");
    } else {
      this.appProductView.camera = camera;
      console.log("only reload the camera");
    }
  }

  switchToFilledCartView(cart, isDegraded) {
    if (this.currentView !== "cart") {
      this.mainElement.innerHTML = "";
      this.appCartView = this.appCartView ? this.appCartView : document.createElement("app-cart-view");
      this.appCartView.cart = cart;
      this.mainElement.append(this.appCartView);
      this.currentView = "cart";
      console.log("switch to cart view");
    } else {
      this.appCartView.cart = cart;
      console.log("only reload the cart");
    }
  }

  switchToErrorView() {
    if (this.currentView !== "error") {
      this.mainElement.innerHTML = "";
      console.log("switch to error view");
      this.currentView = "error";
    }
  }

  switchToNotFoundView() {
    if (this.currentView !== "not-found") {
      this.mainElement.innerHTML = "";
      console.log("switch to not found view");
      this.currentView = "not-found";
    }
  }

  switchToEmptyCartView() {
    if (this.currentView !== "empty-cart") {
      this.mainElement.innerHTML = "";
      console.log("switch to empty cart view");
      this.currentView = "empty-cart";
    }
  }
}

export default AppView;