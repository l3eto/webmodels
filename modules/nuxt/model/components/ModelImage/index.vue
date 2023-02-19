<template>
  <div class="model-image">
    <img class="model-image__img" :src="source"/>
  </div>
</template>

<style lang="scss" scoped>
.model-image {
  width: 100%;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
}
</style>

<script lang="js">
export default {
  name: 'ModelImage',
  props: {
    source: {
      type: String,
      required: true
    }
  }
}
</script>