const page = {
  "/orinoco/": "index",
  "/orinoco/produit": "product",
  "/orinoco/panier": "cart",
};

class AppRouter extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.appHeader = this.querySelector("app-header");
    this.appView = this.querySelector("app-view");
    this.currentHref = "";
    this.handleNavigationPopState = this.handleNavigationPopState.bind(this);
    this.handleNavigationLink = this.handleNavigationLink.bind(this);
  }

  connectedCallback() {
    if (this.initialCall) {
      const href = window.location.href;
      this.handleNavigation(href);
      this.currentHref = href;
      this.initialCall = false;
    }
    window.addEventListener("popstate", this.handleNavigationPopState);
    this.addEventListener("navigation-link-click", this.handleNavigationLink);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleNavigationPopState);
    this.removeEventListener("navigation-link-click", this.handleNavigationLink);
  }

  handleNavigationPopState(event) {
    const href = window.location.href;
    if (this.currentHref !== href) {
      this.handleNavigation(window.location.href);
      this.currentHref = href;
    }
  }

  handleNavigationLink(event) {
    const href = event.detail.href;
    if (this.currentHref !== href) {
      window.history.pushState({}, "", href);
      this.handleNavigation(href, true);
      this.currentHref = href;
    }
  }

  handleNavigation(href, isAnimated = false) {
    const url = new URL(href);
    const nextPage= page[url.pathname] ?? "not-found";
    this.appView.switchPage(nextPage, isAnimated);
  }
}

export default AppRouter;