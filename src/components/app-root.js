import { getLocalStorageCart, updateLocalStorageCart } from "@utils/camera-cart";
import { getOneCamera } from "@utils/camera-api";

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

  async navigateToProductPage(id) {
    if (typeof id === "string") {

    }
  }

  async navigateToCartPage() {
    const localStorageCart = getLocalStorageCart();
    let cart = {
      status: "OK",
      items: [],
      cameras: [],
    };
    if (localStorageCart.length > 0) {
      const uuids = new Set(localStorageCart.map((item) => item.uuid));
      uuidsLoop:
      for (const uuid of uuids) {
        const { data, error } = await getOneCamera(uuid);
        if (typeof error === "string") {
          switch(error) {
            case "ERROR":
              cart.status = "ERROR";
              break uuidsLoop;
            case "NOT_FOUND":
              if (cart.status !== "DEGRADED") cart.status = "DEGRADED";
              break;
            default:
              throw new Error("unknown error");
          }
        } else {
          cart.items = [...cart.items, ...localStorageCart.filter((item) => data._id === item.uuid)];
          cart.cameras.push(data);
        }
      }
    } else {
      this.appView.switchToEmptyCartView();
    }
    console.log(cart);
    //updateLocalStorageCart(cart.items);
  }
}

export default AppRoot;