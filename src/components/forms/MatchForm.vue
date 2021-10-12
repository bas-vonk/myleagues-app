<template>
  <div class="container score" v-if="!isAddedView">
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
        <button type="submit" class="btn btn-primary">Submit</button>
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
  data() {
    return {
      isAddedView: false,
      date: dateDefaultValue,
      homePlayerId: "",
      homePlayerScore: undefined,
      awayPlayerId: "",
      awayPlayerScore: undefined,
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
        awayPlayerScore: this.awayPlayerScore,
      });

      // Update the league page
      this.$store.dispatch("league_page/GetForIdAndStore", {
        leagueId: this.leagueId,
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
    date(newValue) {
      console.log(newValue);
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
