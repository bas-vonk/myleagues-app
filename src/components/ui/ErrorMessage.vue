<template>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    {{ errorMessage }}
    <button type="button" class="btn-close" @click="$emit('close')"></button>
  </div>
</template>

<script>
export default {
  props: ["errorMessage"],
};
</script>

<style>
.alert {
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
</style>
