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

  switchPage(nextPage, isAnimated) {
    if (isAnimated) {
      const isLeft = level[this.currentPage] < level[nextPage];
      const fadeOut = this.animate(getFadeOutAndTranslateAnimation(isLeft), fadeOutAnimationTiming);
      fadeOut.onfinish = (event) => {
        this.appPage.setAttribute("page", nextPage);
        this.animate(getFadeInAndTranslateAnimation(isLeft), fadeInAnimationTiming);
      };
    } else {
      this.appPage.setAttribute("page", nextPage);
    }
    this.currentPage = nextPage;
  }
}

export default AppView;