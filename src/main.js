import "./main.css";
import WebCameraList from "./components/web-camera-list";
import WebCameraCard from "./components/web-camera-card";
import WebCameraCardSkeleton from "./components/web-camera-card-skeleton";

customElements.define("web-camera-list", WebCameraList, {extends: "ul"});
customElements.define("web-camera-card", WebCameraCard, {extends: "li"});
customElements.define("web-camera-card-skeleton", WebCameraCardSkeleton, {extends: "li"});

const trending = document.getElementById("trending");
const webCameraList = document.createElement("ul", {is: "web-camera-list"});
trending.append(webCameraList);