<template>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <error-message
    v-if="isError"
    :errorMessage="errorMessage"
    @close="resetView()"
  ></error-message>
  <div class="container score" v-if="!isLoading && !isAddedView">
    <form v-on:submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <div class="row">
            <select class="form-control form-control-sm" v-model="homePlayerId">
              <option disabled selected value="">Home</option>
              <option
                v-for="player in players"
                :value="player.id"
                :key="player.id"
              >
                {{ player.username }}
              </option>
            </select>
          </div>
        </div>
        <div class="col align-self-center">
          <div class="row justify-content-center">
            <div class="col-4 text-center">
              <input
                class="form-control form-control-sm"
                v-model="homePlayerScore"
                type="text"
                style="width: 100%"
              />
            </div>
            <div class="col-2">X</div>
            <div class="col-4 text-center">
              <input
                class="form-control form-control-sm"
                v-model="awayPlayerScore"
                type="text"
                style="width: 100%"
              />
            </div>
          </div>
          <div class="row">
            <input
              class="form-control form-control-sm"
              type="date"
              style="width: 86%; margin: 0.5rem auto"
              v-model="date"
            />
          </div>
        </div>
        <div class="col">
          <div class="row">
            <select class="form-control form-control-sm" v-model="awayPlayerId">
              <option disabled selected value="">Away</option>
              <option
                v-for="player in players"
                :value="player.id"
                :key="player.id"
              >
                {{ player.username }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
  <div v-if="!isLoading && !isError && isAddedView">
    <div>Match added.</div>
    <small id="modeAddAnotherMatch" @click="resetView()"
      >Add another match.</small
    >
  </div>
</template>

<script>
var today = new Date();
import { MatchService } from "@/services/match";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";

var dateDefaultValue =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

export default {
  props: {
    leagueId: {
      type: String,
    },
    players: {
      type: Array,
    },
  },
  components: {
    LoadingSpinner: LoadingSpinner,
    ErrorMessage: ErrorMessage,
  },
  data() {
    return {
      isError: false,
      errorMessage: "",
      isLoading: false,
      isAddedView: false,
      date: dateDefaultValue,
      homePlayerId: "",
      homePlayerScore: undefined,
      awayPlayerId: "",
      awayPlayerScore: undefined,
    };
  },
  methods: {
    async store(match) {
      let matchService = new MatchService();
      try {
        // Start spinner
        this.isLoading = true;

        await matchService.create(match);
      } catch (error) {
        this.isError = true;
        this.errorMessage = error.message;
      } finally {
        // Stop spinner
        this.isLoading = false;
      }
    },
    async submitForm() {
      await this.store({
        date: this.date,
        league_id: this.leagueId,
        home_player_id: this.homePlayerId,
        home_score: this.homePlayerScore,
        away_player_id: this.awayPlayerId,
        away_score: this.awayPlayerScore,
      });

      // Update the league page
      this.$store.dispatch("league_page/GetForIdAndStore", {
        leagueId: this.leagueId,
        suppressSpinner: true,
      });

      this.isAddedView = true;
    },
    resetView() {
      this.isError = false;
      this.isAddedView = false;
      this.date = dateDefaultValue;
      this.homePlayerId = "";
      this.homePlayerScore = undefined;
      this.awayPlayerId = "";
      this.awayPlayerScore = undefined;
    },
  },
  watch: {
    awayPlayerId: function (newAwayPlayerId) {
      if (newAwayPlayerId == this.homePlayerId) {
        this.homePlayerId = "";
      }
    },
    homePlayerId: function (newHomePlayerId) {
      if (newHomePlayerId == this.awayPlayerId) {
        this.awayPlayerId = "";
      }
    },
  },
};
</script>

<style lang="css" scoped>
input[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  display: none;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  -webkit-appearance: none;
  display: none;
}
button {
  width: 100%;
}
button {
  background-color: #f79e02;
  border-style: none;
  margin: 0.5rem 0 0 0;
}
input,
select {
  text-align: center;
  text-align-last: center;
}
.form-control-sm {
  margin: 0.5rem 0 0.5rem 0;
}
.col-2 {
  padding: 0;
  margin: auto 0.1rem auto 0.1rem;
}
.col-4 {
  margin: 0 0.25rem 0 0.25rem;
}
.score {
  width: 95%;
  padding: 0;
}
.score .row {
  padding: 0;
  margin: 0;
}
.score .row .col {
  padding: 0;
  margin: 0;
}
.score .row .col-4 {
  padding: 0;
  margin: 0;
}
#modeAddAnotherMatch {
  cursor: pointer;
  color: black;
}
</style>
