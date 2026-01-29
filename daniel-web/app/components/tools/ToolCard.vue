<script setup lang="ts">
/**
 * 工具卡片组件
 */
import type { Tool } from '~/types/tool'

const props = defineProps<{
  tool: Tool
}>()

const { toggleFavorite } = useTools()

const handleFavorite = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  toggleFavorite(props.tool.id)
}
</script>

<template>
  <NuxtLink :to="`/tools/${tool.id}`" class="tool-card">
    <div class="tool-card__icon">
      <span>🛠️</span>
    </div>
    <div class="tool-card__content">
      <h3 class="tool-card__title">{{ tool.name }}</h3>
      <p class="tool-card__desc">{{ tool.description }}</p>
      <div class="tool-card__meta">
        <span class="category">{{ tool.categoryName }}</span>
        <span class="usage">{{ tool.usageCount }} 次使用</span>
      </div>
    </div>
    <button
      :class="['tool-card__favorite', { 'is-active': tool.isFavorite }]"
      @click="handleFavorite"
    >
      {{ tool.isFavorite ? '❤️' : '🤍' }}
    </button>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.tool-card {
  display: flex;
  align-items: flex-start;
  gap: var(--dm-spacing-md);
  padding: var(--dm-spacing-lg);
  background: var(--dm-color-surface);
  border: 1px solid var(--dm-color-border);
  border-radius: var(--dm-radius-lg);
  transition: all var(--dm-transition-fast) var(--dm-ease-out);

  &:hover {
    border-color: var(--dm-color-primary);
    transform: translateY(-2px);
    box-shadow: var(--dm-shadow-md);
  }

  .theme-hero &:hover {
    box-shadow: var(--dm-glow-gold);
  }

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--dm-color-primary-light);
    border-radius: var(--dm-radius-md);
    font-size: 24px;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: var(--dm-font-size-md);
    font-weight: var(--dm-font-weight-semibold);
    color: var(--dm-color-text);
    margin-bottom: var(--dm-spacing-xs);
  }

  &__desc {
    font-size: var(--dm-font-size-sm);
    color: var(--dm-color-text-secondary);
    margin-bottom: var(--dm-spacing-sm);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-md);
    font-size: var(--dm-font-size-xs);
    color: var(--dm-color-text-muted);

    .category {
      padding: 2px 8px;
      background: var(--dm-color-surface-elevated);
      border-radius: var(--dm-radius-sm);
    }
  }

  &__favorite {
    padding: var(--dm-spacing-sm);
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    transition: transform var(--dm-transition-fast);

    &:hover {
      transform: scale(1.2);
    }

    &.is-active {
      animation: heartBeat 0.3s ease-in-out;
    }
  }
}

@keyframes heartBeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
</style>
