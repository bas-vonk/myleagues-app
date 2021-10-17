import { LeagueService } from "@/services/league";

const state = { leagueService: new LeagueService() };
const getters = {};
const actions = {
  async CreateAndAdd({ commit }, payload) {
    // Prepare the parameters for the API call
    let params = {
      name: payload.name,
      ranking_system: payload.rankingSystem,
    };

    // Call the service and store the results
    const responseData = await state.leagueService.create(params);
    let league = responseData.data.attributes;

    // Add the league to the current leagues for the user
    commit("user_leagues/addLeague", league, { root: true });

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
