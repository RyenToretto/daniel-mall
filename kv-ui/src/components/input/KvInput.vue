<script setup lang="ts">
/**
 * KvInput 输入框组件
 */
import { computed, ref } from 'vue'
import type { InputProps, InputEmits } from './types'

defineOptions({
  name: 'KvInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  clearable: false,
  error: false,
})

const emit = defineEmits<InputEmits>()

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)

const classes = computed(() => [
  'kv-input',
  `kv-input--${props.size}`,
  {
    'kv-input--disabled': props.disabled,
    'kv-input--focused': isFocused.value,
    'kv-input--error': props.error,
    'kv-input--clearable': props.clearable && props.modelValue,
  },
])

const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && props.modelValue
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('change', value)
}

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', e)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div :class="classes">
    <span v-if="prefixIcon" class="kv-input__prefix">
      <slot name="prefix">
        <KvIcon :name="prefixIcon" />
      </slot>
    </span>

    <input
      ref="inputRef"
      class="kv-input__inner"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span v-if="showClear" class="kv-input__clear" @click="handleClear">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path
          fill="currentColor"
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
        />
      </svg>
    </span>

    <span v-if="suffixIcon && !showClear" class="kv-input__suffix">
      <slot name="suffix">
        <KvIcon :name="suffixIcon" />
      </slot>
    </span>

    <div v-if="error && errorMessage" class="kv-input__error">
      {{ errorMessage }}
    </div>
  </div>
</template>
