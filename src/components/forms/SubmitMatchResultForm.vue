<template>
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
              type="number"
              style="width: 100%"
            />
          </div>
          <div class="col-2">X</div>
          <div class="col-4 text-center">
            <input
              class="form-control form-control-sm"
              v-model="awayPlayerScore"
              type="number"
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
</template>

<script>
var today = new Date();
var dateDefaultValue =
  today.getFullYear() +
  "-" +
  ("0" + (today.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + today.getDate()).slice(-2);

export default {
  props: ["players"],
  emits: ["submit"],
  data() {
    return {
      homePlayerId: "",
      homePlayerScore: undefined,
      awayPlayerId: "",
      awayPlayerScore: undefined,
      date: dateDefaultValue,
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        homePlayerId: this.homePlayerId,
        homePlayerScore: this.homePlayerScore,
        awayPlayerId: this.awayPlayerId,
        awayPlayerScore: this.awayPlayerScore,
        date: this.date,
      });
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
/* Chrome, Safari, Edge, Opera */
input[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  display: none;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  -webkit-appearance: none;
  display: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
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
input,
select {
  text-align: center;
  text-align-last: center;
}
.form-control-sm {
  margin: auto;
}
.col-2 {
  padding: 0;
  margin: auto 0.1rem auto 0.1rem;
}
.col-4 {
  margin: auto;
  padding: 0 0.25rem 0 0.25rem;
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
