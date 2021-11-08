<template>
  <base-card :isNonTransparent="true">
    <template v-slot:header>
      {{ $t("components.cards.createLeagueCard.title") }}
    </template>
    <template v-slot:default>
      <loading-spinner v-if="isLoading"></loading-spinner>
      <error-message
        v-if="isErrorView"
        :errorMessage="errorMessage"
        @close="resetView()"
      ></error-message>
      <div class="container" v-if="!isCreatedView && !isErrorView">
        <create-league-form @submit="submitForm" />
      </div>
      <div v-if="isCreatedView">League created. Join Code: {{ joinCode }}</div>
      <div v-if="isCreatedView || isErrorView">
        <small style="cursor: pointer; color: black" @click="resetView()"
          >Create another league.</small
        >
      </div>
    </template>
  </base-card>
</template>

<script>
import CreateLeagueForm from "@/components/forms/CreateLeagueForm.vue";

import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import BaseCard from "@/components/ui/BaseCard";

export default {
  name: "CreateLeagueCard",
  components: {
    LoadingSpinner,
    CreateLeagueForm,
    ErrorMessage,
    BaseCard,
  },
  data() {
    return {
      isLoading: false,
      isErrorView: false,
      errorMessage: "",
      isCreatedView: false,
      leagueId: undefined,
      joinCode: undefined,
    };
  },
  methods: {
    async submitForm(formData) {
      if (!formData.leagueName || !formData.rankingSystem) {
        this.isErrorView = true;
        this.errorMessage = "Fill in the form.";
        return;
      }

      try {
        // Start spinner
        this.isLoading = true;

        // Dispatch the action to the store
        let league = await this.$store.dispatch("league/CreateAndAdd", {
          name: formData.leagueName,
          rankingSystem: formData.rankingSystem,
        });

        // Prepare for the 'created' view
        this.joinCode = league.join_code;
        this.isCreatedView = true;
      } catch (error) {
        this.isErrorView = true;
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    resetView() {
      this.isErrorView = false;
      this.errorMessage = "";
      this.isCreatedView = false;
      this.joinCode = "";
    },
  },
};
</script>

<style lang="css" scoped></style>
