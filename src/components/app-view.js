import { getFadeInAndTranslateAnimation, getFadeOutAndTranslateAnimation, fadeInAnimationTiming, fadeOutAnimationTiming } from "@utils/fade-animations";

const level = {
  "index": 1,
  "product": 2,
  "cart": 3,
};

class AppView extends HTMLElement {
  constructor() {
    super();
    this.currentPage = false;
    this.appPage = this.querySelector("app-page");
  }

  getNextPage(page) {
    if (typeof page === "string") {
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

  updateView(page) {
    if (typeof page === "string") {
      const nextPage = this.getNextPage(page);
      this.appPage.updatePage(nextPage);
      this.currentPage = nextPage;
    } else {
      throw new Error("The page must be a string");
    }
  }

  updateViewWithAnimation(page) {
    if (typeof page === "string") {
      if (this.currentPage) {
        const isLeft = level[this.currentPage] < level[pageName];
        const fadeOutAndTranslateAnimation = getFadeOutAndTranslateAnimation(isLeft);
        const fadeOut = this.animate(fadeOutAndTranslateAnimation, fadeOutAnimationTiming);
        fadeOut.onfinish = (event) => {
          this.appPage.setAttribute("page", pageName);
          const fadeInAndTranslateAnimation = getFadeInAndTranslateAnimation(isLeft);
          this.animate(fadeInAndTranslateAnimation, fadeInAnimationTiming);
        };
        this.currentPage = pageName;
      } else {
        throw new Error("A current page must be defined in order to animate the transition");
      }
    } else {
      throw new Error("The page must be a string");
    }
  }
}

export default AppView;