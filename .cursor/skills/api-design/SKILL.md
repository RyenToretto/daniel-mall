---
name: api-design
description: 指导 RESTful API 设计。当创建新接口、修改 API、设计请求/响应格式时使用。
---

# API 设计指南

## RESTful 规范

### URL 设计

```
GET    /api/v1/tools           # 获取工具列表
GET    /api/v1/tools/:id       # 获取单个工具
POST   /api/v1/tools/:id/execute  # 执行工具
GET    /api/v1/users/me        # 获取当前用户
PUT    /api/v1/users/me        # 更新当前用户
GET    /api/v1/history         # 获取历史记录
POST   /api/v1/favorites       # 添加收藏
DELETE /api/v1/favorites/:id   # 取消收藏
```

### 命名规则

- 使用复数名词：`/tools` 而非 `/tool`
- 使用小写字母和连字符：`/user-profiles`
- 避免动词：`/tools/:id/execute` 而非 `/executeTool`
- 版本前缀：`/api/v1/`

## 统一响应格式

详见 [RESPONSE_FORMAT.md](RESPONSE_FORMAT.md)

## API 端点清单

详见 [ENDPOINTS.md](ENDPOINTS.md)

## 认证设计

```typescript
// 请求头
Authorization: Bearer <token>

// 匿名用户
X-Anonymous-Id: <anonymous_id>
```

## 错误码设计

| 错误码 | HTTP 状态 | 说明           |
| ------ | --------- | -------------- |
| 200    | 200       | 成功           |
| 400001 | 400       | 参数校验失败   |
| 401001 | 401       | 未认证         |
| 401002 | 401       | Token 过期     |
| 403001 | 403       | 无权限         |
| 404001 | 404       | 资源不存在     |
| 500001 | 500       | 服务器内部错误 |

## 分页设计

```typescript
// 请求
GET /api/v1/tools?page=1&size=10&sort=createdAt,desc

// 响应
{
  "code": 200,
  "data": {
    "content": [...],
    "page": 1,
    "size": 10,
    "total": 100,
    "totalPages": 10
  }
}
```
