import "./main.css";

import AppRouter from "@components/app-router";
import AppHeader from "@components/app-header";
import AppView from "@components/app-view";
import AppPage from "@components/app-page";

import AppIndexPage from "@components/app-index-page";
import AppProductPage from "@components/app-product-page";
import AppCartPage from "@components/app-cart-page";
import AppErrorPage from "@components/app-error-page";

import AppIndexProductList from "@components/app-index-product-list";
import AppIndexProduct from "@components/app-index-product";
import AppProductCamera from "@components/app-product-camera";

customElements.define("app-index-product-list", AppIndexProductList);
customElements.define("app-index-product", AppIndexProduct);
customElements.define("app-product-camera", AppProductCamera);

customElements.define("app-index-page", AppIndexPage);
customElements.define("app-product-page", AppProductPage);
customElements.define("app-cart-page", AppCartPage);
customElements.define("app-error-page", AppErrorPage);

customElements.define("app-page", AppPage);
customElements.define("app-view", AppView);
customElements.define("app-header", AppHeader);
customElements.define("app-router", AppRouter);
