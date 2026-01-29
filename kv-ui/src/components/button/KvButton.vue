<script setup lang="ts">
/**
 * KvButton 按钮组件
 */
import { computed } from 'vue'
import type { ButtonProps, ButtonEmits } from './types'

defineOptions({
  name: 'KvButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  htmlType: 'button',
})

const emit = defineEmits<ButtonEmits>()

const classes = computed(() => [
  'kv-button',
  `kv-button--${props.type}`,
  `kv-button--${props.size}`,
  {
    'kv-button--disabled': props.disabled,
    'kv-button--loading': props.loading,
    'kv-button--block': props.block,
  },
])

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', e)
}
</script>

<template>
  <button
    :class="classes"
    :type="htmlType"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="kv-button__loading">
      <svg class="kv-button__spinner" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span class="kv-button__content">
      <slot />
    </span>
  </button>
</template>
