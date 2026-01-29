# API 设计

> Daniel Mall - RESTful API 设计文档

---

## 一、API 规范

### 1.1 基础信息

| 项目         | 说明                                 |
| ------------ | ------------------------------------ |
| **Base URL** | `https://api.daniel-mall.com/api/v1` |
| **协议**     | HTTPS                                |
| **数据格式** | JSON                                 |
| **字符编码** | UTF-8                                |

### 1.2 请求头

| Header            | 必填 | 说明                           |
| ----------------- | ---- | ------------------------------ |
| `Content-Type`    | 是   | `application/json`             |
| `Authorization`   | 否   | `Bearer <token>`（已登录用户） |
| `X-Anonymous-Id`  | 否   | 匿名用户 ID                    |
| `Accept-Language` | 否   | 语言偏好 `zh-CN`               |

### 1.3 统一响应格式

**成功响应**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 业务数据
  },
  "timestamp": 1706515200000
}
```

**错误响应**

```json
{
  "code": 400001,
  "message": "参数校验失败",
  "data": null,
  "errors": [
    {
      "field": "email",
      "message": "邮箱格式不正确"
    }
  ],
  "timestamp": 1706515200000
}
```

**分页响应**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [...],
    "page": 1,
    "size": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrevious": false
  },
  "timestamp": 1706515200000
}
```

---

## 二、错误码定义

### 2.1 错误码结构

错误码为 6 位数字：`XXXYYYY`

- `XXX`: HTTP 状态码
- `YYYY`: 业务错误码

### 2.2 错误码清单

| 错误码 | HTTP 状态 | 说明           |
| ------ | --------- | -------------- |
| 200    | 200       | 成功           |
| 400001 | 400       | 参数校验失败   |
| 400002 | 400       | 参数类型错误   |
| 401001 | 401       | 未认证         |
| 401002 | 401       | Token 过期     |
| 401003 | 401       | Token 无效     |
| 403001 | 403       | 无权限访问     |
| 404001 | 404       | 资源不存在     |
| 404002 | 404       | 用户不存在     |
| 404003 | 404       | 工具不存在     |
| 409001 | 409       | 邮箱已被绑定   |
| 429001 | 429       | 请求过于频繁   |
| 500001 | 500       | 服务器内部错误 |
| 500002 | 500       | 数据库错误     |

---

## 三、用户相关 API

### 3.1 创建匿名用户

**POST** `/auth/anonymous`

创建或获取匿名用户。

**请求体**

```json
{
  "anonymousId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "anonymousId": "550e8400-e29b-41d4-a716-446655440000",
    "hasEmail": false,
    "createdAt": "2024-01-29T10:00:00Z"
  }
}
```

### 3.2 绑定邮箱

**POST** `/auth/bind-email`

绑定邮箱并合并匿名数据。

**请求体**

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "mergedRecords": 15
  }
}
```

### 3.3 发送验证码

**POST** `/auth/send-code`

**请求体**

```json
{
  "email": "user@example.com",
  "type": "bind"
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "expireIn": 300
  }
}
```

### 3.4 邮箱登录

**POST** `/auth/login`

**请求体**

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "nickname": "用户昵称"
    }
  }
}
```

### 3.5 获取当前用户

**GET** `/users/me`

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "anonymousId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "nickname": "用户昵称",
    "avatar": "https://...",
    "createdAt": "2024-01-29T10:00:00Z"
  }
}
```

### 3.6 更新用户信息

**PUT** `/users/me`

**请求体**

```json
{
  "nickname": "新昵称",
  "avatar": "https://..."
}
```

---

## 四、工具相关 API

### 4.1 获取工具列表

**GET** `/tools`

**查询参数**

| 参数     | 类型   | 必填 | 说明                |
| -------- | ------ | ---- | ------------------- |
| category | string | 否   | 分类代码            |
| keyword  | string | 否   | 搜索关键词          |
| page     | int    | 否   | 页码（默认 1）      |
| size     | int    | 否   | 每页数量（默认 20） |

**响应**

```json
{
  "code": 200,
  "data": {
    "content": [
      {
        "id": 1,
        "code": "kpi-calculator",
        "name": "KPI 计算器",
        "category": "calculate",
        "categoryName": "计算类工具",
        "description": "快速计算客服 KPI 指标",
        "icon": "calculator",
        "usageCount": 1234,
        "isFavorite": true
      }
    ],
    "page": 1,
    "size": 20,
    "total": 50
  }
}
```

### 4.2 获取工具详情

**GET** `/tools/:id`

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "code": "kpi-calculator",
    "name": "KPI 计算器",
    "category": "calculate",
    "description": "快速计算客服 KPI 指标",
    "config": {
      "type": "frontend",
      "inputs": [
        {
          "key": "totalCalls",
          "label": "总接待量",
          "type": "number",
          "required": true,
          "placeholder": "请输入总接待量"
        }
      ],
      "outputs": [
        {
          "key": "resolutionRate",
          "label": "解决率",
          "type": "percent",
          "format": "0.00%"
        }
      ]
    },
    "isFavorite": true
  }
}
```

### 4.3 获取工具分类

**GET** `/tools/categories`

**响应**

```json
{
  "code": 200,
  "data": [
    {
      "code": "calculate",
      "name": "计算类工具",
      "icon": "calculator",
      "toolCount": 5
    },
    {
      "code": "template",
      "name": "模板类工具",
      "icon": "file-text",
      "toolCount": 8
    }
  ]
}
```

### 4.4 执行工具

**POST** `/tools/:id/execute`

**请求体**

```json
{
  "input": {
    "totalCalls": 100,
    "resolvedCalls": 85,
    "totalTime": 480
  }
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "output": {
      "resolutionRate": 85.0,
      "avgHandleTime": 5.65,
      "callsPerHour": 12.5
    },
    "historyId": 12345,
    "executionTime": 15
  }
}
```

---

## 五、历史记录 API

### 5.1 获取历史记录

**GET** `/history`

**查询参数**

| 参数      | 类型 | 必填 | 说明     |
| --------- | ---- | ---- | -------- |
| toolId    | long | 否   | 工具 ID  |
| startDate | date | 否   | 开始日期 |
| endDate   | date | 否   | 结束日期 |
| page      | int  | 否   | 页码     |
| size      | int  | 否   | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "content": [
      {
        "id": 12345,
        "toolId": 1,
        "toolName": "KPI 计算器",
        "toolCode": "kpi-calculator",
        "input": {...},
        "output": {...},
        "createdAt": "2024-01-29T10:00:00Z"
      }
    ],
    "page": 1,
    "size": 20,
    "total": 100
  }
}
```

### 5.2 获取单条记录

**GET** `/history/:id`

### 5.3 删除历史记录

**DELETE** `/history/:id`

### 5.4 清空历史记录

**DELETE** `/history`

**查询参数**

| 参数   | 类型 | 必填 | 说明                       |
| ------ | ---- | ---- | -------------------------- |
| toolId | long | 否   | 指定工具（不传则清空全部） |

---

## 六、收藏 API

### 6.1 获取收藏列表

**GET** `/favorites`

**响应**

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "toolId": 1,
      "toolCode": "kpi-calculator",
      "toolName": "KPI 计算器",
      "category": "calculate",
      "createdAt": "2024-01-29T10:00:00Z"
    }
  ]
}
```

### 6.2 添加收藏

**POST** `/favorites`

**请求体**

```json
{
  "toolId": 1
}
```

### 6.3 取消收藏

**DELETE** `/favorites/:toolId`

---

## 七、TypeScript 类型定义

```typescript
// API 响应基础类型
interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 分页响应
interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

// 用户
interface User {
  id: number
  anonymousId: string
  email?: string
  nickname?: string
  avatar?: string
  createdAt: string
}

// 工具
interface Tool {
  id: number
  code: string
  name: string
  category: string
  categoryName: string
  description: string
  icon: string
  config: ToolConfig
  usageCount: number
  isFavorite: boolean
}

// 工具配置
interface ToolConfig {
  type: 'frontend' | 'backend' | 'hybrid'
  inputs: InputField[]
  outputs: OutputField[]
}

// 历史记录
interface ToolHistory {
  id: number
  toolId: number
  toolName: string
  toolCode: string
  input: Record<string, unknown>
  output: Record<string, unknown>
  createdAt: string
}
```
