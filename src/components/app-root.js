import { getOneCamera } from "@utils/camera-api";
import { updateLocalStorageCart, getCartWithCameras } from "@utils/camera-cart";

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
    fetch('http://localhost:3000/api/cameras/')
      .then(response => response.json())
      .then(cameras => {
        this.appView.switchToIndexView(cameras);
      })
      .catch(error => {
        this.appView.switchToErrorView();
      });
  }

  async navigateToProductPage(id) {
    if (typeof id === "string") {
      const response = await fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(response => response)
        .catch(error => false);
      if (response) {
        if (response.ok) {
          const camera = await response.json();
          this.appView.switchToProductView(camera);
        } else {
          this.appView.switchToNotFoundView();
        }
      } else {
        this.appView.switchToErrorView();
      }
    } else {
      this.appView.switchToNotFoundView();
    }
  }

  async navigateToCartPage() {
    const response = await getCartWithCameras(getOneCamera);
    if (response.status === "OK") {
      const newLocalStorageCart = response.cart.map((item) => ({
        id: item.id,
        number: item.number,
        variant: item.variant
      }));
      updateLocalStorageCart(newLocalStorageCart);
      if (response.cart.length > 0) {
        this.appView.switchToFilledCartView(response.cart);
      } else {
        this.appView.switchToEmptyCartView();
      }
    } else if (response.status === "ERROR") {
      this.appView.switchToErrorView();
    }
  }
}

export default AppRoot;