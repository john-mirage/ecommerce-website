import "./main.css";
import WebCartButton from "./components/web-cart-button";
import WebCameraList from "./components/web-camera-list";

customElements.define("web-cart-button", WebCartButton, {extends: "button"});
customElements.define("web-camera-list", WebCameraList, {extends: "ul"});

const cameraList = document.getElementById("camera-list");
cameraList.renderCameraCards();
