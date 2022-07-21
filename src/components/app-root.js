import { URLHasValidUuid, getUrlPathname } from "@utils/url";

class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.appHeader = this.querySelector("app-header");
    this.appView = this.querySelector("app-view");
    this.appFooter = this.querySelector("app-footer");
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleNavigationLink = this.handleNavigationLink.bind(this);
  }

  connectedCallback() {
    this.handleNavigation();
    window.addEventListener("popstate", this.handleNavigation);
    this.addEventListener("router-link-click", this.handleNavigationLink);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleNavigation);
    this.removeEventListener("router-link-click", this.handleNavigationLink);
  }

  handleNavigationLink(event) {
    const link = event.detail.link;
    this.handleNavigation(link);
  }

  handleNavigation(baseUrl = false) {
    this.appView.switchToLoadingView();
    const url = baseUrl ? baseUrl : window.location.href;
    const pathname = getUrlPathname(url).toLowerCase();
    switch(pathname) {
      case "/orinoco":
        this.navigateToIndexPage(url);
        break;
      case "/orinoco/produit":
        this.navigateToProductPage(url);
        break;
      case "/orinoco/panier":
        this.navigateToCartPage(url);
        break;
      default:
        this.appView.switchToNotFoundView(url);
        break;
    }
  }

  navigateToIndexPage(url) {
    fetch('http://localhost:3000/api/cameras')
      .then(response => response.json())
      .then(cameras => {
        this.appView.switchToIndexView(url, cameras);
      })
      .catch(error => {
        this.appView.switchToErrorView(url);
      });
  }

  navigateToProductPage(url) {
    fetch(`http://localhost:3000/api/cameras/${new URL(url).searchParams.get("id")}`)
      .then(response => response.json())
      .then(camera => {
        if (Object.keys(camera).length > 0) {
          this.appView.switchToProductView(url, camera);
        } else {
          this.appView.switchToNotFoundView(url);
        }
      })
      .catch(error => {
        this.appView.switchToErrorView(url);
      });
  }

  navigateToCartPage(link) {
    
  }
}

export default AppRoot;