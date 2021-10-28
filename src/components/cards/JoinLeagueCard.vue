<template>
  <base-card :isNonTransparent="true">
    <template v-slot:header> Join League </template>
    <template v-slot:default>
      <loading-spinner v-if="isLoading"></loading-spinner>
      <error-message
        v-if="isErrorView"
        :errorMessage="errorMessage"
        @close="resetView()"
      ></error-message>
      <div class="container" v-if="!isJoinedLeagueView && !isErrorView">
        <join-league-form
          :isJoinLeagueView="isJoinLeagueView"
          :isFindLeagueView="isFindLeagueView"
          :leagueName="leagueName"
          :leagueId="leagueId"
          @submit="submitForm"
        />
      </div>
      <div v-if="isJoinedLeagueView">League joined.</div>
      <div v-if="(isAlreadyInLeagueView || isJoinedLeagueView) && !isErrorView">
        <small style="cursor: pointer; color: black" @click="resetView()">
          Find another league.
        </small>
      </div>
    </template>
  </base-card>
</template>

<script>
import { LeagueService } from "@/services/league";

import JoinLeagueForm from "@/components/forms/JoinLeagueForm.vue";

import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import BaseCard from "@/components/ui/BaseCard";

export default {
  name: "JoinLeagueCard",
  components: {
    LoadingSpinner,
    JoinLeagueForm,
    ErrorMessage,
    BaseCard,
  },
  data() {
    return {
      isLoading: false,
      isFindLeagueView: true,
      isJoinLeagueView: false,
      isErrorView: false,
      isJoinedLeagueView: false,
      isAlreadyInLeagueView: false,
      errorMessage: "",
      leagueId: undefined,
      leagueName: undefined,
    };
  },
  methods: {
    async submitForm(formData) {
      try {
        // Start spinner
        this.isLoading = true;

        if (formData.isFindLeagueView) {
          await this.processFindLeagueAction(formData);
        } else {
          await this.processJoinLeagueAction(formData);
        }
      } catch (error) {
        this.isErrorView = true;
        this.errorMessage = error.message;
      } finally {
        // Stop spinner
        this.isLoading = false;
      }
    },
    async processFindLeagueAction(formData) {
      let league = await this.getLeagueForJoinCode(formData.joinCode);

      this.leagueId = league.id;
      this.leagueName = league.name;

      this.isFindLeagueView = false;

      if (this.isAlreadyInLeague(formData)) {
        this.isErrorView = true;
        this.errorMessage = "You are already in this league.";
        this.joinCode = undefined;
      } else {
        this.isJoinLeagueView = true;
      }
    },
    async processJoinLeagueAction(formData) {
      await this.$store.dispatch("user_leagues/JoinLeague", {
        leagueId: formData.leagueId,
      });

      this.isFindLeagueView = false;
      this.isJoinLeagueView = false;
      this.isJoinedLeagueView = true;
    },
    async getLeagueForJoinCode(joinCode) {
      let leagueService = new LeagueService();

      let params = { "filter[join_code]": joinCode };

      const responseData = await leagueService.read("", params);
      return responseData.data.attributes;
    },
    resetView() {
      this.isErrorView = false;
      this.isFindLeagueView = true;
      this.isJoinLeagueView = false;
      this.isAlreadyInLeagueView = false;
      this.isJoinedLeagueView = false;
      this.leagueId = undefined;
      this.leagueName = undefined;
      this.errorMessage = "";
    },
    isAlreadyInLeague(formData) {
      // Check if user is  already in league
      let currentLeagues = this.$store.getters["user_leagues/leagues"];

      return currentLeagues.find(
        (currentLeague) => currentLeague["join_code"] === formData.joinCode
      );
    },
  },
};
</script>

<style lang="css" scoped></style>
