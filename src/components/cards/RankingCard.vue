<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card-header">
      <div class="row">
        <div class="header-text" id="rankingSystem">{{ rankingSystem }}</div>
        <div class="header-text">Ranking</div>
        <div class="header-text">
          <button
            @click="toggleTableChart"
            type="submit"
            class="btn btn-primary btn-sm"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <ranking-table
        v-if="showTable"
        :ranking="ranking"
        :username="username"
      ></ranking-table>
      <ranking-chart v-if="showChart" :leagueId="leagueId"></ranking-chart>
    </div>
  </div>
</template>

<script>
import RankingTable from "@/components/tables/RankingTable";
import RankingChart from "@/components/charts/RankingChart";

export default {
  data() {
    return {
      mode: "table",
      rankingHistory: [],
    };
  },
  methods: {
    toggleTableChart() {
      this.mode = this.mode === "chart" ? "table" : "chart";
    },
  },
  computed: {
    showTable() {
      return this.mode === "table";
    },
    showChart() {
      return this.mode === "chart";
    },
    buttonText() {
      return this.mode === "chart" ? "Table" : "Chart";
    },
  },
  components: {
    RankingTable,
    RankingChart,
  },
  props: ["leagueId", "ranking", "username", "joinCode", "rankingSystem"],
};
</script>

<style lang="css" scoped>
#rankingSystem {
  opacity: 30% !important;
}
button {
  background-color: #f79e02;
  border-style: none;
  width: 5rem;
}
.card {
  height: 33rem;
  overflow: hidden;
  background: rgba(165, 180, 200, 80%) !important;
  box-shadow: 0.2rem 0.2rem rgba(0, 0, 0, 20%) !important;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 25%);
}
.header-text {
  white-space: nowrap;
  width: 33%;
  padding-top: 0rem;
  padding-bottom: 0rem;
  margin: auto;
}
.card-header {
  height: 4rem;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  background-color: #3f8cd8;
}
.card-body {
  max-height: 26rem;
  overflow-y: auto;
}
.joincode {
  font-size: 0.75rem;
}
</style>
