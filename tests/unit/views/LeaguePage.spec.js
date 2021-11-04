import { mount } from "@vue/test-utils";

import { store } from "@/store";

import { leagueResponse } from "./../data/responses/get_league.js";

import moxios from "moxios";
import { Api } from "@/api";
import { Helpers } from "./../helpers.js";

import LeaguePage from "@/views/LeaguePage.vue";
import SubmitResultCard from "@/components/cards/SubmitResultCard.vue";
import AllMatchesCard from "@/components/cards/AllMatchesCard.vue";
import RankingCard from "@/components/cards/RankingCard.vue";

describe("LeaguePage", () => {
  let wrapper;
  let helpers;
  let leagueId;
  let to;

  beforeEach(() => {
    moxios.install(Api);
    helpers = new Helpers();

    // Store a league in the store to be used in the tests
    store.dispatch("league_page/StoreLeague", leagueResponse.data.attributes);
    leagueId = "ffde1b13-5c83-4f32-a57d-3165e4d96101";

    to = {
      params: {
        id: leagueId,
      },
    };

    // Create the wrapper for the page
    wrapper = mount(LeaguePage, {
      global: {
        plugins: [store],
      },
    });
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it("Shall render a submit match result card.", () => {
    expect(wrapper.findComponent(SubmitResultCard)).toBeTruthy();
  });

  it("Shall render card that lists all results.", () => {
    expect(wrapper.findComponent(AllMatchesCard)).toBeTruthy();
  });

  it("Shall render a card with the current ranking.", () => {
    expect(wrapper.findComponent(RankingCard)).toBeTruthy();
  });

  it("Shall render a loading spinner when a new league is loaded.", async () => {
    // Mock the API call
    moxios.stubRequest(`league/${leagueId}`, {
      status: 200,
      response: leagueResponse,
    });

    // Initial load of the component & when the component is updated
    LeaguePage.beforeRouteEnter.call(wrapper.vm, to);
    LeaguePage.beforeRouteUpdate.call(wrapper.vm, to);

    expect(store.getters["isGlobalLoading"]).toBe(true);
    await helpers.awaitMoxios();
    expect(store.getters["isGlobalLoading"]).toBe(false);
  });

  it("Shall render an error message when something goes wrong.", async () => {
    let errorMessage = "Something went wrong!";

    // Mock the API call
    moxios.stubRequest(`league/${leagueId}`, {
      status: 500,
      response: { message: errorMessage },
    });

    // Initial load of the component & when the component is updated
    LeaguePage.beforeRouteEnter.call(wrapper.vm, to);
    LeaguePage.beforeRouteUpdate.call(wrapper.vm, to);

    await helpers.awaitMoxios();

    expect(store.getters["isGlobalError"]).toBe(true);
    expect(store.getters["globalErrorMessage"]).toBe(errorMessage);
  });
});
