import axios from "axios";

const state = { leagues: [] };
const getters = {
  leagues: state => state.leagues
};
const actions = {
  async GetLeaguesForUser({ rootGetters, commit }) {
    commit("resetLeagues");
    await axios
      .get("/user/leagues", {
        headers: {
          Authorization: `Bearer ${rootGetters["user/accessToken"]}`
        }
      })
      .then(response => {
        response.data.data.forEach(function(item) {
          commit("addLeague", item.attributes);
        });
      })
      .catch(error => {
        // TODO
        console.log(error);
      });
  },
  async JoinLeague({ rootGetters, commit }, payload) {
    var league = undefined;
    await axios
      .post(
        "/user/join_league",
        { league_id: payload.leagueId },
        {
          headers: {
            Authorization: `Bearer ${rootGetters["user/accessToken"]}`
          }
        }
      )
      .then(response => {
        league = response.data.data.attributes;
        commit("addLeague", league);
      })
      .catch(error => {
        // TODO
        console.log(error);
      });

    return league;
  }
};
const mutations = {
  addLeague(state, league) {
    state.leagues.push(league);
  },
  resetLeagues(state) {
    state.leagues = [];
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
