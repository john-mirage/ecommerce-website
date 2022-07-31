class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.links = this.querySelectorAll('[data-name="link"]');
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  connectedCallback() {
    this.links.forEach((link) => {
      link.addEventListener("click", this.handleLinkClick);
    });
  }

  disconnectedCallback() {
    this.links.forEach((link) => {
      link.removeEventListener("click", this.handleLinkClick);
    });
  }

  handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    const customEvent = new CustomEvent("navigation-link-click", {bubbles: true, detail: {href}});
    this.dispatchEvent(customEvent);
  }
}

export default AppHeader;