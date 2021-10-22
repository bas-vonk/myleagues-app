import { createStore } from "vuex";

import league from "./modules/league";
import league_page from "./modules/league_page";
import user from "./modules/user";
import user_leagues from "./modules/user_leagues";

import {
  SET_IS_GLOBAL_LOADING,
  SET_IS_GLOBAL_ERROR,
  SET_GLOBAL_ERROR_MESSAGE,
} from "./mutation-types.js";

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
    [SET_IS_GLOBAL_LOADING](state, isGlobalLoading) {
      state.isGlobalLoading = isGlobalLoading;
    },
    [SET_IS_GLOBAL_ERROR](state, isGlobalError) {
      state.isGlobalError = isGlobalError;
    },
    [SET_GLOBAL_ERROR_MESSAGE](state, globalErrorMessage) {
      state.globalErrorMessage = globalErrorMessage;
    },
  },
  actions: {
    setIsGlobalLoading({ commit }, isGlobalLoading) {
      commit(SET_IS_GLOBAL_LOADING, isGlobalLoading);
    },
    setIsGlobalError({ commit }, isGlobalError) {
      commit(SET_IS_GLOBAL_ERROR, isGlobalError);
    },
    setGlobalErrorMessage({ commit }, globalErrorMessage) {
      commit(SET_GLOBAL_ERROR_MESSAGE, globalErrorMessage);
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
