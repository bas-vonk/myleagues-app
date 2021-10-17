import { UserService } from "@/services/user";

const state = { leagues: [], userService: new UserService() };
const getters = {
  leagues: (state) => state.leagues,
};
const actions = {
  async GetLeaguesForUserAndAdd({ commit }) {
    // Clear out all current leagues
    commit("resetLeagues");

    // Call the service
    const responseData = await state.userService.get_leagues_for_user();

    // Add all leagues
    responseData.data.forEach(function (item) {
      commit("addLeague", item.attributes);
    });
  },
  async JoinLeague({ commit }, payload) {
    // Prepare the params for the API call
    let params = { league_id: payload.leagueId };

    // Call the service and define the response
    const responseData = await state.userService.join_league(params);
    let league = responseData.data.attributes;

    commit("addLeague", league);
  },
  ResetLeagues({ commit }) {
    commit("resetLeagues");
  },
};
const mutations = {
  addLeague(state, league) {
    state.leagues.push(league);
  },
  resetLeagues(state) {
    state.leagues = [];
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
