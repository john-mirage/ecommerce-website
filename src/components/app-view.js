import { getFadeInAnimation, getFadeOutAnimation, fadeInAnimationTiming, fadeOutAnimationTiming } from "@utils/fade-animations";

const level = {
  "index": 1,
  "product": 2,
  "cart": 3,
};

class AppView extends HTMLElement {
  constructor() {
    super();
    this.currentView = false;
    this.appPage = this.querySelector("app-page");
  }

  switchView(nextView, isAnimated) {
    if (this.currentView && isAnimated) {
      const isLeft = level[this.currentView] < level[nextView];
      const fadeOut = this.animate(getFadeOutAnimation(isLeft), fadeOutAnimationTiming);
      fadeOut.onfinish = (event) => {
        
        this.animate(getFadeInAnimation(isLeft), fadeInAnimationTiming);
      };
    } else {
      
    }
    this.currentView = nextView;
  }
}

export default AppView;