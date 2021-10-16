import { createStore } from "vuex";
import league from "./modules/league";
import league_page from "./modules/league_page";
import user from "./modules/user";
import user_leagues from "./modules/user_leagues";

const store = createStore({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    setIsLoading({ commit }, isLoading) {
      commit("setIsLoading", isLoading);
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
