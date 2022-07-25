import {
  getLocalStorageCart,
  updateLocalStorageCart,
  getCartItemsForCameras,
} from "@utils/camera-cart";
import {
  getAllCameras,
  getSomeCameras,
  getOneCamera
} from "@utils/camera-api";
import { getCartItemNumber } from "../utils/camera-cart";

class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.appHeader = this.querySelector("app-header");
    this.appView = this.querySelector("app-view");
    this.appFooter = this.querySelector("app-footer");
    this.handleNavigationPopState = this.handleNavigationPopState.bind(this);
    this.handleNavigationLink = this.handleNavigationLink.bind(this);
    this.currentUrl = "";
  }

  connectedCallback() {
    if (this.initialCall) {
      const href = window.location.href;
      this.handleNavigation(href);
      this.currentUrl = href;
      this.initialCall = false;
    }
    window.addEventListener("popstate", this.handleNavigationPopState);
    this.addEventListener("router-link-click", this.handleNavigationLink);
    this.addEventListener("cart-update", (event) => {
      const cartItem = event.detail;
      console.log("cart change", cartItem);
    });
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleNavigationPopState);
    this.removeEventListener("router-link-click", this.handleNavigationLink);
  }

  handleNavigationPopState(event) {
    const href = window.location.href;
    if (this.currentUrl !== href) {
      this.handleNavigation(window.location.href);
      this.currentUrl = href;
    }
  }

  handleNavigationLink(event) {
    const href = event.detail.href;
    if (this.currentUrl !== href) {
      window.history.pushState({}, "", href);
      this.handleNavigation(href);
      this.currentUrl = href;
    }
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
    const { data, isError } = await getAllCameras();
    if (isError) {
      this.appView.switchToErrorView();
    } else if (data) {
      this.appView.switchToIndexView(data);
    } else {
      throw new Error("No data has been received");
    }
  }

  async navigateToProductPage(uuid) {
    if (typeof uuid === "string") {
      const { data, isError, isNotFound } = await getOneCamera(uuid);
      if (isError) {
        this.appView.switchToErrorView();
      } else if (isNotFound) {
        this.appView.switchToNotFoundView();
      } else if (data) {
        this.appView.switchToProductView(data);
      } else {
        throw new Error("No data has been received");
      }
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
          this.appView.switchToFilledCartView({
            items: filteredCart,
            cameras: filteredCameras,
          }, hasPartialData);
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
    const newCartItemsNumber = getCartItemNumber();
    if (newCartItemsNumber !== this.appHeader.cartItemsNumber) {
      this.appHeader.cartItemsNumber = newCartItemsNumber;
    }
  }
}

export default AppRoot;