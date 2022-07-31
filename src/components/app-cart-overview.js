import { cart } from "@utils/cart";

const heartBeatAnimation = [
  {
    transform: "scale(1)",
    offset: 0,
  },
  {
    transform: "scale(1.5)",
    offset: 0.14,
  },
  {
    transform: "scale(1)",
    offset: 0.28,
  },
  {
    transform: "scale(1.5)",
    offset: 0.42,
  },
  {
    transform: "scale(1)",
    offset: 0.7,
  },
];

const heartBeatAnimationTiming = {
  duration: 1000,
}

class AppCartOverview extends HTMLElement {
  constructor() {
    super();
    this.buttonElement = this.querySelector('[data-name="cart-button"]');
    this.badgeElement = this.querySelector('[data-name="cart-badge"]');
    this.modalElement = this.querySelector('[data-name="cart-modal"]');
    this.listElement = this.querySelector('[data-name="cart-list"]');
    this.cart = cart;
  }

  connectedCallback() {
    this.updateBadge();
  }

  updateBadge() {
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