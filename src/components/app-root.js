class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.appHeader = this.querySelector("app-header");
    this.appView = this.querySelector("app-view");
    this.appFooter = this.querySelector("app-footer");
    this.handleNavigationPopState = this.handleNavigationPopState.bind(this);
    this.handleNavigationLink = this.handleNavigationLink.bind(this);
  }

  connectedCallback() {
    this.appHeader.updateCartBadge(0);
    this.handleNavigation(window.location.href);
    window.addEventListener("popstate", this.handleNavigationPopState);
    this.addEventListener("router-link-click", this.handleNavigationLink);
    this.addEventListener("cart-add", (event) => {
      console.log("cart change");
    });
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleNavigationPopState);
    this.removeEventListener("router-link-click", this.handleNavigationLink);
  }

  handleNavigationPopState(event) {
    this.handleNavigation(window.location.href);
  }

  handleNavigationLink(event) {
    const href = event.detail.href;
    window.history.pushState({}, "", href);
    this.handleNavigation(href);
  }

  handleNavigation(href) {
    const url = new URL(href);
    switch(url.pathname) {
      case "/orinoco/":
        this.navigateToIndexPage();
        break;
      case "/orinoco/produit":
        this.navigateToProductPage(url.searchParams.get("id"));
        break;
      case "/orinoco/panier":
        this.navigateToCartPage(href);
        break;
      default:
        this.appView.switchToNotFoundView();
        break;
    }
  }

  navigateToIndexPage() {
    fetch('http://localhost:3000/api/cameras')
      .then(response => response.json())
      .then(cameras => {
        this.appView.switchToIndexView(cameras);
      })
      .catch(error => {
        this.appView.switchToErrorView();
      });
  }

  navigateToProductPage(id) {
    if (typeof id === "string") {
      fetch(`http://localhost:3000/api/cameras/${id}`)
      .then(response => response.json())
      .then(camera => {
        if (Object.keys(camera).length > 0) {
          this.appView.switchToProductView(camera);
        } else {
          this.appView.switchToNotFoundView();
        }
      })
      .catch(error => {
        this.appView.switchToErrorView();
      });
    } else {
      this.appView.switchToNotFoundView();
    }
  }

  navigateToCartPage(href) {
    
  }
}

export default AppRoot;