<template>
  <div class="container">
    <div class="row">
      <div
        class="col-md-4 extra-padding"
        v-for="league in leagues"
        :key="league.id"
      >
        <summary-league-card :league="league" />
      </div>
      <div class="col-md-4 extra-padding">
        <join-league-card />
      </div>
      <div class="col-md-4 extra-padding">
        <create-league-card />
      </div>
    </div>
  </div>
</template>

<script>
import JoinLeagueCard from "@/components/cards/JoinLeagueCard";
import CreateLeagueCard from "@/components/cards/CreateLeagueCard";
import SummaryLeagueCard from "@/components/cards/SummaryLeagueCard";

export default {
  name: "HomePage",
  data() {
    return {};
  },
  computed: {
    leagues() {
      return this.$store.getters["user_leagues/leagues"];
    },
  },
  components: {
    JoinLeagueCard,
    CreateLeagueCard,
    SummaryLeagueCard,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 3rem;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 4rem;
  overflow: scroll;
  height: calc(var(--vh, 1vh) * 85);
  width: 100vw;
}
.extra-padding {
  padding: 0rem 0.75rem 1.5rem 0.75rem;
}
</style>
