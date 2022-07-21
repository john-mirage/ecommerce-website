const template = document.getElementById("template-app-header");

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
    this.fragment = template.content.cloneNode(true);
    this.logoLinkElement = this.fragment.querySelector('[data-name="logo-link"]');
    this.cartLinkElement = this.fragment.querySelector('[data-name="cart-link"]');
    this.cartBadgeElement = this.fragment.querySelector('[data-name="cart-badge"]');
  }

  connectedCallback() {
    this.append(this.fragment);
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
    const customEvent = new CustomEvent("router-link-click", {bubbles: true, detail: {href}});
    this.dispatchEvent(customEvent);
  }

  updateCartBadge(itemNumber, animated = false) {
    if (itemNumber > 0) {
      if (!this.contains(this.cartBadgeElement)) {
        this.cartLinkElement.append(this.cartBadgeElement);
      }
      if (animated) {
        this.cartBadgeElement.animate(heartBeatAnimation, heartBeatAnimationTiming);
      }
    } else {
      if (this.contains(this.cartBadgeElement)) {
        this.cartLinkElement.removeChild(this.cartBadgeElement);
      }
    }
    this.cartBadgeElement.textContent = String(itemNumber);
  }
}

export default AppHeader;