import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { UserService } from "@/services/user";

const state = {
  accessToken: Cookies.get("accessToken"),
  username: undefined,
  password: undefined,
  emailAddress: undefined,
  locale: Cookies.get("locale"),
  userService: new UserService(),
};
const getters = {
  accessToken: (state) => state.accessToken,
  isLoggedIn: (state) => !!state.accessToken,
  emailAddress: (state) => state.emailAddress,
  username: (state) => state.username,
  locale: (state) => state.locale,
};
const actions = {
  Logout({ dispatch, commit }) {
    commit("unsetAccessToken");
    Cookies.remove("accessToken");

    // Remove all leagues from the frontend state
    dispatch("user_leagues/ResetLeagues", {}, { root: true });
  },
  async Login({ dispatch }, payload) {
    // Prepare the params for the API call
    let params = {
      email: payload.emailAddress,
      password: payload.password,
    };

    // Call the service
    const responseData = await state.userService.login(params);

    // Store the contents of the JWT token into the application
    dispatch("StoreAccessTokenData", {
      accessToken: responseData.access_token,
    });
  },
  async Register({ dispatch }, payload) {
    // Prepare the params for the API call
    let params = {
      email: payload.emailAddress,
      username: payload.username,
      password: payload.password,
    };

    // Call the service
    const responseData = await state.userService.register(params);

    // Store the contents of the JWT token into the application
    dispatch("StoreAccessTokenData", {
      accessToken: responseData.access_token,
    });
  },
  StoreAccessTokenData({ commit }, payload) {
    let accessToken = payload.accessToken;

    // Set the access token in the application and store it in the Cookie as well
    // TODO: Grab expiration from the backend
    commit("setAccessToken", accessToken);
    Cookies.set("accessToken", accessToken, { expires: 1 });

    // Grab the username and email adress from the JWT token
    let decoded_token = jwt_decode(accessToken);
    commit("setEmailAddress", decoded_token.email_address);
    commit("setUsername", decoded_token.username);
  },
  SetLocale({ commit }, payload) {
    commit("setLocale", payload.locale);
    Cookies.set("locale", payload.locale, { expires: 365 });
  },
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setUsername(state, username) {
    state.username = username;
  },
  setPassword(state, password) {
    state.password = password;
  },
  setEmailAddress(state, emailAddress) {
    state.emailAddress = emailAddress;
  },
  unsetAccessToken(state) {
    state.accessToken = null;
  },
  setLocale(state, locale) {
    state.locale = locale;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
