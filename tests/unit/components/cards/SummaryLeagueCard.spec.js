import { mount } from "@vue/test-utils";

import { leagueResponse } from "./../../data/responses/get_league.js";

import { store } from "@/store";
import RankingTable from "@/components/tables/RankingTable.vue";
import SummaryLeagueCard from "@/components/cards/SummaryLeagueCard";

describe("Join League card.", () => {
  let wrapper;
  let props = {
    league: leagueResponse.data.attributes,
  };

  beforeEach(() => {
    wrapper = mount(SummaryLeagueCard, {
      props: props,
      global: { plugins: [store], mocks: { $router: { push: jest.fn() } } },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Shall render a ranking table.", () => {
    expect(wrapper.findComponent(RankingTable).exists()).toBe(true);

    // Test if props are passed on to the ranking table component
    expect(wrapper.findComponent(RankingTable).vm.ranking).toStrictEqual(
      props.league.ranking
    );
  });

  it("Shall load the league detail page when clicked.", async () => {
    // Click the card and check the routing
    await wrapper.find("div").trigger("click");

    expect(wrapper.vm.$router.push).toBeCalledWith({
      name: "league",
      params: { id: props.league.id },
    });
  });
});
