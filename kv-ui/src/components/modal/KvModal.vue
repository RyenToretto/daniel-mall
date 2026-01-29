<script setup lang="ts">
/**
 * KvModal 模态框组件
 */
import { computed, watch, onMounted, onUnmounted } from 'vue'
import type { ModalProps, ModalEmits } from './types'

defineOptions({
  name: 'KvModal',
})

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  size: 'md',
  closable: true,
  maskClosable: true,
  showFooter: true,
  confirmText: '确定',
  cancelText: '取消',
  confirmLoading: false,
})

const emit = defineEmits<ModalEmits>()

const classes = computed(() => [
  'kv-modal',
  `kv-modal--${props.size}`,
  {
    'kv-modal--open': props.modelValue,
  },
])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    close()
  }
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  close()
}

// ESC 键关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue && props.closable) {
    close()
  }
}

// 锁定滚动
watch(
  () => props.modelValue,
  value => {
    if (value) {
      document.body.style.overflow = 'hidden'
      emit('open')
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="kv-modal-fade">
      <div v-if="modelValue" :class="classes">
        <div class="kv-modal__mask" @click="handleMaskClick" />

        <Transition name="kv-modal-scale">
          <div v-if="modelValue" class="kv-modal__container">
            <div v-if="title || closable" class="kv-modal__header">
              <div class="kv-modal__title">
                <slot name="title">{{ title }}</slot>
              </div>
              <button v-if="closable" class="kv-modal__close" @click="close" aria-label="关闭">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
              </button>
            </div>

            <div class="kv-modal__body">
              <slot />
            </div>

            <div v-if="showFooter" class="kv-modal__footer">
              <slot name="footer">
                <KvButton @click="handleCancel">{{ cancelText }}</KvButton>
                <KvButton type="primary" :loading="confirmLoading" @click="handleConfirm">
                  {{ confirmText }}
                </KvButton>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
