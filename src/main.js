import "./main.css";

import AppRouter from "@components/app-router";
import AppHeader from "@components/app-header";
import AppView from "@components/app-view";
import AppFooter from "@components/app-footer";

import AppIndexView from "@components/views/app-index-view";
import AppProductView from "@components/views/app-product-view";
import AppCartView from "@components/views/app-cart-view";
import AppErrorView from "@components/views/app-error-view";

customElements.define("app-header", AppHeader);
customElements.define("app-view", AppView);
customElements.define("app-footer", AppFooter);

customElements.define("app-index-view", AppIndexView);
customElements.define("app-product-view", AppProductView);
customElements.define("app-cart-view", AppCartView);
customElements.define("app-error-view", AppErrorView);

customElements.define("app-router", AppRouter);
