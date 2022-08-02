const template = document.getElementById("template-app-cart-overview-item-skeleton");

class AppCartOverviewItemSkeleton extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }
}

export default AppCartOverviewItemSkeleton;