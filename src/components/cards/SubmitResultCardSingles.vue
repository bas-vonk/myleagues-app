<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card-header">Submit result</div>
    <div class="card-body">
      <match-form :players="players" :leagueId="leagueId" />
    </div>
  </div>
</template>

<script>
import MatchForm from "@/components/forms/MatchForm.vue";
export default {
  props: {
    players: {
      type: Array
    },
    leagueId: {
      type: String
    }
  },
  components: {
    MatchForm
  }
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
  margin-bottom: 0 !important;
}
.header-text {
  white-space: nowrap;
  width: 33%;
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
