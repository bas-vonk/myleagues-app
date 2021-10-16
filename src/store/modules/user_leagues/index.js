import { UserService } from "@/services/user";

const state = { leagues: [], userService: new UserService() };
const getters = {
  leagues: (state) => state.leagues,
};
const actions = {
  async GetLeaguesForUserAndAdd({ commit }) {
    commit("resetLeagues");

    try {
      // Start spinner
      const responseData = await state.userService.get_leagues_for_user();

      responseData.data.forEach(function (item) {
        commit("addLeague", item.attributes);
      });
    } catch (error) {
      throw error.message;
    } finally {
      // Stop spinner
    }
  },
  async JoinLeague({ commit }, payload) {
    let params = { league_id: payload.leagueId };

    try {
      // Start spinner
      const responseData = await state.userService.join_league(params);
      let league = responseData.data.attributes;
      commit("addLeague", league);
    } catch (error) {
      throw error.message;
    } finally {
      // Stop spinner
    }
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
