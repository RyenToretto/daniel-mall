<script setup lang="ts">
/**
 * 默认布局
 */
</script>

<template>
  <div class="layout-default">
    <AppHeader />

    <main class="layout-default__main">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
    padding: var(--dm-spacing-lg) 0;
  }
}
</style>
