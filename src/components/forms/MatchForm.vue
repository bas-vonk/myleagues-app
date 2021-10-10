<template>
  <div class="container score" v-if="!isAddedView">
    <form v-on:submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <div class="row">
            <select
              class="form-control form-control-sm"
              v-model="homePlayerId"
              :disabled="!entryMode"
            >
              <option disabled selected value="">{{
                homePlayerUsernamePlaceholder
              }}</option>
              <option
                v-for="player in players"
                :value="player.id"
                :key="player.id"
                >{{ player.username }}</option
              >
            </select>
          </div>
        </div>
        <div class="col align-self-center">
          <!-- <div class="row">
          &nbsp;
        </div> -->
          <div class="row justify-content-center">
            <div class="col-4 text-center">
              <input
                class="form-control form-control-sm"
                :placeholder="homePlayerScorePlaceholder"
                v-model="homePlayerScore"
                type="text"
                style="width: 100%;"
                :disabled="!entryMode"
              />
            </div>
            <div class="col-2">
              X
            </div>
            <div class="col-4 text-center">
              <input
                class="form-control form-control-sm"
                :placeholder="awayPlayerScorePlaceholder"
                v-model="awayPlayerScore"
                type="text"
                style="width: 100%;"
                :disabled="!entryMode"
              />
            </div>
          </div>
          <div class="row">
            <input
              class="form-control form-control-sm"
              type="text"
              :placeholder="datePlaceholder"
              style="width: 87%; margin: 0.5rem auto;"
              :disabled="!entryMode"
              v-model="date"
            />
          </div>
        </div>
        <div class="col">
          <div class="row">
            <select
              class="form-control form-control-sm"
              v-model="awayPlayerId"
              :disabled="!entryMode"
            >
              <option disabled selected value="">{{
                awayPlayerUsernamePlaceholder
              }}</option>
              <option
                v-for="player in players"
                :value="player.id"
                :key="player.id"
                >{{ player.username }}</option
              >
            </select>
          </div>
          <!-- <div class="row">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="Name"
          />
        </div> -->
        </div>
      </div>
      <div class="row">
        <button type="submit" class="btn btn-primary" v-if="entryMode">
          Submit
        </button>
      </div>
    </form>
  </div>
  <div v-if="isAddedView">
    <div>Match added.</div>
    <small id="modeAddAnotherMatch" @click="resetIsAddedView()"
      >Add another match.</small
    >
  </div>
</template>

<script>
var today = new Date();

var dateDefaultValue =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

export default {
  props: {
    leagueId: {
      type: String
    },
    players: {
      type: Array
    },
    entryMode: {
      type: Boolean,
      default: true
    },
    homePlayerUsernamePlaceholder: {
      type: String,
      default: "Home"
    },
    homePlayerScorePlaceholder: {
      type: Number,
      default: undefined
    },
    awayPlayerUsernamePlaceholder: {
      type: String,
      default: "Away"
    },
    awayPlayerScorePlaceholder: {
      type: Number,
      default: undefined
    },
    datePlaceholder: {
      type: String,
      default: "DD-MM-YYYY"
    }
  },
  data() {
    return {
      isAddedView: false,
      date: "",
      homePlayerId: "",
      homePlayerScore: undefined,
      awayPlayerId: "",
      awayPlayerScore: undefined
    };
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch("match/Create", {
        date: this.date,
        leagueId: this.leagueId,
        homePlayerId: this.homePlayerId,
        homePlayerScore: this.homePlayerScore,
        awayPlayerId: this.awayPlayerId,
        awayPlayerScore: this.awayPlayerScore
      });

      // Update the league page
      this.$store.dispatch("league_page/GetForIdAndStore", {
        leagueId: this.leagueId
      });

      this.isAddedView = true;
    },
    resetIsAddedView() {
      this.isAddedView = false;
      this.date = dateDefaultValue;
      this.homePlayerId = "";
      this.homePlayerScore = undefined;
      this.awayPlayerId = "";
      this.awayPlayerScore = undefined;
    }
  },
  watch: {
    awayPlayerId: function(newAwayPlayerId) {
      if (newAwayPlayerId == this.homePlayerId) {
        this.homePlayerId = "";
      }
    },
    homePlayerId: function(newHomePlayerId) {
      if (newHomePlayerId == this.awayPlayerId) {
        this.awayPlayerId = "";
      }
    }
  }
};
</script>

<style lang="css" scoped>
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
