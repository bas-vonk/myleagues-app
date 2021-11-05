import { mount } from "@vue/test-utils";

import RankingCard from "@/components/cards/RankingCard.vue";
import RankingChart from "@/components/charts/RankingChart.vue";
import RankingTable from "@/components/tables/RankingTable.vue";

describe("Join League card.", () => {
  let wrapper;
  let props = {
    leagueId: 1,
    ranking: {},
    username: "bas",
    joinCode: "ABCD",
    rankingSystem: "regular",
  };

  beforeEach(() => {
    wrapper = mount(RankingCard, { props: props });
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("Shall have functionality to toggle between a table and a chart.", async () => {
    expect(wrapper.findComponent(RankingChart).exists()).toBe(false);
    expect(wrapper.findComponent(RankingTable).exists()).toBe(true);

    // Test if props are passed on to the ranking table component
    expect(wrapper.findComponent(RankingTable).vm.ranking).toStrictEqual(
      props.ranking
    );
    expect(wrapper.findComponent(RankingTable).vm.username).toBe(
      props.username
    );

    // Click the button and check whether the chart is now visible
    await wrapper.find("button").trigger("click");

    expect(wrapper.findComponent(RankingChart).exists()).toBe(true);
    expect(wrapper.findComponent(RankingTable).exists()).toBe(false);

    // Test if props are passed on to the ranking table component
    expect(wrapper.findComponent(RankingChart).vm.leagueId).toBe(
      props.leagueId
    );

    // Click the button and check whether the ranking is now visible again
    await wrapper.find("button").trigger("click");

    expect(wrapper.findComponent(RankingChart).exists()).toBe(false);
    expect(wrapper.findComponent(RankingTable).exists()).toBe(true);
  });
});
