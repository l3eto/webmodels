<template>
  <div class="model-card">
    <nuxt-link :to="'/model/' + id">
      <model-image
        :source="avatar"
        />
      <span class="model-card__text">{{ name }}</span>
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.model-card {
  padding: 0 8px 20px 8px;

  .model-image {
    &:hover {
      opacity: 0.75;
    }
  }
}
</style>

<script lang="js">
import ModelImage from './../ModelImage';

export default {
  name: 'ModelCard',
  inheritAttrs: false,
  components: {
    ModelImage
  },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  }
}
</script>
