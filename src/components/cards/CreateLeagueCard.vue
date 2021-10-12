<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card-header">Create League</div>
    <div class="card-body">
      <div class="container" v-if="!isCreatedView">
        <form v-on:submit.prevent="submitForm">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="League name"
              v-model="leagueName"
            />
          </div>
          <div class="form-group">
            <select class="form-control" v-model="rankingSystem">
              <option disabled selected value="">
                Select the ranking system.
              </option>
              <option value="regular">Regular</option>
              <option value="perron_frobenius">Perron-Frobenius</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
      <div v-if="isCreatedView">
        <div>League created. Join Code: {{ joinCode }}</div>
        <small id="modeCreateAnotherLeague" @click="resetIsCreatedView()"
          >Create another league.</small
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateLeagueCard",
  data() {
    return {
      isCreatedView: false,
      leagueId: undefined,
      leagueName: "",
      rankingSystem: "",
      joinCode: undefined,
    };
  },
  methods: {
    async submitForm() {
      let league = await this.$store.dispatch("league/Create", {
        name: this.leagueName,
        rankingSystem: this.rankingSystem,
      });

      this.leagueId = league.id;

      await this.$store.dispatch("user_leagues/JoinLeague", {
        leagueId: this.leagueId,
      });

      this.joinCode = league.join_code;
      this.isCreatedView = true;
    },
    resetIsCreatedView() {
      this.isCreatedView = false;
      this.leagueName = "";
      this.rankingSystem = "";
      this.joinCode = "";
    },
  },
};
</script>

<style lang="css" scoped>
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
  background-color: #3f8cd8;
  border: none;
}
.card {
  height: 100%;
  background-color: #3f8cd8 !important;
  box-shadow: 0.2rem 0.2rem rgba(0, 0, 0, 20%) !important;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 25%);
}
#modeCreateAnotherLeague {
  cursor: pointer;
  color: black;
}
</style>
