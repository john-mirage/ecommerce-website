import errorImage from "@images/error.svg";
import notFoundImage from "@images/not-found.svg";
import emptyCartImage from "@images/empty-cart.svg";

function getFadeInAnimation(toLeft) {
  return [
    {
      opacity: 0,
      transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)",
      offset: 0
    },
    {
      opacity: 1,
      transform: "translateX(0)",
      offset: 1
    }
  ];
}

function getFadeOutAnimation(toLeft) {
  return [
    {
      opacity: 1,
      transform: "translateX(0)",
      offset: 0
    },
    {
      opacity: 0,
      transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)",
      offset: 1
    }
  ];
}

const fadeInAnimationTiming = {
  duration: 300,
  fill: "forwards",
  easing: "ease-in-out",
}

const fadeOutAnimationTiming = {
  duration: 300,
  easing: "ease-in-out",
}

class AppView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.appIndexView = false;
    this.appProductView = false;
    this.appCartView = false;
    this.appErrorView = false;
    this.currentView = false;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.mainElement);
      this.initialCall = false;
    }
  }
  
  switchToLoadingView() {

  }

  switchToIndexView(cameras) {
    if (this.currentView) {
      const level = this.appIndexView ? this.appIndexView.level : 1;
      const toLeft = this.currentView.level < level;
      const fadeOut = this.currentView.animate(getFadeOutAnimation(toLeft), fadeOutAnimationTiming);
      fadeOut.onfinish = (event) => {
        this.innerHTML = "";
        this.appIndexView = this.indexView ? this.indexView : document.createElement("app-index-view");
        this.appIndexView.cameras = cameras;
        this.append(this.appIndexView);
        window.scrollTo({top: 0, left: 0});
        this.appIndexView.animate(getFadeInAnimation(toLeft), fadeInAnimationTiming);
        this.currentView = this.appIndexView;
        document.title = "Orinoco — Appareil photos anciens";
        console.log("switch to index view");
      };
    } else {
      this.innerHTML = "";
      this.appIndexView = this.indexView ? this.indexView : document.createElement("app-index-view");
      this.appIndexView.cameras = cameras;
      this.append(this.appIndexView);
      this.currentView = this.appIndexView;
      document.title = "Orinoco — Appareil photos anciens";
      console.log("switch to index view");
    }
  }

  switchToProductView(camera) {
    if (this.currentView) {
      const level = this.appProductView ? this.appProductView.level : 2;
      const toLeft = this.currentView.level < level;
      const fadeOut = this.currentView.animate(getFadeOutAnimation(toLeft), fadeOutAnimationTiming);
      fadeOut.onfinish = (event) => {
        this.innerHTML = "";
        this.appProductView = this.appProductView ? this.appProductView : document.createElement("app-product-view");
        this.appProductView.camera = camera;
        this.append(this.appProductView);
        window.scrollTo({top: 0, left: 0});
        this.appProductView.animate(getFadeInAnimation(toLeft), fadeInAnimationTiming);
        this.currentView = this.appProductView;
        document.title = `Orinoco — ${camera.name}`;
        console.log("switch to product view");
      };
    } else {
      this.innerHTML = "";
      this.appProductView = this.appProductView ? this.appProductView : document.createElement("app-product-view");
      this.appProductView.camera = camera;
      this.append(this.appProductView);
      this.currentView = this.appProductView;
      document.title = `Orinoco — ${camera.name}`;
      console.log("switch to product view"); 
    }
  }

  switchToFilledCartView(cart) {
    if (this.currentView) {
      const level = this.appCartView ? this.appCartView.level : 3;
      const toLeft = this.currentView.level < level;
      const fadeOut = this.currentView.animate(getFadeOutAnimation(toLeft), fadeOutAnimationTiming);
      fadeOut.onfinish = (event) => {
        this.innerHTML = "";
        this.appCartView = this.appCartView ? this.appCartView : document.createElement("app-cart-view");
        this.appCartView.cart = cart;
        this.append(this.appCartView);
        window.scrollTo({top: 0, left: 0});
        this.appCartView.animate(getFadeInAnimation(toLeft), fadeInAnimationTiming);
        this.currentView = this.appCartView;
        document.title = "Orinoco — Mon panier";
        console.log("switch to cart view");
      };
    } else {
      this.innerHTML = "";
      this.appCartView = this.appCartView ? this.appCartView : document.createElement("app-cart-view");
      this.appCartView.cart = cart;
      this.append(this.appCartView);
      this.currentView = this.appCartView;
      document.title = "Orinoco — Mon panier";
      console.log("switch to cart view");
    }
  }

  switchToErrorView() {
    document.title = "Orinoco — Erreur";
    this.innerHTML = "";
    this.appErrorView = this.appErrorView ? this.appErrorView : document.createElement("app-error-view");
    this.appErrorView.message = "Oups, il semble que l'application ne fonctionne pas correctement";
    this.appErrorView.image = errorImage;
    this.append(this.appErrorView);
    this.currentView = this.appErrorView;
    console.log("switch to error view");
  }

  switchToNotFoundView() {
    document.title = "Orinoco — Page introuvable";
    this.innerHTML = "";
    this.appErrorView = this.appErrorView ? this.appErrorView : document.createElement("app-error-view");
    this.appErrorView.message = "Oups, il semble que la page n'existe pas";
    this.appErrorView.image = notFoundImage;
    this.append(this.appErrorView);
    this.currentView = this.appErrorView;
    console.log("switch to not found view");
  }

  switchToEmptyCartView() {
    document.title = "Orinoco — Le panier est vide";
    this.innerHTML = "";
    this.appErrorView = this.appErrorView ? this.appErrorView : document.createElement("app-error-view");
    this.appErrorView.message = "Votre panier est vide";
    this.appErrorView.image = emptyCartImage;
    this.append(this.appErrorView);
    this.currentView = this.appErrorView;
    console.log("switch to empty cart view");
  }
}

export default AppView;