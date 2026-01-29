# 数据库表结构

## dm_user 用户表

```sql
CREATE TABLE dm_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    anonymous_id VARCHAR(64) NOT NULL COMMENT '匿名用户ID',
    email VARCHAR(128) COMMENT '邮箱',
    nickname VARCHAR(64) COMMENT '昵称',
    avatar VARCHAR(512) COMMENT '头像URL',
    role VARCHAR(32) DEFAULT 'user' COMMENT '角色: user/admin',
    is_email_verified TINYINT(1) DEFAULT 0 COMMENT '邮箱是否验证',
    last_login_at DATETIME COMMENT '最后登录时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted_at DATETIME COMMENT '删除时间',

    UNIQUE KEY uk_anonymous_id (anonymous_id),
    UNIQUE KEY uk_email (email),
    KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

## dm_tool 工具表

```sql
CREATE TABLE dm_tool (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    code VARCHAR(64) NOT NULL COMMENT '工具代码',
    name VARCHAR(128) NOT NULL COMMENT '工具名称',
    description TEXT COMMENT '工具描述',
    category VARCHAR(64) NOT NULL COMMENT '分类',
    icon VARCHAR(512) COMMENT '图标URL',
    config JSON COMMENT '工具配置',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_active TINYINT(1) DEFAULT 1 COMMENT '是否启用',
    is_premium TINYINT(1) DEFAULT 0 COMMENT '是否付费',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    UNIQUE KEY uk_code (code),
    KEY idx_category (category),
    KEY idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工具表';
```

## dm_tool_history 使用记录表

```sql
CREATE TABLE dm_tool_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    tool_id BIGINT NOT NULL COMMENT '工具ID',
    input JSON NOT NULL COMMENT '输入参数',
    output JSON COMMENT '输出结果',
    execution_time INT COMMENT '执行时长(ms)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

    KEY idx_user_id (user_id),
    KEY idx_tool_id (tool_id),
    KEY idx_user_tool (user_id, tool_id),
    KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工具使用记录表';
```

## dm_favorite 收藏表

```sql
CREATE TABLE dm_favorite (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    tool_id BIGINT NOT NULL COMMENT '工具ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

    UNIQUE KEY uk_user_tool (user_id, tool_id),
    KEY idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收藏表';
```

## dm_tool_category 工具分类表

```sql
CREATE TABLE dm_tool_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    code VARCHAR(64) NOT NULL COMMENT '分类代码',
    name VARCHAR(64) NOT NULL COMMENT '分类名称',
    icon VARCHAR(512) COMMENT '图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    UNIQUE KEY uk_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工具分类表';
```
