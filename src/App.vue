<template>
  <the-header
    v-if="isLoggedIn"
    :leagues="leagues"
    :username="username"
  ></the-header>
  <router-view />
</template>

<script>
import TheHeader from "./layout/TheHeader.vue";
import { mapGetters } from "vuex";
import { store } from "@/store";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  created() {
    // Set the locale
    this.setLocaleFromStore();

    // Set the initial window height
    this.setWindowHeight();

    // We listen to the resize event
    window.addEventListener("resize", () => {
      this.setWindowHeight();
    });
  },
  async mounted() {
    if (store.getters["user/accessToken"]) {
      // Parse the JWT token and store info in the application state
      store.dispatch("user/StoreAccessTokenData", {
        accessToken: store.getters["user/accessToken"],
      });

      // Get the leagues for a user
      await store.dispatch("user_leagues/GetLeaguesForUser");
    }
  },
  methods: {
    setLocaleFromStore() {
      let locale = this.$store.getters["user/locale"];
      this.$root.$i18n.locale = locale;
    },
    setWindowHeight() {
      let vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      username: "user/username",
      leagues: "user_leagues/leagues",
    }),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  /* --extra-menu-vh is set in the Header component. */
  height: calc(var(--vh, 1vh) * 100 + var(--extra-menu-vh, 0vh));
  background-image: url("assets/background.jpeg");
  background-size: cover;
  background-position: 50% 60%;
  background-attachment: local;
}
</style>
