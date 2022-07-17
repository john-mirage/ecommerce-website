class WebCameraList extends HTMLUListElement {
  constructor() {
    super();
    this.createCameraCard = this.createCameraCard.bind(this);
  }

  connectedCallback() {
    this.classList.add("grid", "grid-cols-1", "gap-8", "md:grid-cols-2", "lg:grid-cols-3", "lg:gap-10");
    this.renderCameraCardSkeletons();
    this.renderCameraCards();
  }

  renderCameraCardSkeletons() {
    for (let index = 0; index < 6; index++) {
      const cameraCardSkeleton = document.createElement("li", {is: "web-camera-card-skeleton"});
      this.append(cameraCardSkeleton);
    }
  }

  renderCameraCards() {
    return fetch('http://localhost:3000/api/cameras')
      .then(response => response.json())
      .then(data => {
        this.innerHTML = "";
        data.forEach(this.createCameraCard);
      })
      .catch(error => {
        this.innerHTML = "";
        this.textContent = "Il y'a eu une erreur pendant le chargement des données";
      });
  }

  createCameraCard(camera) {
    const cameraCard = document.createElement("li", {is: "web-camera-card"});
    cameraCard.camera = camera;
    this.append(cameraCard);
  }
}

export default WebCameraList;