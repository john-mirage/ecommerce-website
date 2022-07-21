class AppView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.mainElement = document.createElement("main");
    this.mainElement.classList.add("my-16");
    this.appIndexView = false;
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

  switchToErrorView(link) {
    this.mainElement.innerHTML = "";
    window.history.pushState({}, "", link);
    console.log("ERROR VIEW")
  }

  switchToNotFoundView(link) {
    this.mainElement.innerHTML = "";
    window.history.pushState({}, "", link);
    console.log("NOT FOUND VIEW")
  }

  switchToIndexView(link, cameras) {
    this.mainElement.innerHTML = "";
    this.appIndexView = this.indexView ? this.indexView : document.createElement("app-index-view");
    this.appIndexView.cameras = cameras;
    this.mainElement.append(this.appIndexView);
    window.history.pushState({}, "", link);
    console.log("INDEX VIEW")
  }

  switchToProductView(link, camera) {
    this.mainElement.innerHTML = "";
    window.history.pushState({}, "", link);
    console.log("PRODUCT VIEW")
  }

  switchToFilledCartView(link, cart) {
    this.mainElement.innerHTML = "";
    window.history.pushState({}, "", link);
    console.log("FILLED CART VIEW")
  }

  switchToEmptyCartView(link) {
    this.mainElement.innerHTML = "";
    window.history.pushState({}, "", link);
    console.log("EMPTY CART VIEW")
  }
}

export default AppView;