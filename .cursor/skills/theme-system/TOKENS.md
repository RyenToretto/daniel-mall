# 设计令牌（Design Tokens）

## 颜色令牌

### 语义化颜色

| 令牌                        | Light   | Dark    | Hero    | 用途     |
| --------------------------- | ------- | ------- | ------- | -------- |
| `--dm-color-primary`        | #3b82f6 | #60a5fa | #c89b3c | 主要操作 |
| `--dm-color-secondary`      | #6b7280 | #9ca3af | #0a323c | 次要操作 |
| `--dm-color-background`     | #ffffff | #111827 | #010a13 | 页面背景 |
| `--dm-color-surface`        | #f9fafb | #1f2937 | #1e2328 | 卡片背景 |
| `--dm-color-text`           | #111827 | #f9fafb | #f0e6d3 | 主要文字 |
| `--dm-color-text-secondary` | #6b7280 | #9ca3af | #a09b8c | 次要文字 |

### 状态颜色

| 令牌                 | 值      | 用途     |
| -------------------- | ------- | -------- |
| `--dm-color-success` | #22c55e | 成功状态 |
| `--dm-color-warning` | #f59e0b | 警告状态 |
| `--dm-color-error`   | #ef4444 | 错误状态 |
| `--dm-color-info`    | #3b82f6 | 信息提示 |

## 间距令牌

| 令牌               | 值   | 用途     |
| ------------------ | ---- | -------- |
| `--dm-spacing-xs`  | 4px  | 紧凑间距 |
| `--dm-spacing-sm`  | 8px  | 小间距   |
| `--dm-spacing-md`  | 16px | 标准间距 |
| `--dm-spacing-lg`  | 24px | 大间距   |
| `--dm-spacing-xl`  | 32px | 超大间距 |
| `--dm-spacing-2xl` | 48px | 区块间距 |

## 圆角令牌

| 令牌               | 值     | 用途               |
| ------------------ | ------ | ------------------ |
| `--dm-radius-sm`   | 4px    | 小圆角（Tag）      |
| `--dm-radius-md`   | 8px    | 标准圆角（Button） |
| `--dm-radius-lg`   | 12px   | 大圆角（Card）     |
| `--dm-radius-xl`   | 16px   | 超大圆角（Modal）  |
| `--dm-radius-full` | 9999px | 圆形               |

## 阴影令牌

| 令牌             | 值                          | 用途     |
| ---------------- | --------------------------- | -------- |
| `--dm-shadow-sm` | 0 1px 2px rgba(0,0,0,0.05)  | 微阴影   |
| `--dm-shadow-md` | 0 4px 6px rgba(0,0,0,0.1)   | 标准阴影 |
| `--dm-shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) | 大阴影   |
| `--dm-shadow-xl` | 0 20px 25px rgba(0,0,0,0.1) | 超大阴影 |

## 字体令牌

| 令牌                 | 值   | 用途         |
| -------------------- | ---- | ------------ |
| `--dm-font-size-xs`  | 12px | 辅助文字     |
| `--dm-font-size-sm`  | 14px | 小文字       |
| `--dm-font-size-md`  | 16px | 正文（基准） |
| `--dm-font-size-lg`  | 18px | 大文字       |
| `--dm-font-size-xl`  | 24px | 标题         |
| `--dm-font-size-2xl` | 30px | 大标题       |
| `--dm-font-size-3xl` | 36px | 超大标题     |

## 动画令牌

| 令牌                     | 值                             | 用途     |
| ------------------------ | ------------------------------ | -------- |
| `--dm-transition-fast`   | 150ms                          | 快速过渡 |
| `--dm-transition-normal` | 250ms                          | 标准过渡 |
| `--dm-transition-slow`   | 400ms                          | 慢速过渡 |
| `--dm-ease-out`          | cubic-bezier(0.16, 1, 0.3, 1)  | 弹出动画 |
| `--dm-ease-in-out`       | cubic-bezier(0.65, 0, 0.35, 1) | 平滑动画 |
