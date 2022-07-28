import "./main.css";

import {
  getCamerasNumberFromCart,
  addCamerasToCartBasedOnLens,
  updateCamerasFromCartBasedOnLens,
  deleteCamerasFromCartBasedOnLens,
  deleteCamerasFromCartBasedOnUuid,
  getCartWithApiData
} from "@utils/new-camera-cart";

import AppRoot from "@components/app-root";
import AppHeader from "@components/app-header";
import AppView from "@components/app-view";
import AppFooter from "@components/app-footer";

import AppIndexView from "@components/app-index-view";
import AppProductView from "@components/app-product-view";
import AppCartView from "@components/app-cart-view";
import AppErrorView from "@components/app-error-view";
import AppLoadingView from "@components/app-loading-view";

customElements.define("app-header", AppHeader);
customElements.define("app-view", AppView);
customElements.define("app-footer", AppFooter);

customElements.define("app-index-view", AppIndexView);
customElements.define("app-product-view", AppProductView);
customElements.define("app-cart-view", AppCartView);
customElements.define("app-error-view", AppErrorView);
customElements.define("app-loading-view", AppLoadingView);

customElements.define("app-root", AppRoot);

const cart = {
  "0000-0000-0000-0001": {
    numberByLens: {
      "20mm": 1,
      "30mm": 3,
    }
  },
  "0000-0000-0000-0002": {
    numberByLens: {
      "50mm": 1,
      "60mm": 3,
    }
  },
  "0000-0000-0000-0003": {
    numberByLens: {
      "80mm": 1,
    }
  },
};

const cameras = [
  {
    _id: "0000-0000-0000-0001",
    name: "name",
    description: "description",
    price: 2500,
    imageUrl: "path/to/image.jpg",
  },
  {
    _id: "0000-0000-0000-0002",
    name: "name",
    description: "description",
    price: 2500,
    imageUrl: "path/to/image.jpg",
  },
];

console.log(getCartWithApiData(cart, cameras));