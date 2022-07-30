import { Cart } from "@utils/cart";

class AppRouter extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.appHeader = this.querySelector("app-header");
    this.appView = this.querySelector("app-view");
    this.currentHref = "";
    this.handleNavigationPopState = this.handleNavigationPopState.bind(this);
    this.handleNavigationLink = this.handleNavigationLink.bind(this);
    this.cart = new Cart();
  }

  connectedCallback() {
    if (this.initialCall) {
      const href = window.location.href;
      this.handleNavigation(href);
      this.currentHref = href;
      this.initialCall = false;
    }
    this.appHeader.cartItemsNumber = this.cart.itemsNumber;
    window.addEventListener("popstate", this.handleNavigationPopState);
    this.addEventListener("navigation-link-click", this.handleNavigationLink);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleNavigationPopState);
    this.removeEventListener("navigation-link-click", this.handleNavigationLink);
  }

  handleNavigationPopState() {
    const href = window.location.href;
    if (this.currentHref !== href) {
      this.handleNavigation(window.location.href);
      this.currentHref = href;
    }
  }

  handleNavigationLink(customEvent) {
    if (customEvent instanceof CustomEvent) {
      const { href } = customEvent.detail;
      if (this.currentHref !== href) {
        window.history.pushState({}, "", href);
        this.handleNavigation(href, true);
        this.currentHref = href;
      }
    } else {
      throw new Error("The event must be a custom event in order to extract the href");
    }
  }

  getPageName(href) {
    if (typeof href === "string") {
      const url = new URL(href);
      switch(url.pathname) {
        case "/orinoco/":
          return "index";
        case "/orinoco/produit":
          return "product";
        case "/orinoco/panier":
          return "cart";
        default:
          return "not-found";
      } 
    } else {
      throw new Error("The href must be a string");
    }
  }

  handleNavigation(href, isAnimated = false) {
    if (typeof href === "string") {
      const pageName = this.getPageName(href);
      if (typeof isAnimated === "boolean") {
        if (isAnimated) {
          this.appView.updateViewWithAnimation(pageName);
        } else {
          this.appView.updateView(pageName);
        }
      } else {
        throw new Error("IsAnimated must be a boolean");
      }
    } else {
      throw new Error("The href must be a string");
    }
  }
}

export default AppRouter;