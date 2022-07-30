import "./main.css";

import { Cart } from "@utils/cart";

import AppRouter from "@components/app-router";
import AppHeader from "@components/app-header";
import AppView from "@components/app-view";
import AppPage from "@components/app-page";

import AppIndexPage from "@components/app-index-page";
import AppIndexProductList from "@components/app-index-product-list";
import AppIndexProduct from "@components/app-index-product";
import AppIndexProductSkeleton from "@components/app-index-product-skeleton";

import AppProductPage from "@components/app-product-page";
import AppProductDescription from "@components/app-product-description";
import AppProductDescriptionSkeleton from "@components/app-product-description-skeleton";

import AppCartPage from "@components/app-cart-page";

import AppErrorPage from "@components/app-error-page";

customElements.define("app-index-product-skeleton", AppIndexProductSkeleton);
customElements.define("app-index-product", AppIndexProduct);
customElements.define("app-index-product-list", AppIndexProductList);
customElements.define("app-index-page", AppIndexPage);

customElements.define("app-product-description-skeleton", AppProductDescriptionSkeleton);
customElements.define("app-product-description", AppProductDescription);
customElements.define("app-product-page", AppProductPage);

customElements.define("app-cart-page", AppCartPage);

customElements.define("app-error-page", AppErrorPage);

customElements.define("app-page", AppPage);
customElements.define("app-view", AppView);
customElements.define("app-header", AppHeader);
customElements.define("app-router", AppRouter);

const cart = new Cart([
  ["0000-0000-0000-0001", [
    ["50mm", 2],
    ["40mm", 1],
  ]],
  ["0000-0000-0000-0002", [
    ["100mm", 2],
    ["250mm", 3],
  ]],
]);

cart.deleteCameraByLens("0000-0000-0000-0002", "100mm");
cart.deleteCameraByLens("0000-0000-0000-0002", "250mm");

console.log(cart.cart);
