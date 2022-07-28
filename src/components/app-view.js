class AppView extends HTMLElement {
  constructor() {
    super();
    this.currentView = false;
  }

  get appIndexView() {
    const appIndexViewIsDefined = this.hasOwnProperty("_appIndexView");
    return appIndexViewIsDefined ? this._appIndexView : document.createElement("app-index-view");
  }

  get appProductView() {
    const appProductViewIsDefined = this.hasOwnProperty("_appProductView");
    return appProductViewIsDefined ? this._appProductView : document.createElement("app-product-view");
  }

  get appCartView() {
    const appCartViewIsDefined = this.hasOwnProperty("_appCartView");
    return appCartViewIsDefined ? this._appCartView : document.createElement("app-cart-view");
  }

  get appNotFoundView() {
    const appNotFoundViewIsDefined = this.hasOwnProperty("_appNotFoundView");
    return appNotFoundViewIsDefined ? this._appNotFoundView : document.createElement("app-not-found-view");
  }

  switchView(nextView, isAnimated) {
    if (this.currentView && isAnimated) {
      const fadeOut = this.currentView.animate();
      fadeOut.onfinish = (event) => {
        this.appView.innerHTML = "";
        this.appView.append(nextView);
        nextView.animate();
      };
    } else {
      this.appView.innerHTML = "";
      this.appView.append(nextView);
    }
    this.currentView = nextView;
  }
}

export default AppView;