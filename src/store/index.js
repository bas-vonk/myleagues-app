import { createStore } from "vuex";
import league from "./modules/league";
import league_page from "./modules/league_page";
import user from "./modules/user";
import user_leagues from "./modules/user_leagues";

const store = createStore({
  state: {
    isGlobalLoading: false,
    isGlobalError: false,
    globalErrorMessage: "",
  },
  getters: {
    isGlobalLoading: (state) => state.isGlobalLoading,
    isGlobalError: (state) => state.isGlobalError,
    globalErrorMessage: (state) => state.globalErrorMessage,
  },
  mutations: {
    setIsGlobalLoading(state, isGlobalLoading) {
      state.isGlobalLoading = isGlobalLoading;
    },
    setIsGlobalError(state, isGlobalError) {
      state.isGlobalError = isGlobalError;
    },
    setGlobalErrorMessage(state, globalErrorMessage) {
      state.globalErrorMessage = globalErrorMessage;
    },
  },
  actions: {
    setIsGlobalLoading({ commit }, isGlobalLoading) {
      commit("setIsGlobalLoading", isGlobalLoading);
    },
    setIsGlobalError({ commit }, isGlobalError) {
      commit("setIsGlobalError", isGlobalError);
    },
    setGlobalErrorMessage({ commit }, globalErrorMessage) {
      commit("setGlobalErrorMessage", globalErrorMessage);
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
