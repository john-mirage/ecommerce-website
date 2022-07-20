class WebHeader extends HTMLElement {
  constructor() {
    super();
    this.logoButton = this.querySelector('[data-name="logo-button"]');
    this.cartButton = this.querySelector('[data-name="cart-button"]');
    this.handleLogoButtonClick = this.handleLogoButtonClick.bind(this);
    this.handleCartButtonClick = this.handleCartButtonClick.bind(this);
  }

  connectedCallback() {
    this.logoButton.addEventListener("click", this.handleLogoButtonClick);
    this.cartButton.addEventListener("click", this.handleCartButtonClick);
  }

  disconnectedCallback() {
    this.logoButton.removeEventListener("click", this.handleLogoButtonClick);
    this.cartButton.removeEventListener("click", this.handleCartButtonClick);
  }

  handleLogoButtonClick() {
    const customEvent = new CustomEvent("router-link-click", { bubbles: true, detail: {link: "/orinoco/"}});
    this.dispatchEvent(customEvent);
  }

  handleCartButtonClick() {
    const customEvent = new CustomEvent("router-link-click", { bubbles: true, detail: {link: "/orinoco/panier"}});
    this.dispatchEvent(customEvent);
  }
}

export default WebHeader;