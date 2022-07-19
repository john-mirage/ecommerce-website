import "./main.css";
import { URLHasValidUuid, getUrlPathname } from "@utils/url";

const routes = {
  "404": {
    component: "web-404",
    title: "Orinoco - La page n'existe pas",
    checkers: [],
  },
  "/orinoco": {
    component: "web-index",
    title: "Orinoco - Appareil photos anciens",
    checkers: [],
  },
  "/orinoco/produit": {
    component: "web-product",
    title: "Orinoco - Page produit",
    checkers: [URLHasValidUuid],
  },
  "/orinoco/panier": {
    component: "web-cart",
    title: "Orinoco - Mon panier",
    checkers: [],
  }
};

document.getElementById("accueil").addEventListener("click", linkHandler);
document.getElementById("produit").addEventListener("click", linkHandler);
document.getElementById("produit-2").addEventListener("click", linkHandler);
document.getElementById("panier").addEventListener("click", linkHandler);

function linkHandler(event) {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  locationHandler();
}

function locationHandler() {
  const pathname = getUrlPathname(window.location.href);
  const base = routes[pathname] || routes["404"];
  const route = base.checkers.every(checker => checker(window.location.href)) ? base : routes["404"];
  document.title = route.title;
}

window.addEventListener("popstate", locationHandler);

locationHandler();