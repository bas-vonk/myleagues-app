<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card-header">Submit result</div>
    <div class="card-body">
      <loading-spinner v-if="isLoading"></loading-spinner>
      <error-message
        v-if="isErrorView"
        :errorMessage="errorMessage"
        @close="resetView()"
      ></error-message>
      <div
        class="container score"
        v-if="!isLoading && !isAddedView && !isErrorView"
      >
        <match-form :players="players" @submit="submitForm"></match-form>
      </div>
      <div v-if="!isLoading && !isErrorView && isAddedView">
        <div>Match added.</div>
        <small id="modeAddAnotherMatch" @click="resetView()"
          >Add another match.</small
        >
      </div>
    </div>
  </div>
</template>

<script>
import { MatchService } from "@/services/match";
import MatchForm from "@/components/forms/MatchForm.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";

export default {
  props: {
    players: {
      type: Array,
    },
    leagueId: {
      type: String,
    },
  },
  components: {
    MatchForm,
    LoadingSpinner,
    ErrorMessage,
  },
  data() {
    return {
      isLoading: false,
      isAddedView: false,
      isErrorView: false,
      errorMessage: "",
    };
  },
  methods: {
    async store(formData) {
      // Define the match service
      let matchService = new MatchService();

      // Define the params for the match
      let params = {
        league_id: this.leagueId,
        home_player_id: formData.homePlayerId,
        home_score: formData.homePlayerScore,
        away_player_id: formData.awayPlayerId,
        away_score: formData.awayPlayerScore,
        date: formData.date,
      };

      try {
        // Start spinner
        this.isLoading = true;

        // Call the service
        await matchService.create(params);
      } catch (error) {
        this.isErrorView = true;
        this.errorMessage = error.message;
      } finally {
        // Stop spinner
        this.isLoading = false;
      }
    },
    async submitForm(formData) {
      // Call the function to store the match
      await this.store(formData);

      // Update the league page
      try {
        // Start spinner
        this.isLoading = true;

        await this.$store.dispatch(
          "league_page/GetForIdAndStore",
          this.leagueId
        );
      } catch (error) {
        this.isErrorView = true;
        this.errorMessage = error.message;
        return;
      } finally {
        // Stop spinner
        this.isLoading = false;
      }

      // Set the view to 'is added'
      this.isAddedView = true;
    },
    resetView() {
      this.isAddedView = false;
      this.isErrorView = false;
      this.errorMessage = "";
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
