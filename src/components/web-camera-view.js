const numberFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const template = document.getElementById("template-camera-view");

class WebCameraView extends HTMLDivElement {
  constructor() {
    super();
    this.fragment = template.content.cloneNode(true);
    this.imageElement = this.fragment.querySelector('[data-name="image"]');
    this.nameElement = this.fragment.querySelector('[data-name="name"]');
    this.priceElement = this.fragment.querySelector('[data-name="price"]');
    this.descriptionElement = this.fragment.querySelector('[data-name="description"]');
  }

  connectedCallback() {
    this.classList.add("grid", "grid-cols-1", "gap-6", "lg:grid-cols-2");
    this.renderCameraView();
  }

  renderCameraView() {
    const cameraUUID = window.location.search.substring(1);
    return fetch(`http://localhost:3000/api/cameras/${cameraUUID}`)
      .then(response => response.json())
      .then(data => {
        this.innerHTML = "";
        this.createCameraView(data);
      })
      .catch(error => {
        this.innerHTML = "";
        this.textContent = "Il y'a eu une erreur pendant le chargement des données";
      });
  }

  createCameraView(camera) {
    document.title = `Orinoco — ${camera.name}`;
    this.imageElement.setAttribute("src", camera.imageUrl);
    this.nameElement.textContent = camera.name;
    this.priceElement.textContent = numberFormatter.format(camera.price / 100);
    this.descriptionElement.textContent = camera.description;
    this.append(this.fragment);
  }
}

export default WebCameraView;