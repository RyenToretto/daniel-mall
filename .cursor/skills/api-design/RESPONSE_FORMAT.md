# 响应格式规范

## 成功响应

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

## 错误响应

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

## 分页响应

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [
      { "id": 1, "name": "工具1" },
      { "id": 2, "name": "工具2" }
    ],
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

## TypeScript 类型定义

```typescript
interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: number
}

interface ApiError {
  code: number
  message: string
  data: null
  errors?: FieldError[]
  timestamp: number
}

interface FieldError {
  field: string
  message: string
}

interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}
```
