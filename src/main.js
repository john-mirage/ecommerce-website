import "./main.css";
import WebApp from "@components/web-app";
import WebHeader from "@components/web-header";
import WebCartButton from "@components/web-cart-button";
import WebIndexView from "@components/web-index-view";
import WebIndexHero from "@components/web-index-hero";
import WebIndexList from "@components/web-index-list";
import WebProductView from "@components/web-product-view";

customElements.define("web-app", WebApp, { extends: "div" });
customElements.define("web-header", WebHeader, { extends: "header" });
customElements.define("web-cart-button", WebCartButton, { extends: "button" });

customElements.define("web-index-view", WebIndexView);
customElements.define("web-index-hero", WebIndexHero);
customElements.define("web-index-list", WebIndexList);

customElements.define("web-product-view", WebProductView);