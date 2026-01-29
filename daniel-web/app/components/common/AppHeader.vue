<script setup lang="ts">
/**
 * 应用头部
 */
const { theme, setTheme } = useTheme()
const { user, isLoggedIn } = useUser()

const themes = [
  { value: 'light', label: '亮色' },
  { value: 'dark', label: '暗色' },
  { value: 'hero', label: 'Hero' },
] as const
</script>

<template>
  <header class="app-header">
    <div class="dm-container">
      <div class="app-header__content">
        <!-- Logo -->
        <NuxtLink to="/" class="app-header__logo">
          <span class="logo-text">Daniel Mall</span>
        </NuxtLink>

        <!-- 导航 -->
        <nav class="app-header__nav">
          <NuxtLink to="/" class="nav-link">首页</NuxtLink>
          <NuxtLink to="/tools" class="nav-link">工具</NuxtLink>
          <NuxtLink to="/history" class="nav-link">历史</NuxtLink>
          <NuxtLink to="/favorites" class="nav-link">收藏</NuxtLink>
        </nav>

        <!-- 右侧操作 -->
        <div class="app-header__actions">
          <!-- 主题切换 -->
          <select
            :value="theme"
            class="theme-select"
            @change="setTheme(($event.target as HTMLSelectElement).value as any)"
          >
            <option v-for="t in themes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>

          <!-- 用户 -->
          <div v-if="isLoggedIn" class="user-info">
            <span>{{ user?.email }}</span>
          </div>
          <button v-else class="login-btn">绑定邮箱</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: var(--dm-color-surface);
  border-bottom: 1px solid var(--dm-color-border);
  position: sticky;
  top: 0;
  z-index: var(--dm-z-sticky);

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  &__logo {
    .logo-text {
      font-size: var(--dm-font-size-xl);
      font-weight: var(--dm-font-weight-bold);
      background: var(--dm-gradient-gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__nav {
    display: flex;
    gap: var(--dm-spacing-lg);

    @media (max-width: 768px) {
      display: none;
    }

    .nav-link {
      color: var(--dm-color-text-secondary);
      font-weight: var(--dm-font-weight-medium);
      transition: color var(--dm-transition-fast);

      &:hover,
      &.router-link-active {
        color: var(--dm-color-primary);
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-md);
  }

  .theme-select {
    padding: var(--dm-spacing-xs) var(--dm-spacing-sm);
    background: var(--dm-color-background);
    border: 1px solid var(--dm-color-border);
    border-radius: var(--dm-radius-md);
    color: var(--dm-color-text);
    font-size: var(--dm-font-size-sm);
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: var(--dm-color-primary);
    }
  }

  .login-btn {
    padding: var(--dm-spacing-sm) var(--dm-spacing-md);
    background: var(--dm-color-primary);
    color: white;
    border: none;
    border-radius: var(--dm-radius-md);
    font-size: var(--dm-font-size-sm);
    cursor: pointer;
    transition: background var(--dm-transition-fast);

    &:hover {
      background: var(--dm-color-primary-hover);
    }
  }

  .user-info {
    font-size: var(--dm-font-size-sm);
    color: var(--dm-color-text-secondary);
  }
}
</style>
