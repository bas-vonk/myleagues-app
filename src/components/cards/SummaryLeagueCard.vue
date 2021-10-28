<template>
  <base-card :isTransparent="true" @click="goToLeaguePage()">
    <template v-slot:header>
      <div class="row">
        <div class="col header-text"></div>
        <div class="col header-text">{{ leagueTitle }}</div>
        <div class="col header-text">
          <span class="joincode" style="font-size: 14px">
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
.header-text {
  white-space: nowrap;
  width: 33%;
}
.joincode {
  font-size: 14px;
}
</style>
