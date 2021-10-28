<template>
  <div class="card text-white" :style="{ height: customCardHeight }">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body" :class="{ 'non-transparant': isNonTransparent }">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isNonTransparent", "customCardHeight"],
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
  margin-bottom: 0 !important;
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
}
.card-body {
  height: 100%;
  overflow-y: auto;
}
</style>
