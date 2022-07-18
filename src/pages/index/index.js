import "@styles/main.css";
import WebCartButton from "@components/web-cart-button";
import WebCameraList from "@components/web-camera-list";

customElements.define("web-cart-button", WebCartButton, {extends: "a"});
customElements.define("web-camera-list", WebCameraList, {extends: "ul"});

const cameraList = document.getElementById("camera-list");
cameraList.renderCameraCards();

const url = new URL(window.location.href);

