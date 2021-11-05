import { mount } from "@vue/test-utils";
import moxios from "moxios";

import { Helpers } from "./../../helpers.js";
import { leagueResponse } from "./../../data/responses/get_league.js";

import { store } from "@/store";
import { Api } from "@/api";
import JoinLeagueCard from "@/components/cards/JoinLeagueCard.vue";
import JoinLeagueForm from "@/components/forms/JoinLeagueForm.vue";

describe("Join League card.", () => {
  let wrapper;
  let helpers;
  let joinCode;
  let leagueId;
  let name;

  beforeEach(() => {
    moxios.install(Api);
    helpers = new Helpers();
    wrapper = mount(JoinLeagueCard, {
      props: {},
      global: {
        plugins: [store],
        mocks: {
          $t: () => "mocked text",
        },
      },
    });

    name = leagueResponse.data.attributes.name;
    joinCode = leagueResponse.data.attributes.join_code;
    leagueId = leagueResponse.data.id;
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it("Shall have functionality to search a league based on the form inputs.", async () => {
    // Mock the API call
    moxios.stubRequest(`league/?filter[join_code]=${joinCode}`, {
      status: 200,
      response: leagueResponse,
    });

    // Emit from the child
    wrapper.findComponent(JoinLeagueForm).vm.$emit("submit", {
      joinCode: joinCode,
      isFindLeagueView: true,
      isJoinLeagueView: false,
      leagueId: undefined,
    });

    await helpers.awaitMoxios();

    // If all went well the following happened:
    expect(wrapper.vm.isJoinLeagueView).toBe(true);
    expect(wrapper.vm.leagueName).toBe(leagueResponse.data.attributes.name);
    expect(wrapper.vm.leagueId).toBe(leagueId);
  });

  it("Shall have functionality to join a league based on the form inputs.", async () => {
    // Set data
    wrapper.setData({
      isJoinLeagueView: true,
      leagueName: name,
      leagueId: leagueId,
    });

    // Mock the API call
    moxios.stubRequest(`user/join_league`, {
      status: 200,
      response: leagueResponse,
    });

    // Emit from the child
    wrapper.findComponent(JoinLeagueForm).vm.$emit("submit", {
      joinCode: "",
      isFindLeagueView: false,
      isJoinLeagueView: true,
      leagueId: leagueId,
    });

    await helpers.awaitMoxios();

    // Assume that the proper league ID was added in the post request
    let request = moxios.requests.mostRecent();
    expect(request.config.method).toBe("post");

    let expectedPostData = { league_id: leagueId };
    expect(JSON.parse(request.config.data)).toEqual(expectedPostData);

    // If all went well the following happened:
    expect(wrapper.vm.isJoinedLeagueView).toBe(true);

    // Click the 'join another league' button to reset the view
    wrapper.find("small").trigger("click");
    expect(wrapper.vm.isJoinedLeagueView).toBe(false);
    expect(wrapper.vm.isJoinLeagueView).toBe(false);
    expect(wrapper.vm.isFindLeagueView).toBe(true);
  });

  it("Shall render an error message when something goes wrong with the API calls.", async () => {
    let errorMessage = "Something went wrong.";

    // Mock the API call
    moxios.stubRequest(`league/?filter[join_code]=${joinCode}`, {
      status: 500,
      response: { message: errorMessage },
    });

    // Emit from the child
    wrapper.findComponent(JoinLeagueForm).vm.$emit("submit", {
      joinCode: joinCode,
      isFindLeagueView: true,
      isJoinLeagueView: false,
      leagueId: undefined,
    });

    await helpers.awaitMoxios();

    // If all went well the following happened:
    expect(wrapper.vm.isErrorView).toBe(true);
    expect(wrapper.vm.errorMessage).toBe(errorMessage);
  });

  it("Shall render an error message when the user is already in the league.", async () => {
    let errorMessage = "You are already in this league.";

    // Add the league that is searched to the store,
    // so that the user is already in that league
    wrapper.vm.$store.commit(
      "user_leagues/addLeague",
      leagueResponse.data.attributes,
      { root: true }
    );

    // Mock the API call
    moxios.stubRequest(`league/?filter[join_code]=${joinCode}`, {
      status: 200,
      response: leagueResponse,
    });

    // Emit from the child
    wrapper.findComponent(JoinLeagueForm).vm.$emit("submit", {
      joinCode: joinCode,
      isFindLeagueView: true,
      isJoinLeagueView: false,
      leagueId: undefined,
    });

    await helpers.awaitMoxios();

    // If all went well the following happened:
    expect(wrapper.vm.isErrorView).toBe(true);
    expect(wrapper.vm.errorMessage).toBe(errorMessage);
  });
});
