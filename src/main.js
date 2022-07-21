import "./main.css";

import AppRoot from "@components/app-root";
import AppHeader from "@components/app-header";
import AppView from "@components/app-view";
import AppFooter from "@components/app-footer";

import AppIndexView from "@components/app-index-view";
import AppProductView from "@components/app-product-view";

customElements.define("app-header", AppHeader);
customElements.define("app-view", AppView);
customElements.define("app-footer", AppFooter);

customElements.define("app-index-view", AppIndexView);
customElements.define("app-product-view", AppProductView);

customElements.define("app-root", AppRoot);


const number = 0;
const string = "z"
const obj = {}
const obj2 = {cart: 1}
console.log(obj2.hasOwnProperty("cart"));
