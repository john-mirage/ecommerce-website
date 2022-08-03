import "./main.css";

import AppRouter from "@components/app-router";
import AppHeader from "@components/app-header";
import AppView from "@components/app-view";
import AppPage from "@components/app-page";

import AppHomePage from "@components/home/app-home-page";
import AppHomeProductList from "@components/home/app-home-product-list";
import AppHomeProduct from "@components/home/app-home-product";
import AppHomeProductSkeleton from "@components/home/app-home-product-skeleton";

import AppProductPage from "@components/product/app-product-page";
import AppProductDescription from "@components/product/app-product-description";
import AppProductDescriptionSkeleton from "@components/product/app-product-description-skeleton";

import AppCartItemSkeleton from "@components/cart/app-cart-item-skeleton";
import AppCartItem from "@components/cart/app-cart-item";
import AppCart from "@components/cart/app-cart";
import AppCartSummary from "@components/cart/app-cart-summary";
import AppCartForm from "@components/cart/app-cart-form";
import AppCartOverview from "@components/cart/app-cart-overview";
import AppCartPage from "@components/cart/app-cart-page";

import AppErrorPage from "@components/error/app-error-page";

customElements.define("app-home-product-skeleton", AppHomeProductSkeleton);
customElements.define("app-home-product", AppHomeProduct);
customElements.define("app-home-product-list", AppHomeProductList);
customElements.define("app-home-page", AppHomePage);

customElements.define("app-product-description-skeleton", AppProductDescriptionSkeleton);
customElements.define("app-product-description", AppProductDescription);
customElements.define("app-product-page", AppProductPage);

customElements.define("app-cart-item-skeleton", AppCartItemSkeleton);
customElements.define("app-cart-item", AppCartItem);
customElements.define("app-cart", AppCart);
customElements.define("app-cart-summary", AppCartSummary);
customElements.define("app-cart-form", AppCartForm);
customElements.define("app-cart-overview", AppCartOverview);
customElements.define("app-cart-page", AppCartPage);

customElements.define("app-error-page", AppErrorPage);

customElements.define("app-page", AppPage);
customElements.define("app-view", AppView);
customElements.define("app-header", AppHeader);
customElements.define("app-router", AppRouter);
