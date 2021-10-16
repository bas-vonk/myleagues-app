<template>
  <div class="container">
    <div class="row">
      <div class="borders col-md-12">
        <div id="leagueNameBar" class="card text-white bg-primary mb-3 h1">
          {{ name }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="borders col-md-5">
        <div class="row">
          <div class="borders col-md-12 extra-padding">
            <submit-result-card-singles :players="players" :leagueId="id" />
          </div>
        </div>
        <div class="row">
          <div class="borders col-md-12 extra-padding">
            <all-matches-card :matches="matches" />
          </div>
        </div>
      </div>
      <div class="borders col-md-7 extra-padding">
        <ranking-card
          :ranking="ranking"
          :rankingSystem="rankingSystem"
          :username="username"
          :joinCode="joinCode"
          :leagueId="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/store";

import SubmitResultCardSingles from "@/components/cards/SubmitResultCardSingles.vue";
import AllMatchesCard from "@/components/cards/AllMatchesCard.vue";
import RankingCard from "@/components/cards/RankingCard.vue";

export default {
  name: "LeaguePage",
  props: ["id"],
  components: {
    SubmitResultCardSingles,
    AllMatchesCard,
    RankingCard,
  },
  async beforeRouteUpdate(to) {
    // Start spinner
    store.dispatch("setIsLoading", true, { root: true });

    await store.dispatch("league_page/GetForIdAndStore", {
      leagueId: to.params.id,
    });
    // Stop spinner
    store.dispatch("setIsLoading", false, { root: true });
  },
  async beforeRouteEnter(to) {
    // Start spinner
    store.dispatch("setIsLoading", true, { root: true });

    await store.dispatch("league_page/GetForIdAndStore", {
      leagueId: to.params.id,
    });
    // Stop spinner
    store.dispatch("setIsLoading", false, { root: true });
  },
  computed: {
    username() {
      return store.getters["user/username"];
    },
    name() {
      return store.getters["league_page/name"].toUpperCase();
    },
    joinCode() {
      return store.getters["league_page/joinCode"];
    },
    matches() {
      return store.getters["league_page/matches"];
    },
    players() {
      return store.getters["league_page/players"];
    },
    ranking() {
      return store.getters["league_page/ranking"];
    },
    rankingSystem() {
      return store.getters["league_page/rankingSystem"]
        .replace(/_/g, " ")
        .toUpperCase();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#leagueNameBar {
  text-align: right;
  background: rgba(0, 0, 0, 0%) !important;
  border: none;
  padding: 1rem 1rem !important;
  margin-bottom: 0 !important;
  min-height: 3rem;
}
.container {
  margin-top: 2.5%;
  padding-left: 5%;
  padding-right: 5%;
  overflow: scroll;
  max-height: calc(var(--vh, 1vh) * 85);
  width: 100vw;
}
.extra-padding {
  padding: 1.5rem;
}
</style>
