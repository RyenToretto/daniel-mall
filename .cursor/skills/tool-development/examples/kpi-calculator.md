# KPI 计算器示例

## 功能描述

快速计算客服常用 KPI 指标，包括解决率、平均处理时长、满意度等。

## 输入字段

| 字段           | 类型   | 说明               |
| -------------- | ------ | ------------------ |
| totalCalls     | number | 总接待量           |
| resolvedCalls  | number | 解决量             |
| totalTime      | number | 总处理时长（分钟） |
| satisfiedCount | number | 满意评价数         |
| totalRated     | number | 总评价数           |

## 输出结果

| 指标             | 计算公式                           | 说明                |
| ---------------- | ---------------------------------- | ------------------- |
| resolutionRate   | resolvedCalls / totalCalls \* 100  | 解决率 (%)          |
| avgHandleTime    | totalTime / resolvedCalls          | 平均处理时长 (分钟) |
| satisfactionRate | satisfiedCount / totalRated \* 100 | 满意度 (%)          |
| callsPerHour     | totalCalls / (totalTime / 60)      | 每小时接待量        |

## Vue 组件实现

```vue
<template>
  <div class="kpi-calculator">
    <KvCard title="KPI 计算器">
      <!-- 输入区域 -->
      <div class="input-section">
        <KvInput v-model="input.totalCalls" type="number" label="总接待量" />
        <KvInput v-model="input.resolvedCalls" type="number" label="解决量" />
        <KvInput v-model="input.totalTime" type="number" label="总处理时长(分钟)" />
      </div>

      <!-- 结果区域 -->
      <div class="result-section">
        <ResultCard label="解决率" :value="`${result.resolutionRate}%`" />
        <ResultCard label="平均处理时长" :value="`${result.avgHandleTime} 分钟`" />
      </div>

      <!-- 操作按钮 -->
      <div class="actions">
        <KvButton @click="calculate">计算</KvButton>
        <KvButton type="secondary" @click="reset">重置</KvButton>
        <KvButton type="secondary" @click="copyResult">复制结果</KvButton>
      </div>
    </KvCard>
  </div>
</template>
```
