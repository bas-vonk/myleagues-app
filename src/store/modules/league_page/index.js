import { LeagueService } from "@/services/league";

const state = {
  joinCode: undefined,
  leagueId: undefined,
  name: undefined,
  ranking_system: undefined,
  matches: [],
  players: [],
  ranking: [],
  leagueService: new LeagueService(),
};
const getters = {
  joinCode: (state) => state.joinCode,
  leagueId: (state) => state.leagueId,
  name: (state) => state.name,
  rankingSystem: (state) => state.rankingSystem,
  matches: (state) => state.matches,
  players: (state) => state.players,
  ranking: (state) => state.ranking,
};
const actions = {
  async GetForIdAndStore({ dispatch }, leagueId) {
    // Call the service
    const responseData = await state.leagueService.read(leagueId);
    const league = responseData.data.attributes;

    dispatch("StoreLeague", league);

    return league;
  },
  StoreLeague({ commit }, league) {
    // Store all info in the store
    commit("setName", league.name);
    commit("setRankingSystem", league.ranking_system);
    commit("setLeagueId", league.id);
    commit("setJoinCode", league.join_code);
    commit("setMatches", league.matches);
    commit("setPlayers", league.players);
    commit("setRanking", league.ranking);
  },
};
const mutations = {
  setName(state, name) {
    state.name = name;
  },
  setRankingSystem(state, rankingSystem) {
    state.rankingSystem = rankingSystem;
  },
  setLeagueId(state, leagueId) {
    state.leagueId = leagueId;
  },
  setJoinCode(state, joinCode) {
    state.joinCode = joinCode;
  },
  setMatches(state, matches) {
    state.matches = matches;
  },
  setPlayers(state, players) {
    state.players = players;
  },
  setRanking(state, ranking) {
    state.ranking = ranking;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
