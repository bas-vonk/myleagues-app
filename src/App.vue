<template>
  <the-header
    v-if="isLoggedIn"
    :leagues="leagues"
    :username="username"
    :picture="picture"
  ></the-header>
  <loading-spinner v-if="isGlobalLoading"></loading-spinner>
  <error-message
    v-if="isGlobalError"
    @close="resetErrorAndGoToLogin()"
    :errorMessage="globalErrorMessage"
  ></error-message>
  <div id="page-content">
    <div id="overlay"></div>
    <router-view v-if="!isGlobalError" />
  </div>
</template>

<script>
import TheHeader from "@/components/ui/TheHeader.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";

import { BaseService } from "@/services/base.js";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TheHeader,
    LoadingSpinner,
    ErrorMessage,
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

    // Probe whether the backend is alive (also used to activate the backend in App Engine)
    let baseService = new BaseService();
    baseService
      .call_healthcheck()
      .then(() => null)
      .catch(() => {
        this.$store.dispatch("setIsGlobalError", true, { root: true });
        this.$store.dispatch("setGlobalErrorMessage", "API unavailable.", {
          root: true,
        });
      });
  },
  async mounted() {
    if (this.$store.getters["user/accessToken"]) {
      // Parse the JWT token and store info in the application state
      this.$store.dispatch("user/StoreAccessTokenData", {
        accessToken: this.$store.getters["user/accessToken"],
      });

      try {
        // Start spinner
        this.$store.dispatch("setIsGlobalLoading", true, { root: true });

        // Get the leagues for a user
        await this.$store.dispatch("user_leagues/GetLeaguesForUserAndAdd");
      } catch (error) {
        this.$store.dispatch("setIsGlobalError", true, { root: true });
        this.$store.dispatch("setGlobalErrorMessage", error.message, {
          root: true,
        });
      } finally {
        // Stop spinner
        this.$store.dispatch("setIsGlobalLoading", false, { root: true });
      }
    }
  },
  methods: {
    resetErrorAndGoToLogin() {
      this.$store.dispatch("setIsGlobalError", false, { root: true });
      this.$store.dispatch("setGlobalErrorMessage", "", { root: true });

      this.$store.dispatch("user/Logout");

      this.$router.push({ name: "login" });
    },
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
      isGlobalLoading: "isGlobalLoading",
      isGlobalError: "isGlobalError",
      globalErrorMessage: "globalErrorMessage",
      isLoggedIn: "user/isLoggedIn",
      username: "user/username",
      picture: "user/picture",
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
#page-content {
  position: relative;
}
#overlay {
  position: absolute; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
.fixed-position {
  position: fixed;
  height: 100vh;
  z-index: 2000;
}
</style>
