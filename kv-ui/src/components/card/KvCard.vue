<script setup lang="ts">
/**
 * KvCard 卡片组件
 */
import { computed } from 'vue'
import type { CardProps } from './types'

defineOptions({
  name: 'KvCard',
})

const props = withDefaults(defineProps<CardProps>(), {
  bordered: true,
  shadow: false,
  hoverable: false,
  padding: 'md',
})

const classes = computed(() => [
  'kv-card',
  `kv-card--padding-${props.padding}`,
  {
    'kv-card--bordered': props.bordered,
    'kv-card--shadow': props.shadow === true,
    'kv-card--shadow-hover': props.shadow === 'hover',
    'kv-card--hoverable': props.hoverable,
  },
])
</script>

<template>
  <div :class="classes">
    <div v-if="title || $slots.header" class="kv-card__header">
      <slot name="header">
        <div class="kv-card__title">{{ title }}</div>
        <div v-if="subtitle" class="kv-card__subtitle">{{ subtitle }}</div>
      </slot>
      <div v-if="$slots.extra" class="kv-card__extra">
        <slot name="extra" />
      </div>
    </div>

    <div class="kv-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="kv-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
