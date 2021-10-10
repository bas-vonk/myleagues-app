import { mount } from "@vue/test-utils";
import RankingTable from "@/components/tables/RankingTable.vue";

describe("RankingTable.vue", () => {
  it("Renders a ranking table.", () => {
    var username = "user_2";
    const ranking = [
      {
        position: 1,
        username: "user_1",
        points: 10,
        points_secondary: 2
      },
      {
        position: 2,
        username: "user_2",
        points: 8,
        points_secondary: 2
      },
      {
        position: 3,
        username: "user_3",
        points: 6,
        points_secondary: -2
      }
    ];

    var wrapper = mount(RankingTable, {
      props: { username, ranking }
    });

    // At least one row is supposed to be active since the username is in the ranking
    expect(wrapper.html().includes('<tr class="table-active">')).toBe(true);

    username = "user_not_in_ranking";
    wrapper = mount(RankingTable, {
      props: { username, ranking }
    });

    // table-active is not in the class because username is not in the ranking itself
    expect(wrapper.html().includes('<tr class="table-active">')).toBe(false);
  });
});
