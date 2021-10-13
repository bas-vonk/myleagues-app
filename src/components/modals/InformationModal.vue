<template>
  <teleport to="body">
    <div
      ref="modal"
      class="modal"
      :class="{ show: active, 'd-block': active }"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      @click="clickOnOpenModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              v-on:click="$emit('closingClick')"
            ></button>
          </div>
          <div class="modal-body">Explanation on ranking systems.</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="$emit('closingClick')"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="backdropDiv"
      v-if="showModal"
      class="modal-backdrop fade show"
    ></div>
  </teleport>
</template>

<script>
export default {
  name: "InformationModal",
  emits: ["closingClick"],
  props: {
    showModal: Boolean,
  },
  watch: {
    showModal: {
      handler(newVal) {
        this.active = newVal;
        const body = document.querySelector("body");
        this.showModal
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    clickOnOpenModal(event) {
      // This is false if you click one of the elements inside the 'modal' class
      // So if you click inside 'modal' and outside 'modal-dialog', this is true
      if (event.target === event.currentTarget) {
        this.$emit("closingClick");
      }
    },
  },
  data() {
    return {
      active: this.showModal,
    };
  },
};
</script>

<style>
/* .modal {
  z-index: 2000 !important;
}
.modal-dialog {
  z-index: 2010 !important;
}
#backdropDiv {
  z-index: 1999 !important;
}
.modal-content {
  z-index: 2030 !important;
} */
</style>
