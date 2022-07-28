const template = document.getElementById("template-app-error-view");

class AppErrorView extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.titleElement = this.fragment.querySelector('[data-name="title"]');
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
  }

  get message() {
    if (this.hasOwnProperty("_message") && this._message !== undefined) {
      return this._message;
    } else {
      throw new Error("The message is not defined");
    }
  }

  get image() {
    if (this.hasOwnProperty("_image") && this._image !== undefined) {
      return this._image;
    } else {
      throw new Error("The image is not defined");
    }
  }

  set message(message) {
    this._message = message;
    this.titleElement.textContent = this.message;
  }

  set image(image) {
    this._image = image;
    this.imageElement.setAttribute("src", this.image);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("flex", "flex-col", "min-h-screen");
      this.append(this.fragment);
      this.initialCall = false;
    }
  }
}

export default AppErrorView;