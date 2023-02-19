<template>
  <div class="model-page">
    <div class="model-page__header">
      <model-image
        class="model-page__image"
        :source="model.avatar"
        />
      <model-info
        :model="model"
        @updateModel="updateModel"
        />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$mobileMaxWidth: 480px;
$maxWidthContent: 900px;
.model-page {
  &__header {
    display: flex;
    gap: 16px;
    max-height: 400px;
    padding: 40px 0;
    width: 100%;
    max-width: $maxWidthContent;
    margin: 0 auto;

    @media (max-width: $mobileMaxWidth) {
      flex-direction: column;
      padding: 20px;
      max-height: unset;
      width: auto;
    }
  }

  &__image {
    max-width: 250px;

    @media (max-width: $mobileMaxWidth) {
      max-width: unset;
    }
  }
}
</style>

<script lang="js">
import ModelImage from './../../modules/nuxt/model/components/ModelImage';
import ModelInfo from './../../modules/nuxt/model/components/ModelInfo';

export default {
  name: 'ModelPage',
  components: {
    ModelImage,
    ModelInfo
  },
  head () {
    return {
      title: `${this.model.name } | WebModels`
    }
  },
  data () {
    return {
      model: {}
    };
  },
  async asyncData({ params, redirect, $modelService }) {
    try {
      const model = await $modelService.get(params.id);
      return {
        model
      };
    } catch (err) {
      redirect('/models');
    }
  },
  methods: {
    updateModel (model) {
      this.model = model;
    }
  }
}
</script>