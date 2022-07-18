import { getLocalCart, getLocalCartNumber } from "@utils/cart";

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

class WebCartButton extends HTMLAnchorElement {
  constructor() {
    super();
    this.badgeElement = this.querySelector('[data-name="badge"]');
  }

  connectedCallback() {
    console.log("button connected");
    this.renderBadge(false);
  }

  renderBadge(withAnimation = true) {
    const cart = getLocalCart();
    const cartNumber = getLocalCartNumber(cart);
    if (cartNumber <= 0) {
      if (this.contains(this.badgeElement)) this.removeChild(this.badgeElement);
      this.badgeElement.textContent = "0";
    } else {
      if (!this.contains(this.badgeElement)) this.append(this.badgeElement);
      this.badgeElement.textContent = String(cartNumber);
      if (withAnimation) this.badgeElement.animate(heartBeatAnimation, heartBeatAnimationTiming);
    }
  }
}

export default WebCartButton;