<template>
  <table class="table table-borderless">
    <thead>
      <tr>
        <th scope="col">Position</th>
        <th scope="col">Name</th>
        <th scope="col">Points</th>
        <th scope="col">Saldo</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in ranking"
        :key="row.username"
        :class="{ 'table-active': row.username == username }"
      >
        <th scope="row">{{ row.position }}</th>
        <td>{{ row.username }}</td>
        <td>{{ row.pts_primary }}</td>
        <td>{{ row.pts_secondary }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["ranking", "username"],
};
</script>

<style lang="css" scoped>
.table {
  margin-bottom: 0rem;
}
</style>
