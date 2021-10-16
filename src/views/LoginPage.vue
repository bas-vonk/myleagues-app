<template>
  <div class="container">
    <div class="h1" id="appName">MYLEAGUES</div>
    <form v-on:submit.prevent="submitForm">
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          placeholder="Email address"
          v-model="emailAddress"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="form-group" v-if="showRegisterFields">
        <input
          type="password"
          class="form-control"
          placeholder="Password confirmation"
          v-model="passwordConfirmation"
        />
      </div>
      <div class="form-group" v-if="showRegisterFields">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          v-model="username"
        />
      </div>
      <div class="alert alert-warning" v-if="isError">
        {{ errorMessage }}
      </div>
      <button type="submit" class="btn btn-primary">
        {{ buttonText }}
      </button>
    </form>
    <small id="modeSwitchText" @click="toggleMode()">{{
      modeSwitchText
    }}</small>
  </div>
</template>

<script>
import { store } from "@/store";

export default {
  beforeRouteEnter(to, from, next) {
    if (store.getters["user/isLoggedIn"]) {
      next({ name: "home" });
    } else {
      next();
    }
  },
  data() {
    return {
      mode: "login",
      emailAddress: null,
      password: null,
      passwordConfirmation: null,
      username: null,
      isError: false,
      errorMessage: null,
    };
  },
  methods: {
    toggleMode() {
      this.mode = this.mode !== "login" ? "login" : "register";
      this.isError = false;
      this.errorMessage = null;
    },
    navigateToHome() {
      this.$router.push({ name: "home" });
    },
    async login() {
      await this.$store.dispatch("user/Login", {
        emailAddress: this.emailAddress,
        password: this.password,
      });

      // Get the leagues for a user and navigate to the home page
      await store.dispatch("user_leagues/GetLeaguesForUserAndAdd");
      this.navigateToHome();
    },
    async register() {
      if (!this.passwordsMatch) {
        throw "Passwords don't match.";
      }

      // Register the user and go to the home page.
      await this.$store.dispatch("user/Register", {
        emailAddress: this.emailAddress,
        password: this.password,
        username: this.username,
      });
      this.navigateToHome();
    },
    async submitForm() {
      try {
        this.mode === "login" ? await this.login() : await this.register();
        this.isError = false;
        this.errorMessage = null;
      } catch (e) {
        this.isError = true;
        this.errorMessage = e;
      }
    },
  },
  computed: {
    buttonText() {
      return this.mode === "login" ? "Login" : "Register";
    },
    modeSwitchText() {
      return this.mode === "login" ? "Register instead." : "Login instead.";
    },
    showRegisterFields() {
      return this.mode === "register";
    },
    passwordsMatch() {
      return this.password === this.passwordConfirmation;
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  padding-top: 20%;
  width: 18rem;
  padding: auto;
  margin: auto;
}
.form-group {
  width: 100%;
  height: 100%;
  margin: auto;
  padding: auto;
}
#appName {
  font-size: 2rem;
  margin: auto;
  color: white;
  font-weight: 250;
  letter-spacing: 0.15em;
}
#modeSwitchText {
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px #000000;
}
button,
input {
  margin: 0.5rem auto;
  width: 100%;
  border-style: none;
}
button {
  background-color: #f79e02;
}
</style>
