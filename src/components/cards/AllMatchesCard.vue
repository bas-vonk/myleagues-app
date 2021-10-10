<template>
  <div class="card text-white bg-primary mb-3">
    <div class="card-header">Results</div>
    <div class="card-body" @scroll="handleScroll" ref="card-content">
      <div class="arrow-parent">
        <arrow-up class="arrow-up" v-show="showLessIcon"></arrow-up>
      </div>
      <table class="table table-borderless">
        <transition-group
          tag="tbody"
          name="match"
          class="table table-borderless table-sm"
        >
          <tr v-for="match in matches" :key="match.id">
            <td class="small col-3">
              {{ getDateAsString(match.date) }}
            </td>
            <td
              :class="{ 'fw-bold': match.home_score > match.away_score }"
              class="col-3"
            >
              {{ match.home_player_username }}
            </td>
            <td
              :class="{ 'fw-bold': match.home_score > match.away_score }"
              class="col-1"
            >
              {{ match.home_score }}
            </td>
            <td class="col-1">-</td>
            <td
              :class="{ 'fw-bold': match.away_score > match.home_score }"
              class="col-1"
            >
              {{ match.away_score }}
            </td>
            <td
              :class="{ 'fw-bold': match.away_score > match.home_score }"
              class="col-3"
            >
              {{ match.away_player_username }}
            </td>
          </tr>
        </transition-group>
      </table>
      <div class="arrow-parent">
        <arrow-down class="arrow-down" v-show="showMoreIcon"></arrow-down>
      </div>
    </div>
  </div>
</template>

<script>
const zeroPad = (num, places) => String(num).padStart(places, "0");

import ArrowUp from "@/components/icons/ArrowUp.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";

export default {
  components: {
    ArrowUp: ArrowUp,
    ArrowDown: ArrowDown
  },
  data() {
    return {
      showLessIcon: false,
      showMoreIcon: false
    };
  },
  props: {
    matches: {
      type: Array
    }
  },
  mounted() {
    this.handleScroll();
  },
  watch: {
    matches() {
      setTimeout(
        function() {
          this.handleScroll();
        }.bind(this),
        100
      );
    }
  },
  methods: {
    handleScroll() {
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
    getDateAsString(gmt_timestamp) {
      var date = new Date(gmt_timestamp);
      date.toString();

      let year = date.getFullYear();
      let month = zeroPad(date.getMonth() + 1, 2);
      let day = zeroPad(date.getDate(), 2);

      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style lang="css" scoped>
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
.card {
  height: 15rem;
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
.match-enter-from {
  opacity: 1;
  transform: translateY(-30px);
}
.match-move {
  transition: transform 2s ease;
}
.match-enter-active {
  transition: all 2s ease-out;
}
.match-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
