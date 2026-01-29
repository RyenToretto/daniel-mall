# API 端点清单

## 用户相关

| 方法 | 端点                      | 说明             |
| ---- | ------------------------- | ---------------- |
| POST | `/api/v1/auth/anonymous`  | 创建匿名用户     |
| POST | `/api/v1/auth/bind-email` | 绑定邮箱         |
| POST | `/api/v1/auth/login`      | 邮箱登录         |
| GET  | `/api/v1/users/me`        | 获取当前用户信息 |
| PUT  | `/api/v1/users/me`        | 更新用户信息     |

## 工具相关

| 方法 | 端点                        | 说明         |
| ---- | --------------------------- | ------------ |
| GET  | `/api/v1/tools`             | 获取工具列表 |
| GET  | `/api/v1/tools/:id`         | 获取工具详情 |
| GET  | `/api/v1/tools/categories`  | 获取工具分类 |
| POST | `/api/v1/tools/:id/execute` | 执行工具     |

## 历史记录

| 方法   | 端点                  | 说明         |
| ------ | --------------------- | ------------ |
| GET    | `/api/v1/history`     | 获取历史记录 |
| GET    | `/api/v1/history/:id` | 获取单条记录 |
| DELETE | `/api/v1/history/:id` | 删除历史记录 |
| DELETE | `/api/v1/history`     | 清空历史记录 |

## 收藏

| 方法   | 端点                        | 说明         |
| ------ | --------------------------- | ------------ |
| GET    | `/api/v1/favorites`         | 获取收藏列表 |
| POST   | `/api/v1/favorites`         | 添加收藏     |
| DELETE | `/api/v1/favorites/:toolId` | 取消收藏     |
