<template>
  <form v-on:submit.prevent="submitForm">
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        v-model="username"
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
    <div class="alert alert-warning" v-if="showWarningUseSSOInstead">
      Forgot password functionality is not available. Use social login instead.
    </div>
    <div class="alert alert-warning" v-if="isError">
      {{ errorMessage }}
    </div>
    <button type="submit" class="btn btn-primary">
      {{ buttonText }}
    </button>
    <small id="modeSwitchText" @click="toggleMode()">
      {{ modeSwitchText }}
    </small>
  </form>
</template>

<script>
export default {
  props: ["isError", "errorMessage"],
  emits: ["submit", "toggleMode"],
  data() {
    return {
      mode: "login",
      username: undefined,
      password: undefined,
      passwordConfirmation: undefined,
      showWarningUseSSOInstead: false,
    };
  },
  methods: {
    submitForm() {
      this.showWarningUseSSOInstead = false;
      this.$emit("submit", {
        mode: this.mode,
        username: this.username,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });
    },
    toggleMode() {
      this.$emit("toggleMode");
      this.mode = this.mode !== "login" ? "login" : "register";

      if (this.mode === "register") {
        this.showWarningUseSSOInstead = true;
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
  },
};
</script>

<style lang="css" scoped>
.alert {
  width: 100%;
  font-size: 0.8rem;
}
.form-group {
  width: 100%;
  height: 100%;
  margin: auto;
  padding: auto;
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
