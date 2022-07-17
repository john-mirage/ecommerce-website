const template = document.getElementById("template-camera-card-skeleton");

class WebCameraCardSkeleton extends HTMLLIElement {
  constructor() {
    super();
    this.fragment = template.content.cloneNode(true);
  }

  connectedCallback() {
    this.classList.add("space-y-1");
    this.append(this.fragment);
  }
}

export default WebCameraCardSkeleton;