import { LeagueService } from "@/services/league";

const state = {
  joinCode: undefined,
  leagueId: undefined,
  name: undefined,
  ranking_system: undefined,
  matches: [],
  players: [],
  ranking: [],
  rankingHistory: undefined,
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
  rankingHistory: (state) => state.rankingHistory,
};
const actions = {
  AddMatch({ commit }, payload) {
    commit("addMatch", payload);
  },
  async GetForIdAndStore({ commit }, payload) {
    // Call the service
    const responseData = await state.leagueService.read(payload.leagueId);
    const league = responseData.data.attributes;

    // Store all info in the store
    commit("setName", league.name);
    commit("setRankingSystem", league.ranking_system);
    commit("setLeagueId", league.id);
    commit("setJoinCode", league.join_code);
    commit("setMatches", league.matches);
    commit("setPlayers", league.players);
    commit("setRanking", league.ranking);

    return league;
  },
};
const mutations = {
  addMatch(state, match) {
    state.matches.unshift(match);
  },
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
  setRankingHistory(state, rankingHistory) {
    state.rankingHistory = rankingHistory;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
