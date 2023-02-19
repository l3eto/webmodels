<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <div class="default-layout__header-wrapper">
        <nuxt-link :to="'/'">WebModels</nuxt-link>
        <div class="default-layout__header-links">
          <nuxt-link :to="'/models'">Models</nuxt-link>
        </div>
      </div>
    </header>
    <Nuxt class="default-layout__content" />
    <footer class="default-layout__footer">
      <p>© 2023 WebModels</p>
    </footer>
  </div>
</template>

<style lang="scss">
$maxWidthContent: 1200px;
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1;
  }

  &__header,
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: var(--primary-color);
  }

  &__header {
    &-wrapper {
      width: calc(100% - 40px);
      max-width: $maxWidthContent;
      margin: 0 auto;
      padding: 20px;
      display: flex;
      justify-content: space-between;
    }
  }

  &__footer {
    padding: 40px 20px;
  }
}
</style>