<template>
  <base-card @click="goToLeaguePage()" :showScrollIcons="true">
    <template v-slot:header>
      <div class="row">
        <div class="col header-text"></div>
        <div class="col header-text">
          <div class="text-overflow-center">
            {{ leagueTitle }}
          </div>
        </div>
        <div class="col header-text">
          <span class="joincode">
            {{ league.join_code }}
          </span>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <ranking-table
        :username="username"
        :ranking="league.ranking"
      ></ranking-table>
    </template>
  </base-card>
</template>

<script>
import RankingTable from "@/components/tables/RankingTable";
import BaseCard from "@/components/ui/BaseCard";

export default {
  props: ["league"],
  components: {
    RankingTable: RankingTable,
    BaseCard: BaseCard,
  },
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    goToLeaguePage() {
      this.$router.push({ name: "league", params: { id: this.league.id } });
    },
  },
  computed: {
    username() {
      return this.$store.getters["user/username"];
    },
    leagueTitle() {
      return this.league.name.toUpperCase();
    },
  },
};
</script>

<style lang="css" scoped>
.joincode {
  font-size: 0.8rem;
}
.text-overflow-center {
  padding: none;
  margin-left: -100%;
  margin-right: -100%;
  text-align: center;
}
</style>
