<template>
  <div class="container">
    <div class="h1" id="appName">MYLEAGUES</div>
    <login-register-form
      :isError="isError"
      :errorMessage="errorMessage"
      @submit="submitForm"
      @toggleMode="resetView"
    ></login-register-form>
  </div>
</template>

<script>
import LoginRegisterForm from "@/components/forms/LoginRegisterForm.vue";

import { store } from "@/store";

export default {
  components: {
    LoginRegisterForm,
  },
  data() {
    return {
      isError: false,
      errorMessage: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters["user/isLoggedIn"]) {
      next({ name: "home" });
    } else {
      next();
    }
  },
  methods: {
    navigateToHome() {
      this.$router.push({ name: "home" });
    },
    resetView() {
      (this.isError = false), (this.errorMessage = false);
    },
    async login(formData) {
      try {
        // Start spinner
        this.$store.dispatch("setIsGlobalLoading", true, { root: true });

        // Dispatch the login action
        await this.$store.dispatch("user/Login", {
          emailAddress: formData.emailAddress,
          password: formData.password,
        });
      } catch (error) {
        this.isError = true;
        this.errorMessage = error.message;
        return;
      } finally {
        this.$store.dispatch("setIsGlobalLoading", false, { root: true });
      }

      try {
        // Start spinner
        this.$store.dispatch("setIsGlobalLoading", true, { root: true });

        // Get the leagues for a user and navigate to the home page
        await this.$store.dispatch("user_leagues/GetLeaguesForUserAndAdd");
        this.navigateToHome();
      } catch (error) {
        this.$store.dispatch("setIsGlobalError", true, { root: true });
        this.$store.dispatch("setGlobalErrorMessage", error.message, {
          root: true,
        });
      } finally {
        this.$store.dispatch("setIsGlobalLoading", false, { root: true });
      }
    },
    async register(formData) {
      if (!this.passwordsMatch(formData)) {
        this.isError = true;
        this.errorMessage = "Passwords don't match.";
        return;
      }

      try {
        // Start spinner
        this.$store.dispatch("setIsGlobalLoading", true, { root: true });

        // Register the user and go to the home page.
        await this.$store.dispatch("user/Register", {
          emailAddress: formData.emailAddress,
          password: formData.password,
          username: formData.username,
        });
        this.navigateToHome();
      } catch (error) {
        this.isError = true;
        this.errorMessage = error.message;
        return;
      } finally {
        this.$store.dispatch("setIsGlobalLoading", false, { root: true });
      }
    },
    async submitForm(formData) {
      if (formData.mode === "login") {
        await this.login(formData);
      } else {
        await this.register(formData);
      }
    },
    passwordsMatch(formData) {
      return formData.password === formData.passwordConfirmation;
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  padding-top: 20%;
  width: 18rem;
  height: calc(var(--vh, 1vh) * 100);
  padding: auto;
  margin: auto;
}
#appName {
  font-size: 2rem;
  margin: auto;
  color: white;
  font-weight: 250;
  letter-spacing: 0.15em;
}
</style>
