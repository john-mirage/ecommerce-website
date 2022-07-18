import "@styles/main.css";
import WebCartButton from "@components/web-cart-button";
import WebCameraView from "@components/web-camera-view";

customElements.define("web-cart-button", WebCartButton, {extends: "a"});
customElements.define("web-camera-view", WebCameraView, {extends: "div"});

const cartButton = document.getElementById("cart-button");
const cameraView = document.getElementById("camera-view");

cameraView.addEventListener("update-cart-button", () => {
  cartButton.renderBadge();
});
