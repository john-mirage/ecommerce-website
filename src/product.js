import "./main.css";
import WebCartButton from "@components/web-cart-button";
import WebCameraView from "@components/web-camera-view";

customElements.define("web-cart-button", WebCartButton, {extends: "button"});
customElements.define("web-camera-view", WebCameraView, {extends: "div"});

const cameraView = document.getElementById("camera-view");
cameraView.renderCameraView();
