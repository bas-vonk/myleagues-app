import { mount } from "@vue/test-utils";
import MatchesTable from "@/components/tables/MatchesTable.vue";

describe("MatchesTable.vue", () => {
  it("Shall render a table with all matches.", () => {
    const gmt_timestamp = "Sun, 31 Oct 2021 12:00:00 GMT";
    const displayed_timestamp = "2021-10-31";
    const matches = [
      {
        date: gmt_timestamp,
        home_player_username: "home",
        home_score: 1,
        away_player_username: "away",
        away_score: 2,
      },
      {
        date: gmt_timestamp,
        home_player_username: "home",
        home_score: 1,
        away_player_username: "away",
        away_score: 2,
      },
      {
        date: gmt_timestamp,
        home_player_username: "home",
        home_score: 1,
        away_player_username: "away",
        away_score: 2,
      },
    ];

    var wrapper = mount(MatchesTable, {
      props: { matches },
    });

    // Assert that the date is properly formatted and
    // that the winning side is displayed bold
    let tableDataElements = wrapper.findAll("td");
    expect(tableDataElements.at(0).text()).toContain(displayed_timestamp);
    expect(tableDataElements.at(4).classes()).toContain("fw-bold");
    expect(tableDataElements.at(5).classes()).toContain("fw-bold");
  });
});
