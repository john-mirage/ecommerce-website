const template = document.getElementById("template-app-cart-overview-item");

class AppCartOverviewItem extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = template.content.cloneNode(true);
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
  }
  
  get item() {
    const itemIsDefined = this.hasOwnProperty("_item");
    if (itemIsDefined) {
      return this._item;
    } else {
      throw new Error("The item is not defined");
    }
  }

  set item(item) {
    this._item = item;
    this.imageElement.setAttribute("src", this.item.imageUrl);
    this.nameElement.textContent = this.item.name;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.initialCall = false;
    }
  }
}

export default AppCartOverviewItem;