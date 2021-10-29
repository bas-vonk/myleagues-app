<template>
  <base-card :showScrollIcons="true" customCardHeight="14rem">
    <template v-slot:header>Results</template>
    <template v-slot:default>
      <matches-table :matches="matches" />
    </template>
  </base-card>
</template>

<script>
import MatchesTable from "@/components/tables/MatchesTable.vue";

import BaseCard from "@/components/ui/BaseCard";

export default {
  components: {
    MatchesTable,
    BaseCard,
  },
  props: {
    matches: {
      type: Array,
    },
  },
};
</script>

<style lang="css" scoped></style>
