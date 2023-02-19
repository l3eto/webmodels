<template>
  <section class="model-search">
      <div class="model-search__wrapper">
        <h1 class="model-search__title">Modelos</h1>
        <div class="model-search__content">
          <div class="model-search__input-wrapper">
            <input v-model="filter" class="model-search__input" v-on:keyup.enter="searchFilter" type="text" name="name" placeholder="Filtar por nombre" />
          </div>
          <div class="model-search__pagination">
            <nuxt-link
              class="model-search__link"
              :event="!canPaginatePrevious ? '' : 'click'"
              :class="{ 'model-search__link--disabled': !canPaginatePrevious }"
              :to="'/models?page=' + (currentPage - 1) + paramSort + paramFilter"
            >
              <font-awesome-icon :icon="['fas', 'arrow-left']"/> Anterior
            </nuxt-link>
            <nuxt-link
              class="model-search__link"
              :event="!canPaginateNext ? '' : 'click'"
              :class="{ 'model-search__link--disabled': !canPaginateNext }"
              :to="'/models?page=' + (currentPage + 1) + paramSort + paramFilter"
            >
              Siguiente <font-awesome-icon :icon="['fas', 'arrow-right']"/>
            </nuxt-link>
          </div>
          <div class="model-search__sort">
            Ordenar por Nombre
            <nuxt-link
              class="model-search__link"
              :event="!canSort ? '' : 'click'"
              :class="{ 'model-search__link--disabled': !canSort }"
              :to="'/models?page=' + currentPage + '&sort=asc' + paramFilter"
            >
              <font-awesome-icon :icon="['fas', 'arrow-up']"/>
            </nuxt-link>
            <nuxt-link
              class="model-search__link"
              :event="!canSort ? '' : 'click'"
              :class="{ 'model-search__link--disabled': !canSort }"
              :to="'/models?page=' + currentPage + '&sort=desc' + paramFilter"
            >
              <font-awesome-icon :icon="['fas', 'arrow-down']"/>
            </nuxt-link>
          </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$mobileMaxWidth: 480px;
$maxWidthContent: 1200px;
.model-search {
  color: var(--primary-color);
  background-color: var(--background-color);
  padding: 20px 40px;
  
  &__title {
    margin: 16px 0;
  }
  &__wrapper {
    width: 100%;
    max-width: $maxWidthContent;
    margin: 0 auto;
  }

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  &__pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 16px;
    width: 50%;
  }

  &__link {
    &--disabled {
      color: #ababab;
    }
  }

  &__sort {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 16px;
    width: 50%;
  }
  
  &__input {
    background-color: var(--background-color);
    border-style: none;
    padding: 16px;
    background: white;
    border-radius: 4px;
    width: 100%;
    width: calc(100% - 32px);
    border: 1px solid var(--alternative-color);

    &-wrapper {
      width: 50%;
      @media (max-width: $mobileMaxWidth) {
        width: 100%;
      }
    }

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }

  @media (max-width: $mobileMaxWidth) {
    padding: 16px;

    &__content {
      flex-direction: column;
    }

    &__pagination {
      width: 100%;
      padding: 16px;
    }

    &__sort {
      width: 100%;
    }
    
    &__input-wrapper {
      width: 100%;
    }
  }
}
</style>

<script lang="js">
export default {
  name: 'ModelSearch',
  props: {
    numResults: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    currentSort: {
      type: String,
      default: ''
    },
    currentFilter: {
      type: String,
      default: ''
    }
  },
  computed: {
    paramFilter () {
      return this.currentFilter ? `&filter=${this.currentFilter}` : ``;
    },
    paramSort () {
      return this.currentSort ? `&sort=${this.currentSort}` : ``;
    },
    canPaginatePrevious () {
      return this.numResults > 0 && this.currentPage > 1;
    },
    canPaginateNext () {
      return this.numResults === 20 ;
    },
    canSort () {
      return this.numResults > 1;
    }
  },
  data () {
    return {
      filter: ''
    };
  },
  watch: {
    currentFilter: {
      immediate: true,
      handler(value) {
        this.filter = value;
      }
    }
  },
  methods: {
    searchFilter () {
      const filter = this.filter ? `?filter=${this.filter}` : ``;
      this.$emit('search', `/models${filter}`);
    }
  }
}
</script>
