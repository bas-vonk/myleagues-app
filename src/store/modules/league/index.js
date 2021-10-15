import { LeagueService } from "@/services/league";

const state = { leagueService: new LeagueService() };
const getters = {};
const actions = {
  async CreateAndAdd({ commit }, payload) {
    var league;

    let params = {
      name: payload.name,
      ranking_system: payload.rankingSystem,
    };

    try {
      // Start spinner
      const responseData = await state.leagueService.create(params);
      league = responseData.data.attributes;

      // Add the league to the current leagues for the user
      commit("user_leagues/addLeague", league, { root: true });
    } catch (error) {
      throw error.message;
    } finally {
      // Stop spinner
    }

    return league;
  },
};
const mutations = {};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
