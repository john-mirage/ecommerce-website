import currencyFormatter from "@utils/currency-formatter";

const template = document.getElementById("template-camera-card");

class WebCameraList extends HTMLUListElement {
  constructor() {
    super();
  }

  renderCameraCards() {
    return fetch('http://localhost:3000/api/cameras')
      .then(response => response.json())
      .then(cameras => {
        this.innerHTML = "";
        cameras.forEach((camera) => {
          this.createCameraCard(camera);
        });
      })
      .catch(error => {
        this.innerHTML = "";
        this.textContent = "Il y'a eu une erreur pendant le chargement des données";
      });
  }

  createCameraCard(camera) {
    const fragment = template.content.cloneNode(true);
    const linkElement = fragment.querySelector('[data-name="link"]');
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    linkElement.setAttribute("href", `/orinoco/product.html?id=${camera._id}`);
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = currencyFormatter.format(camera.price / 100);
    this.append(fragment);
  }
}

export default WebCameraList;