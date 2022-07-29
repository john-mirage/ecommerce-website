import {
  getFadeInAndTranslateAnimation,
  getFadeOutAndTranslateAnimation,
  fadeInAnimationTiming,
  fadeOutAnimationTiming
} from "@utils/fade-animations";

class AppView extends HTMLElement {
  constructor() {
    super();
    this.appPage = this.querySelector("app-page");
  }

  getNextPage(pageName) {
    if (typeof pageName === "string") {
      switch (pageName) {
        case "index":
          return this.appPage.indexPage;
        case "product":
          return this.appPage.productPage;
        case "cart":
          return this.appPage.cartPage;
        case "not-found":
          return this.appPage.errorPage;
        default:
          throw new Error("the page do not exist");
      }
    } else {
      throw new Error("The page must be a string");
    }
  }

  updateView(pageName) {
    if (typeof pageName === "string") {
      const nextPage = this.getNextPage(pageName);
      this.appPage.updatePage(nextPage);
    } else {
      throw new Error("The page must be a string");
    }
  }

  updateViewWithAnimation(pageName) {
    if (typeof pageName === "string") {
      if (this.appPage.currentPage instanceof HTMLElement) {
        const currentPage = this.appPage.currentPage;
        const nextPage = this.getNextPage(pageName);
        if (typeof currentPage.level === "number" && typeof nextPage.level === "number") {
          const isLeft = currentPage.level < nextPage.level;
          const fadeOutAndTranslateAnimation = getFadeOutAndTranslateAnimation(isLeft);
          const fadeOut = this.animate(fadeOutAndTranslateAnimation, fadeOutAnimationTiming);
          fadeOut.onfinish = () => {
            this.appPage.updatePage(nextPage);
            const fadeInAndTranslateAnimation = getFadeInAndTranslateAnimation(isLeft);
            this.animate(fadeInAndTranslateAnimation, fadeInAnimationTiming);
          };
        } else {
          throw new Error("Both current page and next page must have a valid level");
        }
      } else {
        throw new Error("A current page must be defined in order to animate the transition");
      }
    } else {
      throw new Error("The page must be a string");
    }
  }
}

export default AppView;