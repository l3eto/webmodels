<template>
  <div>
    <model-search
      :numResults="models.length"
      :currentPage="currentPage"
      :currentSort="currentSort"
      :currentFilter="currentFilter"
      @search="searchByFilter"
      />
    <model-list
      :models="models"
      :error="error"
      :loading="loading"
     />
  </div>
</template>

<script lang="js">
import ModelSearch from './../modules/nuxt/model/components/ModelSearch';
import ModelList from './../modules/nuxt/model/components/ModelList';

export default {
  name: 'ModelsPage',
  head: {
    title: 'Models | WebModels'
  },
  components: {
    ModelSearch,
    ModelList
  },
  watch: {
    '$route.query': '$fetch'
  },
  data () {
    return {
      models: [],
      currentPage: 1,
      currentSort: '',
      currentFilter: '',
      loading: false,
      error: false
    };
  },
  async fetch() {
    try {
      this.loading = true;
      this.error = false;
      const params = this.getParams();
      this.models = await this.$modelService.getAll(params);
      this.setCurrentParams(params);
    } catch (err) {
      this.error = true;
    }
    this.loading = false;
  },
  methods: {
    getParams () {
      const params = {
        _limit: 20
      };
      const paramPage = this.$route.query.page;
      const currentPage = parseInt(paramPage && paramPage > 0 ? paramPage : 1);
      if (currentPage > 1) {
        params._page = currentPage;
      }
      const currentSort = this.$route.query.sort;
      if (currentSort) {
        params._order = currentSort;
        params._sort = 'name';
      }
      const currentFilter = this.$route.query.filter;
      if (currentFilter) {
        params.name_like = currentFilter;
      }
      return params;
    },
    setCurrentParams ({ _page, _order, name_like }) {
      this.currentPage = _page;
      this.currentSort = _order;
      this.currentFilter = name_like;
    },
    searchByFilter (url) {
      this.currentPage = 1;
      this.currentSort = '';
      this.loading = true;
      this.error = false;
      this.$router.push(url);
    }
  }
}
</script>
