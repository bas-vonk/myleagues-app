<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card-header">
      {{ $t("components.cards.createLeagueCard.title") }}
    </div>
    <div class="card-body">
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
        <small id="modeCreateAnotherLeague" @click="resetView()"
          >Create another league.</small
        >
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import CreateLeagueForm from "@/components/forms/CreateLeagueForm.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";

export default {
  name: "CreateLeagueCard",
  components: {
    LoadingSpinner,
    CreateLeagueForm,
    ErrorMessage,
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
        this.isError = true;
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

<style lang="css" scoped>
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
