<template>
  <div class="container">
    <div class="row">
      <div class="borders col-md-12">
        <div id="leagueNameBar" class="card text-white bg-primary mb-3 h2">
          {{ name }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="borders col-md-5">
        <div class="row">
          <div class="borders col-md-12 extra-padding">
            <submit-result-card :players="players" :leagueId="id" />
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

import SubmitResultCard from "@/components/cards/SubmitResultCard.vue";
import AllMatchesCard from "@/components/cards/AllMatchesCard.vue";
import RankingCard from "@/components/cards/RankingCard.vue";

export default {
  name: "LeaguePage",
  props: ["id"],
  components: {
    SubmitResultCard,
    AllMatchesCard,
    RankingCard,
  },
  async beforeRouteEnter(to) {
    try {
      store.dispatch("setIsGlobalLoading", true, { root: true });

      await store.dispatch("league_page/GetForIdAndStore", to.params.id);
    } catch (error) {
      store.dispatch("setIsGlobalError", true, { root: true });
      store.dispatch("setGlobalErrorMessage", error.message, { root: true });
    } finally {
      store.dispatch("setIsGlobalLoading", false, { root: true });
    }
  },
  async beforeRouteUpdate(to) {
    try {
      store.dispatch("setIsGlobalLoading", true, { root: true });

      await store.dispatch("league_page/GetForIdAndStore", to.params.id);
    } catch (error) {
      store.dispatch("setIsGlobalError", true, { root: true });
      store.dispatch("setGlobalErrorMessage", error.message, { root: true });
    } finally {
      store.dispatch("setIsGlobalLoading", false, { root: true });
    }
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
  padding-bottom: 0.5rem !important;
  margin-bottom: 0 !important;
  min-height: 3rem;
}
.container {
  padding-top: 1rem;
  padding-left: 5%;
  padding-right: 5%;
  overflow: scroll;
  height: calc(var(--vh, 1vh) * 90);
  width: 100vw;
}
.extra-padding {
  padding: 0rem 0.75rem 1.5rem 0.75rem;
}
</style>
