import { mount } from "@vue/test-utils";
import moxios from "moxios";

import { Helpers } from "./../../helpers.js";
import { leagueResponse } from "./../../data/responses/get_league.js";
import { matchCreateResponse } from "./../../data/responses/post_match_create.js";
import { matchCreateRequest } from "./../../data/requests/post_match_create.js";

import { store } from "@/store";
import { Api } from "@/api";
import SubmitMatchResultForm from "@/components/forms/SubmitMatchResultForm.vue";
import SubmitResultCard from "@/components/cards/SubmitResultCard.vue";

describe("Create League card.", () => {
  let wrapper;
  let helpers;
  let formData;

  beforeEach(() => {
    moxios.install(Api);
    helpers = new Helpers();
    wrapper = mount(SubmitResultCard, {
      props: { leagueId: matchCreateRequest.league_id },
      global: {
        plugins: [store],
      },
    });

    // Define formData
    formData = {
      homePlayerId: matchCreateRequest.home_player_id,
      homePlayerScore: matchCreateRequest.home_score,
      awayPlayerId: matchCreateRequest.away_player_id,
      awayPlayerScore: matchCreateRequest.away_score,
      date: matchCreateRequest.date,
    };
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it("Shall store a match based on the form inputs.", async () => {
    // Mock the API call
    moxios.stubRequest(`match`, {
      status: 200,
      response: matchCreateResponse,
    });

    // Mock the API call
    moxios.stubRequest(`league/${matchCreateRequest.league_id}`, {
      status: 200,
      response: leagueResponse,
    });

    // Emit from the child
    wrapper.findComponent(SubmitMatchResultForm).vm.$emit("submit", formData);

    await helpers.awaitMoxios();

    // Check whether the right call was made (this is the create match call)
    let request = moxios.requests.at(0);
    expect(request.config.method).toBe("post");
    expect(JSON.parse(request.config.data)).toEqual(matchCreateRequest);

    // Assert that the returned league is added to the store
    expect(wrapper.vm.$store.getters["league_page/name"]).toBe(
      leagueResponse.data.attributes.name
    );

    // Click the 'join another league' button to reset the view
    wrapper.find("small").trigger("click");
    expect(wrapper.vm.isAddedView).toBe(false);
    expect(wrapper.vm.isErrorView).toBe(false);
    expect(wrapper.vm.errorMessage).toBe("");
  });

  it("Shall render an error message when something goes wrong with the API call to the match endpoint.", async () => {
    let errorMessage = "Something went wrong.";

    // Mock the API call
    moxios.stubRequest(`match`, {
      status: 500,
      response: { message: errorMessage },
    });

    // Emit from the child
    wrapper.findComponent(SubmitMatchResultForm).vm.$emit("submit", formData);

    await helpers.awaitMoxios();

    // If all went well the following happened:
    expect(wrapper.vm.isErrorView).toBe(true);
    expect(wrapper.vm.errorMessage).toBe(errorMessage);
  });

  it("Shall render an error message when something goes wrong with the API call to the league endpoint.", async () => {
    let errorMessage = "Something went wrong.";

    // Mock the API calls
    moxios.stubRequest(`match`, {
      status: 200,
      response: matchCreateResponse,
    });
    moxios.stubRequest(`league/${matchCreateRequest.league_id}`, {
      status: 500,
      response: { message: errorMessage },
    });

    // Emit from the child
    wrapper.findComponent(SubmitMatchResultForm).vm.$emit("submit", formData);

    await helpers.awaitMoxios();

    // If all went well the following happened:
    expect(wrapper.vm.isErrorView).toBe(true);
    expect(wrapper.vm.errorMessage).toBe(errorMessage);
  });
});
