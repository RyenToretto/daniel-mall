<script setup lang="ts">
/**
 * 工具列表页
 */
definePageMeta({
  title: '工具列表 - Daniel Mall',
})

const route = useRoute()
const { tools, categories, loading, fetchTools, fetchCategories } = useTools()

// 筛选条件
const currentCategory = computed(() => (route.query.category as string) || '')
const searchKeyword = ref('')

// 获取数据
onMounted(async () => {
  await fetchCategories()
  await fetchTools({ category: currentCategory.value })
})

// 监听分类变化
watch(currentCategory, async category => {
  await fetchTools({ category })
})

// 搜索
const handleSearch = async () => {
  await fetchTools({
    category: currentCategory.value,
    keyword: searchKeyword.value,
  })
}
</script>

<template>
  <div class="tools-page">
    <div class="dm-container">
      <div class="tools-page__header">
        <h1>工具中心</h1>
        <p>选择你需要的工具，提升工作效率</p>
      </div>

      <div class="tools-page__content">
        <!-- 侧边栏 -->
        <aside class="tools-sidebar">
          <h3>工具分类</h3>
          <nav class="tools-sidebar__nav">
            <NuxtLink to="/tools" :class="['nav-item', { 'is-active': !currentCategory }]">
              全部工具
            </NuxtLink>
            <NuxtLink
              v-for="category in categories"
              :key="category.code"
              :to="`/tools?category=${category.code}`"
              :class="['nav-item', { 'is-active': currentCategory === category.code }]"
            >
              {{ category.name }}
              <span class="count">{{ category.toolCount }}</span>
            </NuxtLink>
          </nav>
        </aside>

        <!-- 工具列表 -->
        <main class="tools-main">
          <!-- 搜索栏 -->
          <div class="tools-search">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="搜索工具..."
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch">搜索</button>
          </div>

          <!-- 工具网格 -->
          <div v-if="loading" class="tools-loading">加载中...</div>
          <div v-else-if="tools.length === 0" class="tools-empty">暂无工具</div>
          <div v-else class="tools-grid">
            <ToolCard v-for="tool in tools" :key="tool.id" :tool="tool" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tools-page {
  &__header {
    text-align: center;
    margin-bottom: var(--dm-spacing-xl);

    h1 {
      font-size: var(--dm-font-size-2xl);
      font-weight: var(--dm-font-weight-bold);
      color: var(--dm-color-text);
      margin-bottom: var(--dm-spacing-sm);
    }

    p {
      color: var(--dm-color-text-secondary);
    }
  }

  &__content {
    display: flex;
    gap: var(--dm-spacing-xl);

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}

.tools-sidebar {
  width: 240px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  h3 {
    font-size: var(--dm-font-size-md);
    font-weight: var(--dm-font-weight-semibold);
    color: var(--dm-color-text);
    margin-bottom: var(--dm-spacing-md);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-xs);

    @media (max-width: 768px) {
      flex-direction: row;
      overflow-x: auto;
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dm-spacing-sm) var(--dm-spacing-md);
    border-radius: var(--dm-radius-md);
    color: var(--dm-color-text-secondary);
    transition: all var(--dm-transition-fast);

    &:hover {
      background: var(--dm-color-surface);
      color: var(--dm-color-text);
    }

    &.is-active {
      background: var(--dm-color-primary-light);
      color: var(--dm-color-primary);
    }

    .count {
      font-size: var(--dm-font-size-xs);
      background: var(--dm-color-surface-elevated);
      padding: 2px 8px;
      border-radius: var(--dm-radius-full);
    }
  }
}

.tools-main {
  flex: 1;
  min-width: 0;
}

.tools-search {
  display: flex;
  gap: var(--dm-spacing-sm);
  margin-bottom: var(--dm-spacing-lg);

  .search-input {
    flex: 1;
    padding: var(--dm-spacing-sm) var(--dm-spacing-md);
    background: var(--dm-color-surface);
    border: 1px solid var(--dm-color-border);
    border-radius: var(--dm-radius-md);
    color: var(--dm-color-text);
    font-size: var(--dm-font-size-md);

    &::placeholder {
      color: var(--dm-color-text-muted);
    }

    &:focus {
      outline: none;
      border-color: var(--dm-color-primary);
    }
  }

  .search-btn {
    padding: var(--dm-spacing-sm) var(--dm-spacing-lg);
    background: var(--dm-color-primary);
    color: white;
    border: none;
    border-radius: var(--dm-radius-md);
    cursor: pointer;
    transition: background var(--dm-transition-fast);

    &:hover {
      background: var(--dm-color-primary-hover);
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--dm-spacing-md);
}

.tools-loading,
.tools-empty {
  text-align: center;
  padding: var(--dm-spacing-2xl);
  color: var(--dm-color-text-secondary);
}
</style>
