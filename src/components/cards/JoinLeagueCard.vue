<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card-header">Join League</div>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div v-else class="card-body">
      <div
        class="container"
        v-if="(isFindLeagueView || isJoinLeagueView) && !isErrorView"
      >
        <form v-on:submit.prevent="submitForm">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Join code"
              v-model="joinCode"
            />
          </div>
          <div class="form-group" v-if="isJoinLeagueView && leagueName">
            <input
              type="text"
              class="form-control"
              v-bind:placeholder="leagueName"
              disabled
            />
          </div>
          <button type="submit" class="btn btn-primary">
            {{ submitButtonText }}
          </button>
        </form>
      </div>
      <div class="alert alert-warning" v-if="isErrorView">
        {{ errorMessage }}
      </div>
      <div v-if="isJoinedLeagueView">League joined.</div>
      <div v-if="isAlreadyInLeagueView || isJoinedLeagueView || isErrorView">
        <small id="findJoinAnotherLeague" @click="resetView()">
          Find another league.
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { LeagueService } from "@/services/league";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";

export default {
  name: "JoinLeagueCard",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      isAlreadyInLeagueView: false,
      isErrorView: false,
      isJoinLeagueView: false,
      isJoinedLeagueView: false,
      isFindLeagueView: true,
      joinCode: undefined,
      leagueId: undefined,
      leagueName: undefined,
    };
  },
  methods: {
    async getLeagueForJoinCode(joinCode) {
      let leagueService = new LeagueService();
      var league;

      let params = { "filter[join_code]": joinCode };

      const responseData = await leagueService.read("", params);
      league = responseData.data.attributes;

      return league;
    },
    async processFindLeagueAction() {
      let league = await this.getLeagueForJoinCode(this.joinCode);

      this.leagueId = league.id;
      this.leagueName = league.name;

      this.isFindLeagueView = false;

      if (this.isAlreadyInLeague) {
        this.isErrorView = true;
        this.errorMessage = "You are already in this league.";
        this.joinCode = undefined;
      } else {
        this.isJoinLeagueView = true;
      }
    },
    async processJoinLeagueAction() {
      await this.$store.dispatch("user_leagues/JoinLeague", {
        leagueId: this.leagueId,
      });

      this.isFindLeagueView = false;
      this.isJoinLeagueView = false;
      this.isJoinedLeagueView = true;
    },
    async submitForm() {
      try {
        // Start spinner
        this.isLoading = true;

        if (this.isFindLeagueView) {
          await this.processFindLeagueAction();
        } else {
          await this.processJoinLeagueAction();
        }
      } catch (error) {
        this.isErrorView = true;
        this.errorMessage = error.message;
      } finally {
        // Stop spinner
        this.isLoading = false;
      }
    },
    resetView() {
      this.isErrorView = false;
      this.isFindLeagueView = true;
      this.isAlreadyInLeagueView = false;
      this.isJoinLeagueView = false;
      this.isJoinedLeagueView = false;
      this.isJoinCode = undefined;
      this.leagueId = undefined;
      this.leagueName = undefined;
    },
  },
  computed: {
    submitButtonText() {
      if (this.isFindLeagueView) {
        return "Find League";
      } else {
        return "Join League";
      }
    },
    isAlreadyInLeague() {
      // Check if user is  already in league
      let currentLeagues = this.$store.getters["user_leagues/leagues"];

      return currentLeagues.find(
        (currentLeague) => currentLeague["join_code"] === this.joinCode
      );
    },
  },
};
</script>

<style lang="css" scoped>
.alert {
  font-size: 0.8rem;
}
button {
  background-color: #f79e02;
  border-style: none;
}
button,
input,
select {
  margin: 0.1rem auto;
  width: 95%;
}
.card-header {
  height: 4rem;
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background-color: inherit;
  border: none;
}
.card {
  height: 100%;
  background-color: #3f8cd8 !important;
  box-shadow: 0.2rem 0.2rem rgba(0, 0, 0, 20%) !important;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 25%);
}
#findJoinAnotherLeague {
  cursor: pointer;
  color: black;
}
</style>
