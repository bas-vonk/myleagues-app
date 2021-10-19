<template>
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
</template>

<script>
const zeroPad = (num, places) => String(num).padStart(places, "0");

export default {
  props: ["matches"],
  methods: {
    getDateAsString(gmt_timestamp) {
      var date = new Date(gmt_timestamp);
      date.toString();

      let year = date.getFullYear();
      let month = zeroPad(date.getMonth() + 1, 2);
      let day = zeroPad(date.getDate(), 2);

      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style lang="css" scoped>
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
