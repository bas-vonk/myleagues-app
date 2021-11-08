import { mount } from "@vue/test-utils";
import moxios from "moxios";

import { Helpers } from "./../../helpers.js";
import { leagueResponse } from "./../../data/responses/get_league.js";

import { store } from "@/store";
import { i18n } from "@/locale";
import { Api } from "@/api";
import CreateLeagueCard from "@/components/cards/CreateLeagueCard.vue";
import CreateLeagueForm from "@/components/forms/CreateLeagueForm.vue";

describe("Create League card.", () => {
  let wrapper;
  let helpers;

  beforeEach(() => {
    // Set locale
    i18n.locale = "en";

    moxios.install(Api);
    helpers = new Helpers();
    wrapper = mount(CreateLeagueCard, {
      props: {},
      global: {
        plugins: [store, i18n],
      },
    });
  });
  afterEach(() => {
    moxios.uninstall();
    wrapper.unmount();
  });

  it("Shall have functionality to create a league based on the form inputs.", async () => {
    // Mock the API call
    moxios.stubRequest(`league`, {
      status: 200,
      response: leagueResponse,
    });

    // Emit from the child
    wrapper.findComponent(CreateLeagueForm).vm.$emit("submit", {
      leagueName: "Test league",
      rankingSystem: "regular",
    });

    await helpers.awaitMoxios();

    expect(wrapper.text()).toContain("League created. Join Code:");
  });

  it("Shall render an error message when the API is not available.", async () => {
    let errorMessage = "API is not available";
    // Mock the API call
    moxios.stubRequest(`league`, {
      status: 500,
      response: { message: errorMessage },
    });

    // Emit from the child
    wrapper.findComponent(CreateLeagueForm).vm.$emit("submit", {
      leagueName: "Test league",
      rankingSystem: "regular",
    });

    await helpers.awaitMoxios();

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("Shall render an error message when (part of) the form is left empty.", async () => {
    // Emit from the form
    await wrapper.findComponent(CreateLeagueForm).vm.$emit("submit", {
      leagueName: "",
      rankingSystem: "regular",
    });

    expect(wrapper.vm.isErrorView).toBe(true);
    expect(wrapper.text()).toContain("Fill in the form");
  });

  it("Shall have the option to reset the view.", async () => {
    await wrapper.setData({ isCreatedView: true });
    await wrapper.setData({ errorMessage: "Error message should be reset." });

    await wrapper.find("small").trigger("click");

    expect(wrapper.vm.errorMessage).toBe("");
  });
});
