/* istanbul ignore file */

import { createApp } from "vue";
import App from "./App.vue";
import VueGtag from "vue-gtag";

import { router } from "./router";
import { store } from "./store";
import { i18n } from "./locale";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "flag-icon-css/css/flag-icon.css";
import "uikit/dist/css/uikit.css";
import "uikit/dist/js/uikit.js";
import "uikit";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.use(VueGtag, {
  config: { id: "G-M3655P6W7N", params: { send_page_view: false } },
});

app.mount("#app");
