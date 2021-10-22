import { Api } from "@/api";
import { store } from "@/store";

import { leagueResponse } from "./league";
import moxios from "moxios";

const flushPromises = require("flush-promises");

describe("Store: league page.", () => {
  // Mock the API
  beforeEach(() => moxios.install(Api));
  afterEach(() => moxios.uninstall(Api));

  it("Shall call the API to get a league and store the results.", async () => {
    let leagueId = 1;

    moxios.stubRequest(`league/${leagueId}`, {
      status: 200,
      response: leagueResponse,
    });

    store.dispatch("league_page/GetForIdAndStore", leagueId);

    await flushPromises();

    expect(store.getters["league_page/joinCode"]).toBe(
      leagueResponse.data.attributes.join_code
    );
    expect(store.getters["league_page/players"]).toStrictEqual(
      leagueResponse.data.attributes.players
    );
    expect(store.getters["league_page/matches"]).toStrictEqual(
      leagueResponse.data.attributes.matches
    );
    expect(store.getters["league_page/ranking"]).toStrictEqual(
      leagueResponse.data.attributes.ranking
    );
    expect(store.getters["league_page/name"]).toBe(
      leagueResponse.data.attributes.name
    );
    expect(store.getters["league_page/leagueId"]).toBe(leagueResponse.data.id);
    expect(store.getters["league_page/rankingSystem"]).toBe(
      leagueResponse.data.attributes.ranking_system
    );
  });
});
