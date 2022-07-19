import { getLocalCart } from "@utils/cart";
import currencyFormatter from "@utils/currency-formatter";

const template = document.getElementById("template-cart-item-card");

class WebCartSummary extends HTMLDivElement {
  constructor() {
    super();
    this.listElement = this.querySelector('[data-name="list"]');
  }

  connectedCallback() {
    const cart = getLocalCart();
    if (cart) {

    } else {
      
    }
  }

  renderCartItem(item) {
    fetch(`http://localhost:3000/api/cameras/${item.id}`)
      .then(response => response.json())
      .then(camera => {
        this.createCartItemCard(camera, item.number);
      })
      .catch(error => {
        this.listElement.innerHTML = "";
        this.listElement.textContent = "Il y'a eu une erreur pendant le chargement des données";
      });
  }

  createCartItemCard(camera, number) {
    const fragment = template.content.cloneNode(true);
    const imageElement = fragment.querySelector('[data-name="image"]');
    const nameElement = fragment.querySelector('[data-name="name"]');
    const priceElement = fragment.querySelector('[data-name="price"]');
    imageElement.setAttribute("src", camera.imageUrl);
    nameElement.textContent = camera.name;
    priceElement.textContent = currencyFormatter.format(camera.price / 100);
    this.listElement.append(fragment);
  }
}

export default WebCartSummary;