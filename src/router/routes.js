import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import LeaguePage from "@/views/LeaguePage.vue";
import CallbackPage from "@/views/CallbackPage.vue";

const routes = [
  {
    name: "login",
    path: "/login",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    name: "home",
    path: "/home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    name: "callback",
    path: "/callback",
    component: CallbackPage,
    meta: { requiresAuth: false },
  },
  {
    name: "league",
    path: "/league/:id",
    component: LeaguePage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
];

export { routes };
