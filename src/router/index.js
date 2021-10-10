import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { store } from "@/store";

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

// Add authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters["user/isLoggedIn"]) {
    next({ name: "login" });
  } else {
    next();
  }
});

export { router };
