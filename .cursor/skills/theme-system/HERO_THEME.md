# Hero 主题详细规范

参考英雄联盟客户端的高贵金色主题设计。

## 核心配色

```scss
.theme-hero {
  // 主色调 - 金色系
  --dm-color-primary: #c89b3c; // 主金色
  --dm-color-primary-light: #f0e6d3; // 浅金色（文字高亮）
  --dm-color-primary-dark: #785a28; // 深金色
  --dm-color-primary-hover: #c8aa6e; // 悬停金色

  // 背景色 - 深蓝黑系
  --dm-color-background: #010a13; // 主背景（近乎黑色）
  --dm-color-surface: #1e2328; // 卡片背景
  --dm-color-surface-elevated: #3c3c41; // 悬浮元素背景
  --dm-color-surface-overlay: rgba(1, 10, 19, 0.9); // 遮罩

  // 边框色
  --dm-color-border: #463714; // 金色边框
  --dm-color-border-light: #5b5a56; // 浅边框
  --dm-color-border-glow: rgba(200, 155, 60, 0.5); // 发光边框

  // 文字色
  --dm-color-text: #f0e6d3; // 主文字（米白金）
  --dm-color-text-secondary: #a09b8c; // 次要文字
  --dm-color-text-muted: #5b5a56; // 禁用文字

  // 状态色
  --dm-color-success: #0ac8b9; // 青色（胜利）
  --dm-color-warning: #c89b3c; // 金色
  --dm-color-error: #ff4444; // 红色
  --dm-color-info: #0397ab; // 蓝色
}
```

## 渐变效果

```scss
.theme-hero {
  // 金色渐变（按钮、高亮）
  --dm-gradient-gold: linear-gradient(180deg, #f0e6d3 0%, #c89b3c 50%, #785a28 100%);

  // 深色渐变（背景）
  --dm-gradient-dark: linear-gradient(180deg, #1e2328 0%, #010a13 100%);

  // 边框渐变
  --dm-gradient-border: linear-gradient(90deg, transparent 0%, #c89b3c 50%, transparent 100%);
}
```

## 发光效果

```scss
.theme-hero {
  // 金色外发光
  --dm-glow-gold: 0 0 10px rgba(200, 155, 60, 0.3), 0 0 20px rgba(200, 155, 60, 0.2);

  // 青色外发光（高亮状态）
  --dm-glow-cyan: 0 0 10px rgba(10, 200, 185, 0.3);

  // 内发光
  --dm-inner-glow: inset 0 0 10px rgba(200, 155, 60, 0.1);
}
```

## 组件样式示例

```scss
// Hero 风格按钮
.kv-button--hero-primary {
  background: var(--dm-gradient-gold);
  border: 1px solid var(--dm-color-border);
  color: var(--dm-color-background);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;

  &:hover {
    box-shadow: var(--dm-glow-gold);
    border-color: var(--dm-color-primary-light);
  }
}

// Hero 风格卡片
.kv-card--hero {
  background: var(--dm-color-surface);
  border: 1px solid var(--dm-color-border);
  border-image: var(--dm-gradient-border) 1;
  box-shadow: var(--dm-inner-glow);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--dm-gradient-border);
  }
}
```

## 字体建议

```scss
.theme-hero {
  --dm-font-display: 'Beaufort for LOL', 'Inter', sans-serif;
  --dm-font-body: 'Spiegel', 'Inter', sans-serif;
}
```
