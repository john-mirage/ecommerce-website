import "@styles/main.css";
import WebCartButton from "@components/web-cart-button";
import WebCartSummary from "@components/web-cart-summary";

customElements.define("web-cart-button", WebCartButton, { extends: "a" });
customElements.define("web-cart-summary", WebCartSummary, { extends: "div" });