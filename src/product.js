import "./main.css";
import WebCameraView from "./components/web-camera-view";

customElements.define("web-camera-view", WebCameraView, {extends: "div"});

const cameraView = document.getElementById("camera-view");
cameraView.renderCameraView();
