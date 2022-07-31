import { cart } from "@utils/cart";

const heartBeatAnimation = [
  { transform: "scale(1)", offset: 0 },
  { transform: "scale(1.5)", offset: 0.14 },
  { transform: "scale(1)", offset: 0.28 },
  { transform: "scale(1.5)", offset: 0.42 },
  { transform: "scale(1)", offset: 0.7 },
];

const fadeInAndTranslateAnimation = [
  { opacity: 0, transform: "translateY(-2rem)", offset: 0},
  { opacity: 1, transform: "translateY(0)", offset: 1 }
];

const fadeOutAndTranslateAnimation = [
  { opacity: 1, transform: "translateY(0)", offset: 0 },
  { opacity: 0, transform: "translateY(-2rem)", offset: 1 }
];

const heartBeatAnimationTiming = {
  duration: 1000,
}

const fadeAnimationTiming = {
  duration: 300,
  easing: "ease-in-out",
}

class AppCartOverview extends HTMLElement {
  constructor() {
    super();
    this.buttonElement = this.querySelector('[data-name="cart-button"]');
    this.badgeElement = this.querySelector('[data-name="cart-badge"]');
    this.modalElement = this.querySelector('[data-name="cart-modal"]');
    this.listElement = this.querySelector('[data-name="cart-list"]');
    this.cart = cart;
    this.isOpen = false;
    this.isAnimating = false;
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  connectedCallback() {
    this.updateButtonBadge();
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  handleButtonClick() {
    console.log(this.isAnimating);
    if (!this.isAnimating) {
      if (this.isOpen) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  }

  openModal() {
    this.isAnimating = true;
    this.modalElement.classList.replace("hidden", "block");
    const fadeIn = this.modalElement.animate(fadeInAndTranslateAnimation, fadeAnimationTiming);
    fadeIn.onfinish = () => {
      this.isOpen = true;
      this.isAnimating = false;
    };
  }

  closeModal() {
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