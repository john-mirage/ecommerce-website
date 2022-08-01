import { cart } from "@utils/cart";
import { getOneCameraWithoutInteruption } from "@utils/camera-api";

const heartBeatAnimation = [
  { transform: "scale(1)", offset: 0 },
  { transform: "scale(1.5)", offset: 0.14 },
  { transform: "scale(1)", offset: 0.28 },
  { transform: "scale(1.5)", offset: 0.42 },
  { transform: "scale(1)", offset: 0.7 },
];

const fadeInAndTranslateAnimation = [
  { opacity: 0, transform: "translateY(-1rem)", offset: 0},
  { opacity: 1, transform: "translateY(0)", offset: 1 }
];

const fadeOutAndTranslateAnimation = [
  { opacity: 1, transform: "translateY(0)", offset: 0 },
  { opacity: 0, transform: "translateY(-1rem)", offset: 1 }
];

const heartBeatAnimationTiming = {
  duration: 1000,
}

const fadeAnimationTiming = {
  duration: 300,
  easing: "cubic-bezier(.43,1.6,.56,1)",
}

class AppCartOverview extends HTMLElement {
  constructor() {
    super();
    this.buttonElement = this.querySelector('[data-name="cart-button"]');
    this.badgeElement = this.querySelector('[data-name="cart-badge"]');
    this.modalElement = this.querySelector('[data-name="cart-modal"]');
    this.listElement = this.querySelector('[data-name="cart-list"]');
    this.emptyMessageElement = this.querySelector('[data-name="cart-empty-message"]');
    this.cart = cart;
    this.isOpen = false;
    this.isAnimating = false;
    this.appCartOverviewItem = document.createElement("app-cart-overview-item");
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    this.update();
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
    window.removeEventListener("click", this.handleOutsideClick);
  }

  update() {
    this.displayCartItems();
    this.updateButtonBadge();
  }

  async displayCartItems() {
    this.listElement.innerHTML = "";
    uuidsLoop:
    for (const uuid of this.cart.cart.keys()) {
      const { camera, error } = await getOneCameraWithoutInteruption(uuid);
      if (typeof error === "string") {
        switch(error) {
          case "error":
            break uuidsLoop;
          case "not-found":
            this.cart.deleteCameraByUuid(uuid);
            break;
          default:
            throw new Error("unknown error");
        }
      } else {
        const appCartOverviewItem = this.appCartOverviewItem.cloneNode(true);
        appCartOverviewItem.camera = camera;
        this.listElement.append(appCartOverviewItem);
      }
    }
  }

  handleButtonClick() {
    if (!this.isAnimating) {
      if (this.isOpen) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target)) {
      this.closeModal();
    }
  }

  openModal() {
    this.isAnimating = true;
    this.modalElement.classList.replace("hidden", "block");
    const fadeIn = this.modalElement.animate(fadeInAndTranslateAnimation, fadeAnimationTiming);
    fadeIn.onfinish = () => {
      this.isOpen = true;
      this.isAnimating = false;
      document.addEventListener("click", this.handleOutsideClick);
    };
  }

  closeModal() {
    document.removeEventListener("click", this.handleOutsideClick);
    this.isAnimating = true;
    const fadeOut = this.modalElement.animate(fadeOutAndTranslateAnimation, fadeAnimationTiming);
    fadeOut.onfinish = () => {
      this.modalElement.classList.replace("block", "hidden");
      this.isOpen = false;
      this.isAnimating = false;
    };
  }

  updateButtonBadge() {
    if (this.cart.itemsNumber > 0) {
      if (!this.contains(this.badgeElement)) {
        this.buttonElement.append(this.badgeElement);
      }
      this.badgeElement.animate(heartBeatAnimation, heartBeatAnimationTiming);
    } else {
      if (this.contains(this.badgeElement)) {
        this.buttonElement.removeChild(this.badgeElement);
      }
    }
    this.badgeElement.textContent = String(this.cart.itemsNumber);
  }
}

export default AppCartOverview;