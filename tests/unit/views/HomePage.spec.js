import { shallowMount } from "@vue/test-utils";

import { leaguesResponse } from "./../data/responses/get_user_leagues.js";
import { store } from "@/store";
import { i18n } from "@/locale";

import HomePage from "@/views/HomePage.vue";
import SummaryLeagueCard from "@/components/cards/SummaryLeagueCard.vue";
import JoinLeagueCard from "@/components/cards/JoinLeagueCard.vue";
import CreateLeagueCard from "@/components/cards/CreateLeagueCard.vue";

describe("HomePage", () => {
  let wrapper;

  beforeEach(() => {
    // Set locale
    i18n.locale = "en";

    // Fill the store
    leaguesResponse.data.forEach(function (item) {
      store.commit("user_leagues/addLeague", item.attributes);
    });

    wrapper = shallowMount(HomePage, {
      global: {
        plugins: [store, i18n],
      },
    });
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("Shall render summary league cards on the home page.", () => {
    var leagueIndex = 0;
    wrapper
      .findAllComponents(SummaryLeagueCard)
      .forEach(function (summaryLeagueCard) {
        expect(summaryLeagueCard.props()).toEqual({
          league: leaguesResponse.data.at(leagueIndex).attributes,
        });
        leagueIndex++;
      });
  });

  it("Shall render a join league card on the home page.", () => {
    expect(wrapper.findComponent(JoinLeagueCard)).toBeTruthy();
  });

  it("Shall render a create league card on the home page.", () => {
    expect(wrapper.findComponent(CreateLeagueCard)).toBeTruthy();
  });
});
