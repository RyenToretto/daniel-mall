---
name: tool-development
description: 指导开发客服工具（计算器、模板生成器、数据分析等）。当创建新工具、修改工具逻辑、或设计工具 UI 时使用。
---

# 客服工具开发指南

## 工具分类

| 分类   | 说明               | 示例                  |
| ------ | ------------------ | --------------------- |
| 计算类 | 数据计算、指标分析 | KPI计算器、人效计算器 |
| 模板类 | 文档生成、话术模板 | 话术生成器、SOP模板   |
| 分析类 | 数据可视化、报表   | 客诉分析、转化率分析  |

## 工具开发流程

```
1. 确定工具类型
   ↓
2. 设计输入/输出
   ↓
3. 实现计算逻辑
   ↓
4. 创建 UI 组件
   ↓
5. 添加历史记录
   ↓
6. 测试与文档
```

## 工具组件结构

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToolHistory } from '~/composables/useToolHistory'

// 工具元数据
const toolMeta = {
  id: 'kpi-calculator',
  name: 'KPI 计算器',
  category: 'calculate',
  description: '快速计算客服 KPI 指标',
}

// 输入数据
const input = ref({
  totalCalls: 0,
  resolvedCalls: 0,
  totalTime: 0,
})

// 计算结果
const result = computed(() => ({
  resolutionRate:
    input.value.totalCalls > 0
      ? ((input.value.resolvedCalls / input.value.totalCalls) * 100).toFixed(2)
      : 0,
  avgHandleTime:
    input.value.resolvedCalls > 0
      ? (input.value.totalTime / input.value.resolvedCalls).toFixed(1)
      : 0,
}))

// 历史记录
const { saveHistory } = useToolHistory(toolMeta.id)

const handleCalculate = () => {
  saveHistory({ input: input.value, result: result.value })
}
</script>
```

## 工具 API 设计

```typescript
// POST /api/v1/tools/{toolId}/execute
interface ToolExecuteRequest {
  toolId: string
  input: Record<string, unknown>
  userId?: string // 匿名用户可选
}

interface ToolExecuteResponse {
  success: boolean
  result: Record<string, unknown>
  executionTime: number
  historyId?: string
}
```

## 工具历史记录

```typescript
// 历史记录 Composable
export function useToolHistory(toolId: string) {
  const history = ref<ToolHistory[]>([])

  const saveHistory = async (data: {
    input: Record<string, unknown>
    result: Record<string, unknown>
  }) => {
    const record = {
      id: generateId(),
      toolId,
      input: data.input,
      result: data.result,
      createdAt: new Date().toISOString(),
    }
    history.value.unshift(record)
    // 同步到服务端（如果已登录）
  }

  return { history, saveHistory }
}
```

## 示例工具

详见 [examples/kpi-calculator.md](examples/kpi-calculator.md)
