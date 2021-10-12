import axios from "axios";

const state = {};
const getters = {};
const actions = {
  async Create({ rootGetters }, payload) {
    var league = undefined;
    await axios
      .post(
        "league",
        {
          name: payload.name,
          ranking_system: payload.rankingSystem,
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters["user/accessToken"]}`,
          },
        }
      )
      .then((response) => {
        league = response.data.data.attributes;
      })
      .catch((error) => {
        // TODO
        console.log(error);
      });
    return league;
  },
  async GetForJoinCode({ rootGetters }, payload) {
    var league = undefined;
    await axios
      .get("league/", {
        params: { "filter[join_code]": payload.joinCode },
        headers: {
          Authorization: `Bearer ${rootGetters["user/accessToken"]}`,
        },
      })
      .then((response) => {
        league = response.data.data.attributes;
      })
      .catch((error) => {
        // TODO
        console.log(error);
      });
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
