<template>
  <form v-on:submit.prevent="submitForm">
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        :placeholder="
          $t('components.cards.createLeagueCard.leagueNamePlaceholder')
        "
        v-model="leagueName"
      />
    </div>
    <div class="form-group">
      <select class="form-control" v-model="rankingSystem">
        <option disabled selected value="">
          {{ $t("components.cards.createLeagueCard.selectRankingSystem") }}
        </option>
        <option value="regular">Regular</option>
        <option value="perron_frobenius">Perron-Frobenius</option>
      </select>
      <info-circle id="infoIcon" @click="showInformationModal"></info-circle>
      <information-modal
        :showModal="showModal"
        @closingClick="closeInformationModal"
      ></information-modal>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</template>

<script>
import InfoCircle from "@/components/icons/InfoCircle.vue";
import InformationModal from "@/components/modals/InformationModal.vue";

export default {
  emits: ["submit"],
  components: {
    InfoCircle: InfoCircle,
    InformationModal: InformationModal,
  },
  data() {
    return {
      leagueName: "",
      rankingSystem: "",
      showModal: false,
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        leagueName: this.leagueName,
        rankingSystem: this.rankingSystem,
      });
    },
    showInformationModal() {
      this.showModal = true;
    },
    closeInformationModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
#infoIcon {
  top: 56.5%;
  right: 4.25%;
  position: absolute;
  height: 1rem;
  width: 1rem;
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
</style>
