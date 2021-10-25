import { mount } from "@vue/test-utils";

import { Api } from "@/api";
import RankingChart from "@/components/charts/RankingChart.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";

import moxios from "moxios";
import { rankingHistoryResponse } from "./rankingHistoryResponse.js";
import { Helpers } from "./../../helpers.js";

const leagueId = 1;

describe("RankingChart.vue", () => {
  let helpers;
  let wrapper;

  beforeEach(() => {
    // Mock the API
    moxios.install(Api);
    helpers = new Helpers();
  });
  afterEach(() => {
    moxios.uninstall(Api);
    wrapper.unmount();
  });

  it("Shall render a chart with the complete ranking history.", async () => {
    // Define the mocked API request
    moxios.stubRequest(`league/${leagueId}/ranking_history`, {
      status: 200,
      response: rankingHistoryResponse,
    });

    wrapper = await mount(RankingChart, {
      propsData: { leagueId: leagueId },
    });

    // After the promise of mounted is resolved, the component should
    // 1. Have succesfully rendered the canvas element
    // 2. Have the rankingHistory stored
    await helpers.awaitMoxios();

    expect(wrapper.find("canvas").exists()).toBe(true);
    expect(wrapper.vm.chartData.data.labels).toStrictEqual(
      rankingHistoryResponse.data.attributes.ranking_history.labels
    );
    expect(wrapper.vm.chartData.data.datasets).toStrictEqual(
      rankingHistoryResponse.data.attributes.ranking_history.datasets
    );
  });

  it("Shall render a loading spinner when the API call is pending.", async () => {
    // Define the mocked API request
    moxios.stubRequest(`league/${leagueId}/ranking_history`, {
      status: 500,
      response: { message: "Something went wrong." },
    });

    // Mount the component
    wrapper = await mount(RankingChart, {
      propsData: { leagueId: leagueId },
    });

    expect(wrapper.vm.isLoading).toBe(true);
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true);

    // After the promise of mounted is resolved,
    // the component not be in loading state anymore
    await helpers.awaitMoxios();

    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(false);
  });

  it("Shall render an error message when the API call fails.", async () => {
    // Define the mocked API request
    moxios.stubRequest(`league/${leagueId}/ranking_history`, {
      status: 500,
      response: { message: "Something went wrong." },
    });

    // Mount the component
    wrapper = await mount(RankingChart, {
      propsData: { leagueId: leagueId },
    });

    expect(wrapper.vm.isErrorView).toBe(false);

    // After the promise of mounted is resolved, the component should be in error mode
    await helpers.awaitMoxios();

    expect(wrapper.vm.isErrorView).toBe(true);

    // Close the error message to reset the view
    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.isErrorView).toBe(false);
  });

  it("Shall apply styling to the chart (sort on scores in tooltip).", async () => {
    // Mount the component
    wrapper = await mount(RankingChart, {
      propsData: { leagueId: leagueId },
    });

    // Resolve the promise of mounted
    await helpers.awaitMoxios();

    let itemSort = wrapper.vm.chartData.options.plugins.tooltip.itemSort;
    expect(itemSort({ raw: 1 }, { raw: 2 })).toBe(1);
  });

  it("Shall apply styling to the chart (format labels in tooltips).", async () => {
    // Mount the component
    wrapper = await mount(RankingChart, {
      propsData: { leagueId: leagueId },
    });

    // Resolve the promise of mounted
    await helpers.awaitMoxios();

    let context = {
      dataset: { label: "2. bas (588)" },
      dataIndex: 30,
      raw: 807,
      chart: {
        data: {
          datasets:
            rankingHistoryResponse.data.attributes.ranking_history.datasets,
        },
      },
    };

    let label = wrapper.vm.chartData.options.plugins.tooltip.callbacks.label;
    expect(label(context)).toBe("1. bas (807)");
  });
});
