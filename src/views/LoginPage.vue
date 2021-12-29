<template>
  <div class="container">
    <div class="h1" id="appName">MYLEAGUES</div>
    <div id="separator">Social login</div>
    <google-login-icon @click="loginWithGoogle"></google-login-icon>
    <div id="separator">or</div>
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
import GoogleLoginIcon from "@/components/icons/GoogleLoginIcon.vue";

import { SamlService } from "@/services/saml";

import { store } from "@/store";

export default {
  components: {
    LoginRegisterForm,
    GoogleLoginIcon,
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
    async loginWithGoogle() {
      let samlService = new SamlService();

      // Get the redirect URI for the SAML provider
      let response = await samlService.get_request_uri("google");

      // Redirect to the SAML provider
      location = response.request_uri;
    },
    async login(formData) {
      try {
        // Start spinner
        this.$store.dispatch("setIsGlobalLoading", true, { root: true });

        // Dispatch the login action
        await this.$store.dispatch("user/Login", {
          username: formData.username,
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
          username: formData.username,
          password: formData.password,
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
  padding-top: 10rem;
  width: 18rem;
  height: calc(var(--vh, 1vh) * 100);
  padding: auto;
  margin: auto;
}
#separator {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px #000000;
  text-align: center;
}
#separator:before,
#separator:after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid #fff;
  margin: auto;
}
#separator:before {
  margin-right: 10px;
}
#separator:after {
  margin-left: 10px;
}

#appName {
  font-size: 2rem;
  margin: auto;
  color: white;
  font-weight: 250;
  letter-spacing: 0.15em;
}
</style>
