import { getLocalStorageCart, updateLocalStorageCart } from "@utils/camera-cart";
import { getOneCamera, getCartCameras } from "@utils/camera-api";

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
    console.log(cart);
    if (cart.length > 0) {
      const { data, isError, isDegraded } = await getCartCameras(cart);
      console.log(data, isError, isDegraded);
      if (isError) {
        this.appView.switchToErrorView();
      } else if (isDegraded) {
        if (data.cart && data.cameras) {
          this.appView.switchToFilledCartView(data.cart, data.cameras, isDegraded);
        } else {
          this.appView.switchToEmptyCartView(isDegraded);
        }
        updateLocalStorageCart(data.cart || []);
      } else if (data.cart && data.cameras) {
        this.appView.switchToFilledCartView(data.cart, data.cameras, isDegraded);
      } else {
        throw new Error("Something went wrong");
      }
    } else {
      this.appView.switchToEmptyCartView();
    }
  }
}

export default AppRoot;