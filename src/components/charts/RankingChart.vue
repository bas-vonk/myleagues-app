<template>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <error-message
    v-if="isErrorView"
    :errorMessage="errorMessage"
    @close="resetView()"
  ></error-message>
  <canvas id="ranking-chart" ref="rankingChart"></canvas>
</template>

<script>
import Chart from "chart.js/auto";

import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import { LeagueService } from "@/services/league";

export default {
  props: ["leagueId"],
  components: {
    LoadingSpinner,
    ErrorMessage,
  },
  data() {
    return {
      isLoading: false,
      isErrorView: false,
      errorMessage: "",
      chart: undefined,
      chartData: {
        type: "line",
        data: {
          labels: [],
          datasets: [],
        },
        options: {
          interaction: {
            intersect: false,
            mode: "index",
          },
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "right",
            },
            tooltip: {
              enabled: true,
              position: "nearest",
              itemSort: (a, b) => {
                return b.raw - a.raw;
              },
              callbacks: {
                label: function (context) {
                  var points = [];

                  context.chart.data.datasets.forEach((dataset) => {
                    points.push(dataset.data[context.dataIndex]);
                  });

                  points.sort(function (a, b) {
                    return b - a;
                  });

                  let username = context.dataset.label.match(/\.\s(.*)\s\(/)[1];
                  let position = points.indexOf(context.raw, 0) + 1;

                  return `${position}. ${username} (${context.raw})`;
                },
              },
            },
          },
        },
      },
    };
  },
  methods: {
    resetView() {
      this.isErrorView = false;
      this.errorMessage = "";
    },
    getRandomColor() {
      var color = "#";
      var possible = "0123456789";

      for (var i = 0; i < 6; i++)
        color += possible.charAt(Math.floor(Math.random() * possible.length));

      return color;
    },
    async getRankingHistory(leagueId) {
      let leagueService = new LeagueService();

      // Call the service
      const responseData = await leagueService.get_ranking_history(leagueId);

      // Return the required data
      return responseData.data.attributes.ranking_history;
    },
  },
  async mounted() {
    var rankingHistory;

    try {
      this.isLoading = true;
      rankingHistory = await this.getRankingHistory(this.leagueId);
    } catch (error) {
      this.isErrorView = true;
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
    }

    if (this.isErrorView) {
      return;
    }

    this.chartData.data.labels = rankingHistory.labels;
    this.chartData.data.datasets = rankingHistory.datasets;

    // Add color
    this.chartData.data.datasets.forEach(function (ds) {
      ds.borderColor = this.getRandomColor();
      ds.borderWidth = 1;
      ds.tension = 0.25; // Smooth curve
    }, this);

    var ctx = this.$refs.rankingChart.getContext("2d");
    this.chart = new Chart(ctx, this.chartData);
  },
};
</script>

<style lang="css" scoped>
#ranking-chart {
  width: 100%;
  height: 100%;
}
</style>
