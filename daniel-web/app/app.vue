<script setup lang="ts">
/**
 * 应用根组件
 */
const { initTheme } = useTheme()
const { initUser } = useUser()

// 初始化
onMounted(async () => {
  initTheme()
  await initUser()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
