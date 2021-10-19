<template>
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
</template>

<script>
export default {
  props: ["isJoinLeagueView", "isFindLeagueView", "leagueName", "leagueId"],
  emits: ["submit"],
  data() {
    return {
      joinCode: "",
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        joinCode: this.joinCode,
        isJoinLeagueView: this.isJoinLeagueView,
        isFindLeagueView: this.isFindLeagueView,
        leagueId: this.leagueId,
      });
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
</style>
