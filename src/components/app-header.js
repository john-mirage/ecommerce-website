class AppHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    const customEvent = new CustomEvent("navigation-link-click", {bubbles: true, detail: {href}});
    this.dispatchEvent(customEvent);
  }
}

export default AppHeader;