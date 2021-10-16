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
    let params = {
      email: payload.emailAddress,
      password: payload.password,
    };

    try {
      // Call the service
      const responseData = await state.userService.login(params);
      dispatch("StoreAccessTokenData", {
        accessToken: responseData.access_token,
      });
    } catch (error) {
      throw error.message;
    }
  },
  async Register({ dispatch }, payload) {
    let params = {
      email: payload.emailAddress,
      username: payload.username,
      password: payload.password,
    };

    try {
      // Start spinner
      const responseData = await state.userService.register(params);
      dispatch("StoreAccessTokenData", {
        accessToken: responseData.access_token,
      });
    } catch (error) {
      throw error.message;
    } finally {
      // Stop spinner
    }
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
    let locale = payload.locale;

    commit("locale", locale);
    Cookies.set("locale", locale, { expires: 365 });
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
