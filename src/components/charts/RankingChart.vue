<template>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <canvas id="ranking-chart"></canvas>
</template>

<script>
import Chart from "chart.js";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import { LeagueService } from "@/services/league";

export default {
  props: ["leagueId"],
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      chart: undefined,
      chartData: {
        type: "line",
        data: {
          labels: [],
          datasets: [],
        },
        options: {
          maintainAspectRatio: false,
          legend: { display: false },
          layout: {
            padding: {
              left: 0,
              right: 60,
              top: 20,
              bottom: 0,
            },
          },
        },
      },
    };
  },
  methods: {
    getRandomColor() {
      var color = "#";
      var possible = "0123456789";

      for (var i = 0; i < 6; i++)
        color += possible.charAt(Math.floor(Math.random() * possible.length));

      return color;
    },
    async getRankingHistory(leagueId) {
      let leagueService = new LeagueService();
      var rankingHistory;

      try {
        this.isLoading = true;
        const responseData = await leagueService.get_ranking_history(leagueId);
        rankingHistory = responseData.data.attributes.ranking_history;
      } catch (error) {
        throw error.message;
      } finally {
        this.isLoading = false;
      }

      return rankingHistory;
    },
  },
  async mounted() {
    let rankingHistory = await this.getRankingHistory(this.leagueId);
    this.isLoading = true;
    await this.$store.dispatch("league_page/GetRankingHistory", {
      leagueId: this.leagueId,
    });
    this.isLoading = false;

    let rankingHistory = this.$store.getters["league_page/rankingHistory"];

    this.chartData.data.labels = rankingHistory.labels;
    this.chartData.data.datasets = rankingHistory.datasets;

    // Add color
    this.chartData.data.datasets.forEach(function (ds) {
      ds.borderColor = this.getRandomColor();
      ds.borderWidth = 1;
    }, this);

    function drawLabels(t) {
      ctx.save();
      ctx.font = Chart.helpers.fontString(
        12,
        "bold",
        Chart.defaults.global.defaultFontFamily
      );
      ctx.textBaseline = "bottom";

      var lastYOffset = undefined;
      let minYOffsetDiff = 15;

      var chartInstance = t.chart;
      var datasets = chartInstance.config.data.datasets;
      datasets.forEach(function (ds, index) {
        var label = ds.label;
        var meta = chartInstance.controller.getDatasetMeta(index);
        var len = meta.data.length - 1;
        var xOffset = meta.data[len]._model.x + 10;
        var yOffset = meta.data[len]._model.y;

        if (!lastYOffset) {
          lastYOffset = yOffset;
        } else if (yOffset - lastYOffset < minYOffsetDiff) {
          yOffset = lastYOffset + minYOffsetDiff;
        }

        lastYOffset = yOffset;

        ctx.fillStyle = ds.borderColor;
        ctx.fillText(label, xOffset, yOffset + 5, 60);
      });
      ctx.restore();
    }

    var originalController = Chart.controllers.line;
    Chart.controllers.line = Chart.controllers.line.extend({
      draw: function () {
        originalController.prototype.draw.call(this, arguments);
        drawLabels(this);
      },
    });

    var ctx = document.getElementById("ranking-chart").getContext("2d");
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
