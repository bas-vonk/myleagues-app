<template>
  <div class="card text-white" @click="goToLeaguePage">
    <div class="card-header">
      <div class="row">
        <div class="header-text"></div>
        <div class="header-text">{{ leagueTitle }}</div>
        <div class="header-text">
          <span class="joincode">{{ league.join_code }}</span>
        </div>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-borderless table-sm">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Name</th>
            <th scope="col">Points</th>
            <th scope="col">Saldo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in league.ranking"
            :key="row.position"
            :class="{ 'table-active': row.username == username }"
          >
            <th>{{ row.position }}</th>
            <td>{{ row.username }}</td>
            <td>{{ row.pts_primary }}</td>
            <td>{{ row.pts_secondary }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryLeagueCard",
  props: ["league"],
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    goToLeaguePage() {
      this.$router.push({ name: "league", params: { id: this.league.id } });
    },
  },
  computed: {
    username() {
      return this.$store.getters["user/username"];
    },
    leagueTitle() {
      return this.league.name.toUpperCase();
    },
  },
};
</script>

<style lang="css" scoped>
.card {
  height: 15rem;
  cursor: pointer;
  overflow: hidden;
  background: rgba(165, 180, 200, 80%) !important;
  box-shadow: 0.2rem 0.2rem rgba(0, 0, 0, 20%) !important;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 25%);
}
.header-text {
  white-space: nowrap;
  width: 33%;
}
.joincode {
  font-size: 14px;
}
.card-header {
  height: 4rem;
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background-color: #3f8cd8;
}
.card-body {
  max-height: 11rem;
  overflow-y: auto;
}
</style>
