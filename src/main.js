import "./main.css";

import AppRouter from "@components/app-router";
import AppView from "@components/app-view";
import AppPage from "@components/app-page";
import AppHeader from "@components/app-header";
import AppFooter from "@components/app-footer";

customElements.define("app-header", AppHeader);
customElements.define("app-footer", AppFooter);

customElements.define("app-view", AppView);
customElements.define("app-page", AppPage);
customElements.define("app-router", AppRouter);
