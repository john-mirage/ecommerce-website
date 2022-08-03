export function getFadeInAndTranslateXAnimation(toLeft) {
  return [
    { opacity: 0, transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)", offset: 0 },
    { opacity: 1, transform: "translateX(0)", offset: 1 }
  ];
}

export function getFadeOutAndTranslateXAnimation(toLeft) {
  return [
    { opacity: 1, transform: "translateX(0)", offset: 0 },
    { opacity: 0, transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)", offset: 1 }
  ];
}

export const fadeAndTranslateXAnimationTiming = {
  duration: 300,
  easing: "ease-in-out",
}

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
          const fadeOutAndTranslateXanimation = getFadeOutAndTranslateXAnimation(isLeft);
          const fadeOut = this.animate(fadeOutAndTranslateXanimation, fadeAndTranslateXAnimationTiming);
          fadeOut.onfinish = () => {
            this.appPage.updatePage(nextPage);
            const fadeInAndTranslateXanimation = getFadeInAndTranslateXAnimation(isLeft);
            this.animate(fadeInAndTranslateXanimation, fadeAndTranslateXAnimationTiming);
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