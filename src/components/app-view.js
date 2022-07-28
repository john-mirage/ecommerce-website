import { getFadeInAnimation, getFadeOutAnimation, fadeInAnimationTiming, fadeOutAnimationTiming } from "@utils/fade-animations";

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
      const fadeOut = this.animate(getFadeOutAnimation(isLeft), fadeOutAnimationTiming);
      fadeOut.onfinish = (event) => {
        this.appPage.setAttribute("page", nextPage);
        this.animate(getFadeInAnimation(isLeft), fadeInAnimationTiming);
      };
    } else {
      this.appPage.setAttribute("page", nextPage);
    }
    this.currentPage = nextPage;
  }
}

export default AppView;