import axios from "axios";

const state = {
  joinCode: undefined,
  leagueId: undefined,
  name: undefined,
  matches: [],
  players: [],
  ranking: [],
  rankingHistory: undefined
};
const getters = {
  joinCode: state => state.joinCode,
  leagueId: state => state.leagueId,
  name: state => state.name,
  matches: state => state.matches,
  players: state => state.players,
  ranking: state => state.ranking,
  rankingHistory: state => state.rankingHistory
};
const actions = {
  AddMatch({ commit }, payload) {
    commit("addMatch", payload);
  },
  async GetForIdAndStore({ rootGetters, commit }, payload) {
    var league = undefined;
    await axios
      .get(`league/${payload.leagueId}`, {
        headers: {
          Authorization: `Bearer ${rootGetters["user/accessToken"]}`
        }
      })
      .then(response => {
        league = response.data.data.attributes;
        commit("setName", league.name);
        commit("setLeagueId", league.id);
        commit("setJoinCode", league.join_code);
        commit("setMatches", league.matches);
        commit("setPlayers", league.players);
        commit("setRanking", league.ranking);
      })
      .catch(error => {
        // TODO
        console.log(error);
      });
  },
  async GetRankingHistory({ rootGetters, commit }, payload) {
    var rankingHistory = undefined;
    await axios
      .get(`league/${payload.leagueId}/ranking_history`, {
        headers: {
          Authorization: `Bearer ${rootGetters["user/accessToken"]}`
        }
      })
      .then(response => {
        rankingHistory = response.data.data.attributes.ranking_history;
        commit("setRankingHistory", rankingHistory);
      })
      .catch(error => {
        // TODO
        console.log(error);
      });
  }
};
const mutations = {
  addMatch(state, match) {
    state.matches.unshift(match);
  },
  setName(state, name) {
    state.name = name;
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
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
