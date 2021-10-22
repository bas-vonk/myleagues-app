import { Api } from "@/api";
import { store } from "@/store";

import { leagueResponse } from "./league";
import moxios from "moxios";

function respondWith(response) {
  return new Promise((resolve, reject) => {
    moxios.wait(() => {
      moxios.requests
        .mostRecent()
        .respondWith({
          status: 200,
          response,
        })
        .then(resolve, reject);
    });
  });
}

describe("@/store/league_page/index.js", () => {
  // Mock the API
  beforeEach(() => moxios.install(Api));
  afterEach(() => moxios.uninstall(Api));

  it("Tests league page module (actions).", async () => {
    let leagueId = 1;

    store.dispatch("league_page/GetForIdAndStore", leagueId);

    await respondWith(leagueResponse);

    expect(store.getters["league_page/joinCode"]).toBe(
      leagueResponse.data.attributes.join_code
    );
    expect(store.getters["league_page/players"]).toStrictEqual(
      leagueResponse.data.attributes.players
    );
  });
});
