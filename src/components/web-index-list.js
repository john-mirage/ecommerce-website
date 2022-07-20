import currencyFormatter from "@utils/currency-formatter";

const listTemplate = document.getElementById("template-web-index-list");
const listItemTemplate = document.getElementById("template-web-index-list-item");
const listItemSkeletonTemplate = document.getElementById("template-web-index-list-item-skeleton");

class WebIndexList extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.fragment = listTemplate.content.cloneNode(true);
    this.listElement = this.fragment.querySelector('[data-name="list"]');
    this.getCameraCard = this.getCameraCard.bind(this);
    this.handleCameraCardClick = this.handleCameraCardClick.bind(this);
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.fragment);
      this.renderCameraCardSkeletons();
      this.renderCameraCards();
      this.initialCall = false;
    } else {
      this.renderCameraCardSkeletons();
      this.renderCameraCards();
    }
  }

  disconnectedCallback() {
    const linkElements = this.querySelectorAll('[data-name="link"]');
    if (linkElements.length > 0) {
      console.log("remove listenerss");
      linkElements.forEach((linkElement) => {
        linkElement.removeEventListener("click", this.handleCameraCardClick);
      });
    }
  }

  renderCameraCardSkeletons() {
    this.listElement.innerHTML = "";
    for (let index = 0; index < 6; index++) {
      const fragment = listItemSkeletonTemplate.content.cloneNode(true);
      this.listElement.append(fragment);
    }
  }

  renderCameraCards() {
    fetch('http://localhost:3000/api/cameras')
      .then(response => response.json())
      .then(cameras => {
        const cameraCards = cameras.map(this.getCameraCard);
        this.listElement.innerHTML = "";
        this.listElement.append(...cameraCards);
      })
      .catch(error => {
        console.log(error);
        this.listElement.innerHTML = "";
        this.listElement.textContent = "Erreur lors de la récupération des données";
      });
  }

  getCameraCard(camera) {
    const fragment = listItemTemplate.content.cloneNode(true);
    const linkElement = fragment.querySelector('[data-name="link"]');
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    linkElement.setAttribute("href", `/orinoco/produit?id=${camera._id}`);
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = currencyFormatter.format(camera.price / 100);
    console.log("add listener");
    linkElement.addEventListener("click", this.handleCameraCardClick);
    return fragment;
  }

  handleCameraCardClick(event) {
    event.preventDefault();
    const link = event.currentTarget.href;
    const customEvent = new CustomEvent("router-link-click", {bubbles: true, detail: {link}});
    this.dispatchEvent(customEvent);
  }
}

export default WebIndexList;