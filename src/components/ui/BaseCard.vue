<template>
  <div class="card text-white" :style="{ height: customCardHeight }">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div
      class="card-body"
      :class="{ 'non-transparant': isNonTransparent }"
      @scroll="handleScroll"
      ref="card-content"
    >
      <div class="arrow-parent">
        <arrow-up class="arrow-up" v-show="showLessIcon"></arrow-up>
      </div>
      <slot name="default"></slot>
      <div class="arrow-parent">
        <arrow-down class="arrow-down" v-show="showMoreIcon"></arrow-down>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";

export default {
  props: {
    isNonTransparent: {
      type: Boolean,
      default: false,
    },
    customCardHeight: {
      type: String,
      default: "",
    },
    showScrollIcons: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ArrowUp,
    ArrowDown,
  },
  data() {
    return {
      showLessIcon: false,
      showMoreIcon: false,
    };
  },
  mounted() {
    this.handleScroll();
  },
  methods: {
    handleScroll() {
      if (!this.showScrollIcons) {
        return;
      }

      let element = this.$refs["card-content"];
      let maxScrollTop = element.scrollHeight - element.offsetHeight;

      // If there's nothing to scroll, do nothing
      if (maxScrollTop == 0) {
        this.showLessIcon = false;
        this.showMoreIcon = false;
        return;
      }

      // Scrolled down a little bit
      if (element.scrollTop > 0) {
        this.showLessIcon = true;

        if (element.scrollTop === maxScrollTop) {
          this.showMoreIcon = false;
        }
      }

      // Not yet at the bottom
      if (element.scrollTop < maxScrollTop) {
        this.showMoreIcon = true;

        if (element.scrollTop === 0) {
          this.showLessIcon = false;
        }
      }
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
.non-transparant {
  background: #3f8cd8 !important;
}
.card-header {
  height: 4rem;
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background-color: #3f8cd8;
  border-bottom: none;
}
.card-body {
  height: 100%;
  overflow-y: auto;
}
.arrow-parent {
  height: 0%;
  width: 100%;
}
.arrow-up {
  position: absolute;
  right: 5%;
}
.arrow-down {
  position: absolute;
  right: 5%;
  bottom: 1rem;
}
</style>
