<template>
  <section class="model-list">
    <p v-if="loading">Cargando ...</p>
    <p v-else-if="error">Opps! ha ocurrido un error</p>
    <ul
      v-else-if="models.length"
      class="model-list__models"
    >
      <li
        v-for="model in models"
        :key="model.id"
        class="model-list__model"
      >
        <model-card
          v-bind="model"
          />
      </li>
    </ul>
    <div v-else>
      <p>Opps! no encontramos resultados</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$mobileMaxWidth: 480px;
$maxWidthContent: 1200px;
.model-list {
  width: 100%;
  max-width: $maxWidthContent;
  margin: 0 auto;
  padding: 40px 0;

  &__models {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__model {
    width: 25%;

    @media (max-width: $mobileMaxWidth) {
      width: 100%;
    }
  }

}
</style>

<script lang="js">
export default {
  name: 'ModelList',
  components: {
    ModelCard: /* istanbul ignore next */ () => import(/* webpackChunkName: "ModelCard" */ './../ModelCard')
  },
  props: {
    models: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  }
}
</script>
