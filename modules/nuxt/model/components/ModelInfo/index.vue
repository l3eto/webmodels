<template>
  <div class="model-info">
    <div class="model-info__title">
      <template
        v-if="!editModelName"
        class="model-info__title"
      >
        <h1 class="model-info__title-text">{{ model.name }}</h1>
        <button
          class="model-info__edit"
          @click="edit"
        >
          <font-awesome-icon :icon="['fas', 'pencil']" />
        </button>
      </template>
      <template
        v-else
        class="model-info__title"
      >
        <input
          v-model="modelName"
          class="model-info__input"
          :class="{ 'model-info__input--has-errors': inputHasErrors }"
          v-on:keyup.enter="save"
          type="text"
          name="name"
          placeholder="Introducir Nombre"
          />
        <button
          class="model-info__save"
          :class="{ 'model-info__save--disabled': inputHasErrors }"
          @click="save"
        >
          <font-awesome-icon :icon="['fas', 'check']" />
        </button>
        <button
          class="model-info__cancel"
          @click="restore"
        >
          <font-awesome-icon :icon="['fas', 'ban']" />
        </button>
      </template>
    </div>
    <div class="model-info__details">
      <p>Correo: {{ model.email }}</p>
      <p>Edad: {{ model.age }}</p>
      <p v-if="model.eyes">Color de ojos: {{ model.eyes }}</p>
      <p class="model-info__gender">Gender: {{ model.gender }}</p>
      <p class="model-info__tags">Tags: {{ model.tags.join(',') }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$mobileMaxWidth: 480px;
$maxWidthContent: 900px;
.model-info {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__title {
    display: flex;
    align-items: center;

    &-text {
      padding: 16px;
    }
  }

  &__edit,
  &__save,
  &__cancel {
    padding: 8px;
    margin: 0;
    font-size: 1.25em;
    cursor: pointer;
  }

  &__save {
    &--disabled {
      color: grey;
    }
  }

  &__details {
    margin: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__tags {
    color: grey;
  }

  &__gender{
    flex-grow: 1;
  }

  &__input {
    border-style: none;
    width: auto;
    font-size: 2em;
    font-weight: bold;
    padding: 8px;
    margin: 12px 8px 11px 6px;
    border: 2px solid #a4cbfd;

    &:focus {
      outline: none;
      border-color: #4c9aff;
    }

    &::placeholder {
      padding: 8px;
      font-weight: bold;
      opacity: 0.5;
      color: #4c9aff;
    }

    &--has-errors {
      border-color: red;

      &::placeholder {
        color: red;
      }
      &:focus {
        border-color: red;
      }
    }
  }
}
</style>

<script lang="js">
import ModelImage from './../ModelImage';

export default {
  name: 'ModelInfo',
  components: {
    ModelImage
  },
  computed: {
    inputHasErrors () {
      return !this.modelName.replace(/\s/g, '').length;
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      processing: false,
      editModelName: false,
      modelName: ''
    };
  },
  mounted () {
    this._setModelName();
  },
  methods: {
    async save () {
      if (this.processing || this.inputHasErrors) {
        return;
      }
      this.processing = true;
      const name = this._formatName(this.modelName);
      const data = Object.assign({}, this.model, { name });
      const model = await this.$modelService.update(this.$route.params.id, data);
      this.$emit('updateModel', model);
      this.editModelName = false;
      this.processing = false;
      this.modelName = name;
    },
    restore () {
      this.editModelName = false;
      this._setModelName();
    },
    edit () {
      this.editModelName = true;
    },
    _setModelName () {
      this.modelName = this.model.name;
    },
    _formatName (value) {
      return value.trim().toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    }
  }
}
</script>