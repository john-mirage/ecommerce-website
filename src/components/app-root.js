import {
  getLocalStorageCart,
  updateLocalStorageCart,
  getCartItemsForCameras
} from "@utils/camera-cart";
import {
  getSomeCameras
} from "@utils/camera-api";

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

  async navigateToIndexPage() {

  }

  async navigateToProductPage(uuid) {
    if (typeof uuid === "string") {

    }
  }

  async navigateToCartPage() {
    const cart = getLocalStorageCart();
    if (cart.length > 0) {
      const { data, isError, hasData, hasPartialData } = await getSomeCameras(cart.map((item) => item.uuid));
      if (isError) {
        this.appView.switchToErrorView();
      } else if (hasData) {
        const { filteredCart, filteredCameras } = getCartItemsForCameras(cart, data);
        if (filteredCart.length > 0) {
          this.appView.switchToFilledCartView(filteredCart, filteredCameras, hasPartialData);
          updateLocalStorageCart(filteredCart);
        } else {
          this.appView.switchToEmptyCartView(hasPartialData);
          updateLocalStorageCart([]);
        }
      } else {
        this.appView.switchToEmptyCartView(hasPartialData);
        updateLocalStorageCart([]);
      }
    } else {
      this.appView.switchToEmptyCartView(false);
      updateLocalStorageCart([]);
    }
  }
}

export default AppRoot;