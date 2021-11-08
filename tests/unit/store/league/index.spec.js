import { Api } from "@/api";
import { store } from "@/store";

import moxios from "moxios";
import { league, leagueResponse } from "./../../data/responses/post_league.js";
import { Helpers } from "./../../helpers.js";

describe("Shall store and mutate global state for a league and store new leagues in the backend.", () => {
  let helpers;
  beforeEach(() => {
    // Mock the API
    moxios.install(Api);
    helpers = new Helpers();
  });
  afterEach(() => {
    moxios.uninstall(Api);
  });

  it("Shall store a new league in the backend API and add it to the app.", async () => {
    moxios.stubRequest(`league`, {
      status: 200,
      response: leagueResponse,
    });

    store.dispatch("league/CreateAndAdd", league);

    await helpers.awaitMoxios();

    let leagues = store.getters["user_leagues/leagues"];
    expect(
      leagues.some((addedLeague) => addedLeague.name === league.name)
    ).toBe(true);
  });
});
