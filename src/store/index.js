import { createStore } from "vuex";
import league from "./modules/league";
import league_page from "./modules/league_page";
import match from "./modules/match";
import user from "./modules/user";
import user_leagues from "./modules/user_leagues";

const store = createStore({
  state() {
    return {};
  },
  modules: {
    league,
    league_page,
    match,
    user,
    user_leagues
  }
});

// Create store
export { store };
