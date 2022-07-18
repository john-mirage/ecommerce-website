import { getLocalCart, addItemToLocalCart } from "@utils/cart";
import currencyFormatter from "@utils/currency-formatter";

const template = document.getElementById("template-camera-view");

class WebCameraView extends HTMLDivElement {
  constructor() {
    super();
  }

  renderCameraView() {
    const url = new URL(window.location.href);
    return fetch(`http://localhost:3000/api/cameras/${url.searchParams.get("id")}`)
      .then(response => response.json())
      .then(camera => {
        this.innerHTML = "";
        this.createCameraView(camera);
      })
      .catch(error => {
        this.innerHTML = "";
        this.textContent = "Il y'a eu une erreur pendant le chargement des données";
      });
  }

  createCameraView(camera) {
    const fragment = template.content.cloneNode(true);
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    const descriptionElement = fragment.querySelector('[data-name="description"]');
    this.cartButton = fragment.querySelector('[data-name="button"]');
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = currencyFormatter.format(camera.price / 100);
    descriptionElement.textContent = camera.description;
    this.append(fragment);
    this.cartButton.addEventListener("click", () => {
      const cart = getLocalCart();
      addItemToLocalCart(cart, camera._id);
      const customEvent = new CustomEvent("update-cart-button");
      this.dispatchEvent(customEvent);
    });
  }
}

export default WebCameraView;