import { getCartItemNumber } from "@utils/camera-cart";

const heartBeatAnimation = [
  {
    transform: "scale(1)",
    offset: 0,
  },
  {
    transform: "scale(1.3)",
    offset: 0.14,
  },
  {
    transform: "scale(1)",
    offset: 0.28,
  },
  {
    transform: "scale(1.3)",
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

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.logoLinkElement = this.querySelector('[data-name="logo-link"]');
    this.cartLinkElement = this.querySelector('[data-name="cart-link"]');
    this.cartBadgeElement = this.querySelector('[data-name="cart-badge"]');
  }

  get cartItemsNumber() {
    if (this.hasOwnProperty("_cartItemsNumber")) {
      return this._cartItemsNumber;
    } else {
      throw new Error("The cart items number is not defined");
    }
  }

  set cartItemsNumber(cartItemsNumber) {
    this._cartItemsNumber = cartItemsNumber;
    this.updateCartBadge(this.cartItemsNumber);
  }

  connectedCallback() {
    this.cartItemsNumber = getCartItemNumber();
    this.logoLinkElement.addEventListener("click", this.handleLinkClick);
    this.cartLinkElement.addEventListener("click", this.handleLinkClick);
  }

  disconnectedCallback() {
    this.logoLinkElement.removeEventListener("click", this.handleLinkClick);
    this.cartLinkElement.removeEventListener("click", this.handleLinkClick);
  }

  handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    const customEvent = new CustomEvent("navigation-link-click", {bubbles: true, detail: {href}});
    this.dispatchEvent(customEvent);
  }

  updateCartBadge(itemNumber) {
    if (itemNumber > 0) {
      if (!this.contains(this.cartBadgeElement)) {
        this.cartLinkElement.append(this.cartBadgeElement);
      }
      this.cartBadgeElement.animate(heartBeatAnimation, heartBeatAnimationTiming);
    } else {
      if (this.contains(this.cartBadgeElement)) {
        this.cartLinkElement.removeChild(this.cartBadgeElement);
      }
    }
    this.cartBadgeElement.textContent = String(itemNumber);
  }
}

export default AppHeader;