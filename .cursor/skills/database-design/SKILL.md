---
name: database-design
description: 指导 MySQL 数据库设计。当创建表、修改字段、设计索引、或进行数据库变更时使用。
---

# 数据库设计指南

## 命名规范

| 类型     | 规范                   | 示例                       |
| -------- | ---------------------- | -------------------------- |
| 表名     | dm\_ 前缀 + snake_case | `dm_user`, `dm_tool`       |
| 字段名   | snake_case             | `created_at`, `user_id`    |
| 主键     | id (BIGINT)            | `id BIGINT PRIMARY KEY`    |
| 外键字段 | \*\_id                 | `user_id`, `tool_id`       |
| 时间字段 | \*\_at                 | `created_at`, `updated_at` |
| 布尔字段 | is\_\*                 | `is_active`, `is_deleted`  |

## 必备字段

每张表必须包含：

```sql
id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
```

软删除表额外包含：

```sql
deleted_at DATETIME COMMENT '删除时间'
```

## 表结构模板

详见 [SCHEMA.md](SCHEMA.md)

## 索引设计原则

1. 主键自动创建聚簇索引
2. 外键字段创建普通索引
3. 查询频繁的字段创建索引
4. 联合索引遵循最左前缀原则
5. 避免过度索引

```sql
-- 索引命名规范
PRIMARY KEY (id)                    -- 主键
UNIQUE KEY uk_email (email)         -- 唯一索引
KEY idx_user_id (user_id)           -- 普通索引
KEY idx_user_tool (user_id, tool_id) -- 联合索引
```

## 数据类型选择

| 场景      | 推荐类型      | 说明          |
| --------- | ------------- | ------------- |
| 主键      | BIGINT        | 8 字节整数    |
| 短字符串  | VARCHAR(64)   | 最多 64 字符  |
| 中字符串  | VARCHAR(256)  | 最多 256 字符 |
| 长文本    | TEXT          | 大文本        |
| JSON 数据 | JSON          | MySQL 5.7+    |
| 时间      | DATETIME      | 精确到秒      |
| 金额      | DECIMAL(10,2) | 精确小数      |
| 布尔      | TINYINT(1)    | 0/1           |
