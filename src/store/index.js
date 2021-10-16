import { createStore } from "vuex";
import league from "./modules/league";
import league_page from "./modules/league_page";
import user from "./modules/user";
import user_leagues from "./modules/user_leagues";

const store = createStore({
  state: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  getters: {
    isLoading: (state) => state.isLoading,
    isError: (state) => state.isError,
    errorMessage: (state) => state.errorMessage,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setIsError(state, isError) {
      state.isError = isError;
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
  },
  actions: {
    setIsLoading({ commit }, isLoading) {
      commit("setIsLoading", isLoading);
    },
    setIsError({ commit }, isError) {
      commit("setIsError", isError);
    },
    setErrorMessage({ commit }, errorMessage) {
      commit("setErrorMessage", errorMessage);
    },
  },
  modules: {
    league,
    league_page,
    user,
    user_leagues,
  },
});

// Create store
export { store };
