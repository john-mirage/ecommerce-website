class WebIndexView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
  }

  connectedCallback() {
    if (this.initialCall) {
      const webIndexHero = document.createElement("web-index-hero");
      const webIndexList = document.createElement("web-index-list");
      this.append(webIndexHero, webIndexList);
      this.initialCall = false;
    }
  }
}

export default WebIndexView;