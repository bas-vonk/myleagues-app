import axios from "axios";

const state = {};
const getters = {};
const actions = {
  async Create({ rootGetters }, payload) {
    var match = undefined;
    await axios
      .post(
        "match",
        {
          league_id: payload.leagueId,
          date: payload.date,
          home_player_id: payload.homePlayerId,
          home_score: payload.homePlayerScore,
          away_player_id: payload.awayPlayerId,
          away_score: payload.awayPlayerScore
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters["user/accessToken"]}`
          }
        }
      )
      .then(response => {
        match = response.data.data.attributes;
      })
      .catch(error => {
        // TODO
        console.log(error);
      });

    return match;
  }
};
const mutations = {};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
