<template>
  <div class="container">
    <div class="h1" id="appName">MYLEAGUES</div>
    <div id="separator">Social login</div>
    <div class="sso-option" @click="loginWithOAuth('google')">
      Google
      <!-- <google-login-icon></google-login-icon> -->
    </div>
    <div class="sso-option" @click="loginWithOAuth('microsoft')">
      Microsoft
      <!-- <microsoft-login-icon></microsoft-login-icon> -->
    </div>
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
import MicrosoftLoginIcon from "@/components/icons/MicrosoftLoginIcon.vue";

import { OAuthService } from "@/services/oauth";

import { store } from "@/store";

export default {
  components: {
    LoginRegisterForm,
    GoogleLoginIcon,
    MicrosoftLoginIcon,
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
    async loginWithOAuth(providerName) {
      let oauthService = new OAuthService();

      // Start spinner
      this.$store.dispatch("setIsGlobalLoading", true, { root: true });

      // Get the redirect URI for the OAuth provider
      let response = await oauthService.get_request_uri(providerName);

      // Redirect to the OAAuth provider
      window.location.href = response.request_uri;
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
  text-align: center;
}
.sso-option {
  width: 100%;
  height: 2rem;
  background-color: white;
  margin: 0.5rem auto;
  text-align: center;
  vertical-align: middle;
  padding: 0.25rem;
  cursor: pointer;
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
