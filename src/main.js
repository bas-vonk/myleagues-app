import { createApp } from "vue";
import App from "./App.vue";

import { router } from "./router";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "uikit/dist/css/uikit.css";
import "uikit/dist/js/uikit.js";
import "uikit";

import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
