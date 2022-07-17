import "./main.css";
import WebCameraView from "./components/web-camera-view";

customElements.define("web-camera-view", WebCameraView, {extends: "div"});

const product = document.getElementById("product");
const webCameraView = document.createElement("div", {is: "web-camera-view"});

product.append(webCameraView);
