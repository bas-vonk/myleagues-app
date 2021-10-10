import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const state = {
  accessToken: Cookies.get("accessToken"),
  username: undefined,
  password: undefined,
  emailAddress: undefined
};
const getters = {
  accessToken: state => state.accessToken,
  isLoggedIn: state => !!state.accessToken,
  emailAddress: state => state.emailAddress,
  username: state => state.username
};
const actions = {
  Logout({ dispatch, commit }) {
    commit("unsetAccessToken");
    Cookies.remove("accessToken");

    // Remove all leagues from the frontend state
    dispatch("user_leagues/ResetLeagues", {}, { root: true });
  },
  async Login({ dispatch }, payload) {
    await axios
      .post("login", {
        email: payload.emailAddress,
        password: payload.password
      })
      .then(response => {
        dispatch("StoreAccessTokenData", {
          accessToken: response.data.access_token
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          throw error.response.data.message;
        } else {
          throw "Something went wrong. Try again later.";
        }
      });
  },
  async Register({ dispatch }, payload) {
    await axios
      .post("register", {
        email: payload.emailAddress,
        username: payload.username,
        password: payload.password
      })
      .then(response => {
        dispatch("StoreAccessTokenData", {
          accessToken: response.data.access_token
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          throw error.response.data.message;
        } else {
          throw "Something went wrong. Try again later.";
        }
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
  }
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
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
