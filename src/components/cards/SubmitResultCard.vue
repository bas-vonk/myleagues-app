<template>
  <base-card :isNonTransparent="true" customCardHeight="14rem">
    <template v-slot:header>Submit result</template>
    <template v-slot:default>
      <loading-spinner v-if="isLoading"></loading-spinner>
      <error-message
        v-if="isErrorView"
        :errorMessage="errorMessage"
        @close="resetView()"
      ></error-message>
      <div class="container" v-if="!isLoading && !isAddedView && !isErrorView">
        <submit-match-result-form :players="players" @submit="submitForm" />
      </div>
      <div v-if="!isLoading && !isErrorView && isAddedView">
        <div>Match added.</div>
        <small id="modeAddAnotherMatch" @click="resetView()"
          >Add another match.</small
        >
      </div>
    </template>
  </base-card>
</template>

<script>
import { MatchService } from "@/services/match";

import SubmitMatchResultForm from "@/components/forms/SubmitMatchResultForm.vue";

import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import BaseCard from "@/components/ui/BaseCard";

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
    SubmitMatchResultForm,
    LoadingSpinner,
    ErrorMessage,
    BaseCard,
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

<style lang="css" scoped></style>
