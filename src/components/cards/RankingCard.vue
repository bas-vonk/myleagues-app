<template>
  <base-card customCardHeight="29.5rem">
    <template v-slot:header>
      <div class="row">
        <div class="col header-text" id="rankingSystem">
          {{ rankingSystem }}
        </div>
        <div class="col header-text">Ranking</div>
        <div class="col header-text">
          <button
            @click="toggleTableChart"
            type="submit"
            class="btn btn-primary btn-sm"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <ranking-table
        v-if="showTable"
        :ranking="ranking"
        :username="username"
      ></ranking-table>
      <ranking-chart v-if="showChart" :leagueId="leagueId"></ranking-chart>
    </template>
  </base-card>
</template>

<script>
import RankingTable from "@/components/tables/RankingTable";
import RankingChart from "@/components/charts/RankingChart";

import BaseCard from "@/components/ui/BaseCard";

export default {
  props: ["leagueId", "ranking", "username", "joinCode", "rankingSystem"],
  components: {
    RankingTable,
    RankingChart,
    BaseCard,
  },
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
};
</script>

<style lang="css" scoped>
#rankingSystem {
  opacity: 0.3 !important;
  font-size: 0.75rem;
}
button {
  background-color: #f79e02;
  border-style: none;
  width: 5rem;
}
</style>
