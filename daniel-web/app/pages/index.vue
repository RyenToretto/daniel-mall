<script setup lang="ts">
/**
 * 首页
 */
definePageMeta({
  title: 'Daniel Mall - 客服工具箱',
})

const { tools, categories, fetchTools, fetchCategories } = useTools()

// 获取数据
onMounted(async () => {
  await Promise.all([fetchTools({ size: 6 }), fetchCategories()])
})
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="dm-container">
        <div class="hero__content">
          <h1 class="hero__title">
            客服工具箱
            <span class="hero__highlight">效率提升神器</span>
          </h1>
          <p class="hero__desc">
            面向电商客服的工具订阅平台，提供 KPI 计算、话术模板、数据分析等工具
          </p>
          <div class="hero__actions">
            <NuxtLink to="/tools" class="hero__btn hero__btn--primary"> 开始使用 </NuxtLink>
            <NuxtLink to="/tools" class="hero__btn hero__btn--secondary"> 浏览工具 </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 工具分类 -->
    <section class="categories">
      <div class="dm-container">
        <h2 class="section-title">工具分类</h2>
        <div class="categories__grid">
          <NuxtLink
            v-for="category in categories"
            :key="category.code"
            :to="`/tools?category=${category.code}`"
            class="category-card"
          >
            <div class="category-card__icon">
              <span>{{ category.icon }}</span>
            </div>
            <div class="category-card__content">
              <h3>{{ category.name }}</h3>
              <p>{{ category.toolCount }} 个工具</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 热门工具 -->
    <section class="popular-tools">
      <div class="dm-container">
        <div class="section-header">
          <h2 class="section-title">热门工具</h2>
          <NuxtLink to="/tools" class="section-link"> 查看全部 → </NuxtLink>
        </div>
        <div class="tools-grid">
          <ToolCard v-for="tool in tools" :key="tool.id" :tool="tool" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  // Hero
  .hero {
    padding: var(--dm-spacing-2xl) 0;
    background: var(--dm-gradient-dark);
    text-align: center;

    &__content {
      max-width: 800px;
      margin: 0 auto;
    }

    &__title {
      font-size: var(--dm-font-size-3xl);
      font-weight: var(--dm-font-weight-bold);
      color: var(--dm-color-text);
      margin-bottom: var(--dm-spacing-md);

      @media (max-width: 640px) {
        font-size: var(--dm-font-size-2xl);
      }
    }

    &__highlight {
      display: block;
      background: var(--dm-gradient-gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &__desc {
      font-size: var(--dm-font-size-lg);
      color: var(--dm-color-text-secondary);
      margin-bottom: var(--dm-spacing-xl);
    }

    &__actions {
      display: flex;
      gap: var(--dm-spacing-md);
      justify-content: center;
      flex-wrap: wrap;
    }

    &__btn {
      display: inline-flex;
      align-items: center;
      padding: var(--dm-spacing-md) var(--dm-spacing-xl);
      border-radius: var(--dm-radius-md);
      font-weight: var(--dm-font-weight-semibold);
      transition: all var(--dm-transition-fast) var(--dm-ease-out);

      &--primary {
        background: var(--dm-gradient-gold);
        color: var(--dm-color-background);

        &:hover {
          box-shadow: var(--dm-glow-gold);
        }
      }

      &--secondary {
        background: transparent;
        border: 1px solid var(--dm-color-border);
        color: var(--dm-color-text);

        &:hover {
          border-color: var(--dm-color-primary);
          color: var(--dm-color-primary);
        }
      }
    }
  }

  // 分类
  .categories {
    padding: var(--dm-spacing-2xl) 0;

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--dm-spacing-md);
    }
  }

  .category-card {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-md);
    padding: var(--dm-spacing-lg);
    background: var(--dm-color-surface);
    border: 1px solid var(--dm-color-border);
    border-radius: var(--dm-radius-lg);
    transition: all var(--dm-transition-fast) var(--dm-ease-out);

    &:hover {
      border-color: var(--dm-color-primary);
      transform: translateY(-2px);
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
    }

    &__content {
      h3 {
        font-size: var(--dm-font-size-md);
        font-weight: var(--dm-font-weight-semibold);
        color: var(--dm-color-text);
      }

      p {
        font-size: var(--dm-font-size-sm);
        color: var(--dm-color-text-secondary);
      }
    }
  }

  // 热门工具
  .popular-tools {
    padding: var(--dm-spacing-2xl) 0;
    background: var(--dm-color-surface);
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--dm-spacing-lg);
  }

  .section-title {
    font-size: var(--dm-font-size-xl);
    font-weight: var(--dm-font-weight-semibold);
    color: var(--dm-color-text);
  }

  .section-link {
    font-size: var(--dm-font-size-sm);
    color: var(--dm-color-primary);
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--dm-spacing-md);
  }
}
</style>
