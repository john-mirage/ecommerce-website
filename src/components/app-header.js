const template = document.getElementById("template-app-header");

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.links = this.fragment.querySelectorAll('[data-name="link"]');
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
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