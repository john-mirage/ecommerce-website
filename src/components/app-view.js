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

  switchToLoadingView() {
    this.mainElement.innerHTML = "";
    console.log("LOADING VIEW")
  }

  switchToErrorView() {
    this.mainElement.innerHTML = "";
    console.log("ERROR VIEW")
  }

  switchToNotFoundView() {
    this.mainElement.innerHTML = "";
    console.log("NOT FOUND VIEW")
  }

  switchToIndexView(cameras) {
    this.mainElement.innerHTML = "";
    this.appIndexView = this.indexView ? this.indexView : document.createElement("app-index-view");
    this.appIndexView.cameras = cameras;
    this.mainElement.append(this.appIndexView);
    console.log("INDEX VIEW")
  }

  switchToProductView(camera) {
    this.mainElement.innerHTML = "";
    this.appProductView = this.appProductView ? this.appProductView : document.createElement("app-product-view");
    this.appProductView.camera = camera;
    this.mainElement.append(this.appProductView);
    console.log("PRODUCT VIEW")
  }

  switchToFilledCartView(cart, cameras, isDegraded) {
    this.mainElement.innerHTML = "";
    this.appCartView = this.appCartView ? this.appCartView : document.createElement("app-cart-view");
    this.appCartView.cart = cart;
    this.appCartView.cameras = cameras;
    this.mainElement.append(this.appCartView);
    console.log("FILLED CART VIEW")
  }

  switchToEmptyCartView() {
    this.mainElement.innerHTML = "";
    console.log("EMPTY CART VIEW")
  }
}

export default AppView;