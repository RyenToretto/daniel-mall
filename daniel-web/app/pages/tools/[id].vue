<script setup lang="ts">
/**
 * 工具详情页
 */
import { calculateKPI } from '@daniel-mall/ku-utils'

const route = useRoute()
const toolId = computed(() => Number(route.params.id))

const { currentTool, loading, fetchTool, toggleFavorite } = useTools()
const { saveHistory } = useHistory()

// 工具输入
const input = ref<Record<string, number>>({
  totalCalls: 0,
  resolvedCalls: 0,
  totalTime: 0,
  satisfiedCount: 0,
  totalRated: 0,
})

// 计算结果
const result = ref<Record<string, unknown> | null>(null)

// 获取工具详情
onMounted(async () => {
  await fetchTool(toolId.value)
})

// 执行计算
const execute = () => {
  // 这里演示 KPI 计算器
  const kpiResult = calculateKPI({
    totalCalls: input.value.totalCalls,
    resolvedCalls: input.value.resolvedCalls,
    totalTime: input.value.totalTime,
    satisfiedCount: input.value.satisfiedCount,
    totalRated: input.value.totalRated,
  })

  result.value = kpiResult

  // 保存历史
  saveHistory({
    toolId: toolId.value,
    input: { ...input.value },
    output: kpiResult,
  })
}

// 重置
const reset = () => {
  input.value = {
    totalCalls: 0,
    resolvedCalls: 0,
    totalTime: 0,
    satisfiedCount: 0,
    totalRated: 0,
  }
  result.value = null
}

// 复制结果
const copyResult = async () => {
  if (!result.value) return
  const text = Object.entries(result.value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  await navigator.clipboard.writeText(text)
  alert('已复制到剪贴板')
}
</script>

<template>
  <div class="tool-detail">
    <div class="dm-container">
      <!-- 面包屑 -->
      <nav class="breadcrumb">
        <NuxtLink to="/">首页</NuxtLink>
        <span>/</span>
        <NuxtLink to="/tools">工具</NuxtLink>
        <span>/</span>
        <span>{{ currentTool?.name || '加载中...' }}</span>
      </nav>

      <div v-if="loading" class="loading">加载中...</div>

      <div v-else-if="currentTool" class="tool-content">
        <!-- 工具头部 -->
        <header class="tool-header">
          <div class="tool-header__info">
            <h1>{{ currentTool.name }}</h1>
            <p>{{ currentTool.description }}</p>
          </div>
          <div class="tool-header__actions">
            <button
              :class="['favorite-btn', { 'is-active': currentTool.isFavorite }]"
              @click="toggleFavorite(currentTool.id)"
            >
              {{ currentTool.isFavorite ? '已收藏' : '收藏' }}
            </button>
          </div>
        </header>

        <!-- 工具主体 -->
        <div class="tool-body">
          <!-- 输入区域 -->
          <div class="tool-input">
            <h3>输入数据</h3>
            <div class="input-grid">
              <div class="input-field">
                <label>总接待量</label>
                <input v-model.number="input.totalCalls" type="number" min="0" />
              </div>
              <div class="input-field">
                <label>解决量</label>
                <input v-model.number="input.resolvedCalls" type="number" min="0" />
              </div>
              <div class="input-field">
                <label>总处理时长（分钟）</label>
                <input v-model.number="input.totalTime" type="number" min="0" />
              </div>
              <div class="input-field">
                <label>满意评价数</label>
                <input v-model.number="input.satisfiedCount" type="number" min="0" />
              </div>
              <div class="input-field">
                <label>总评价数</label>
                <input v-model.number="input.totalRated" type="number" min="0" />
              </div>
            </div>
            <div class="input-actions">
              <button class="btn btn--primary" @click="execute">计算</button>
              <button class="btn btn--secondary" @click="reset">重置</button>
            </div>
          </div>

          <!-- 结果区域 -->
          <div class="tool-output">
            <h3>计算结果</h3>
            <div v-if="result" class="result-grid">
              <div class="result-item">
                <span class="label">解决率</span>
                <span class="value">{{ result.resolutionRate }}%</span>
              </div>
              <div class="result-item">
                <span class="label">平均处理时长</span>
                <span class="value">{{ result.avgHandleTime }} 分钟</span>
              </div>
              <div class="result-item">
                <span class="label">每小时接待量</span>
                <span class="value">{{ result.callsPerHour }}</span>
              </div>
              <div v-if="result.satisfactionRate !== null" class="result-item">
                <span class="label">满意度</span>
                <span class="value">{{ result.satisfactionRate }}%</span>
              </div>
            </div>
            <div v-else class="result-empty">请输入数据并点击计算</div>
            <div v-if="result" class="result-actions">
              <button class="btn btn--secondary" @click="copyResult">复制结果</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tool-detail {
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-sm);
    margin-bottom: var(--dm-spacing-lg);
    font-size: var(--dm-font-size-sm);
    color: var(--dm-color-text-secondary);

    a:hover {
      color: var(--dm-color-primary);
    }
  }

  .loading {
    text-align: center;
    padding: var(--dm-spacing-2xl);
    color: var(--dm-color-text-secondary);
  }
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--dm-spacing-lg);
  margin-bottom: var(--dm-spacing-xl);
  padding-bottom: var(--dm-spacing-lg);
  border-bottom: 1px solid var(--dm-color-border);

  &__info {
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

  .favorite-btn {
    padding: var(--dm-spacing-sm) var(--dm-spacing-md);
    background: transparent;
    border: 1px solid var(--dm-color-border);
    border-radius: var(--dm-radius-md);
    color: var(--dm-color-text-secondary);
    cursor: pointer;
    transition: all var(--dm-transition-fast);

    &:hover {
      border-color: var(--dm-color-primary);
      color: var(--dm-color-primary);
    }

    &.is-active {
      background: var(--dm-color-primary-light);
      border-color: var(--dm-color-primary);
      color: var(--dm-color-primary);
    }
  }
}

.tool-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--dm-spacing-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.tool-input,
.tool-output {
  background: var(--dm-color-surface);
  border: 1px solid var(--dm-color-border);
  border-radius: var(--dm-radius-lg);
  padding: var(--dm-spacing-lg);

  h3 {
    font-size: var(--dm-font-size-lg);
    font-weight: var(--dm-font-weight-semibold);
    color: var(--dm-color-text);
    margin-bottom: var(--dm-spacing-md);
  }
}

.input-grid {
  display: flex;
  flex-direction: column;
  gap: var(--dm-spacing-md);
}

.input-field {
  label {
    display: block;
    margin-bottom: var(--dm-spacing-xs);
    font-size: var(--dm-font-size-sm);
    color: var(--dm-color-text-secondary);
  }

  input {
    width: 100%;
    padding: var(--dm-spacing-sm) var(--dm-spacing-md);
    background: var(--dm-color-background);
    border: 1px solid var(--dm-color-border);
    border-radius: var(--dm-radius-md);
    color: var(--dm-color-text);
    font-size: var(--dm-font-size-md);

    &:focus {
      outline: none;
      border-color: var(--dm-color-primary);
    }
  }
}

.input-actions,
.result-actions {
  display: flex;
  gap: var(--dm-spacing-sm);
  margin-top: var(--dm-spacing-lg);
}

.btn {
  padding: var(--dm-spacing-sm) var(--dm-spacing-lg);
  border: none;
  border-radius: var(--dm-radius-md);
  font-size: var(--dm-font-size-md);
  font-weight: var(--dm-font-weight-medium);
  cursor: pointer;
  transition: all var(--dm-transition-fast);

  &--primary {
    background: var(--dm-color-primary);
    color: white;

    &:hover {
      background: var(--dm-color-primary-hover);
    }
  }

  &--secondary {
    background: var(--dm-color-surface-elevated);
    color: var(--dm-color-text);

    &:hover {
      background: var(--dm-color-border);
    }
  }
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--dm-spacing-md);
}

.result-item {
  padding: var(--dm-spacing-md);
  background: var(--dm-color-background);
  border-radius: var(--dm-radius-md);
  text-align: center;

  .label {
    display: block;
    font-size: var(--dm-font-size-sm);
    color: var(--dm-color-text-secondary);
    margin-bottom: var(--dm-spacing-xs);
  }

  .value {
    font-size: var(--dm-font-size-xl);
    font-weight: var(--dm-font-weight-bold);
    color: var(--dm-color-primary);
  }
}

.result-empty {
  text-align: center;
  padding: var(--dm-spacing-xl);
  color: var(--dm-color-text-muted);
}
</style>
