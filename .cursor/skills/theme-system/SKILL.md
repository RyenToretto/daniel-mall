---
name: theme-system
description: 管理暗/亮/Hero 三主题系统。当添加颜色、修改样式、创建主题相关组件、或切换主题时使用。
---

# 主题系统管理

## 三主题概述

| 主题  | 类名           | 说明                               |
| ----- | -------------- | ---------------------------------- |
| Light | `.theme-light` | 亮色主题，适合日间使用             |
| Dark  | `.theme-dark`  | 暗色主题，减少眼睛疲劳             |
| Hero  | `.theme-hero`  | 英雄联盟风格，高贵金色主题（默认） |

## Hero 主题详细规范

详见 [HERO_THEME.md](HERO_THEME.md)

## 主题切换实现

```typescript
// composables/useTheme.ts
export function useTheme() {
  const theme = useState<'light' | 'dark' | 'hero'>('theme', () => 'hero')

  const setTheme = (newTheme: typeof theme.value) => {
    theme.value = newTheme
    document.documentElement.className = `theme-${newTheme}`
    localStorage.setItem('dm-theme', newTheme)
  }

  const initTheme = () => {
    const saved = localStorage.getItem('dm-theme') as typeof theme.value
    if (saved) setTheme(saved)
  }

  return { theme, setTheme, initTheme }
}
```

## 添加新颜色流程

1. 在 CSS 变量中定义三个主题的颜色值
2. 在 TailwindCSS 配置中扩展颜色
3. 更新 TOKENS.md 文档

```scss
// 示例：添加 success 颜色
.theme-light {
  --dm-color-success: #22c55e;
}
.theme-dark {
  --dm-color-success: #4ade80;
}
.theme-hero {
  --dm-color-success: #32cd32; // 金绿色
}
```

## 设计令牌

详见 [TOKENS.md](TOKENS.md)
