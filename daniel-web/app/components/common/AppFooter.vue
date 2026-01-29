<script setup lang="ts">
/**
 * 应用底部
 */
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="dm-container">
      <div class="app-footer__content">
        <p class="copyright">© {{ currentYear }} Daniel Mall. All rights reserved.</p>
        <nav class="footer-links">
          <a href="#">关于我们</a>
          <a href="#">隐私政策</a>
          <a href="#">使用条款</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background: var(--dm-color-surface);
  border-top: 1px solid var(--dm-color-border);
  padding: var(--dm-spacing-lg) 0;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--dm-spacing-md);
  }

  .copyright {
    font-size: var(--dm-font-size-sm);
    color: var(--dm-color-text-secondary);
  }

  .footer-links {
    display: flex;
    gap: var(--dm-spacing-lg);

    a {
      font-size: var(--dm-font-size-sm);
      color: var(--dm-color-text-secondary);
      transition: color var(--dm-transition-fast);

      &:hover {
        color: var(--dm-color-primary);
      }
    }
  }
}
</style>
