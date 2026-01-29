-- Daniel Mall 数据库初始化脚本
-- 创建数据库
CREATE DATABASE IF NOT EXISTS daniel_mall DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE daniel_mall;

-- 用户表
CREATE TABLE IF NOT EXISTS dm_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    anonymous_id VARCHAR(64) NOT NULL COMMENT '匿名用户ID（UUID）',
    email VARCHAR(128) COMMENT '邮箱（可选）',
    nickname VARCHAR(64) COMMENT '昵称',
    avatar VARCHAR(256) COMMENT '头像URL',
    role VARCHAR(32) DEFAULT 'user' COMMENT '角色（user/admin）',
    is_email_verified TINYINT(1) DEFAULT 0 COMMENT '邮箱是否验证',
    last_login_at DATETIME COMMENT '最后登录时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted_at DATETIME COMMENT '删除时间',
    UNIQUE KEY uk_anonymous_id (anonymous_id),
    UNIQUE KEY uk_email (email),
    KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 工具分类表
CREATE TABLE IF NOT EXISTS dm_tool_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    code VARCHAR(32) NOT NULL COMMENT '分类代码',
    name VARCHAR(64) NOT NULL COMMENT '分类名称',
    icon VARCHAR(32) COMMENT '图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='工具分类表';

-- 工具表
CREATE TABLE IF NOT EXISTS dm_tool (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    code VARCHAR(64) NOT NULL COMMENT '工具代码',
    name VARCHAR(128) NOT NULL COMMENT '工具名称',
    description TEXT COMMENT '工具描述',
    category VARCHAR(32) NOT NULL COMMENT '分类代码',
    icon VARCHAR(32) COMMENT '图标',
    config JSON COMMENT '工具配置',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_active TINYINT(1) DEFAULT 1 COMMENT '是否启用',
    is_premium TINYINT(1) DEFAULT 0 COMMENT '是否付费',
    usage_count BIGINT DEFAULT 0 COMMENT '使用次数',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_code (code),
    KEY idx_category (category),
    KEY idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='工具表';

-- 工具使用记录表
CREATE TABLE IF NOT EXISTS dm_tool_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    tool_id BIGINT NOT NULL COMMENT '工具ID',
    tool_code VARCHAR(64) NOT NULL COMMENT '工具代码',
    input JSON COMMENT '输入参数',
    output JSON COMMENT '输出结果',
    execution_time INT COMMENT '执行耗时(ms)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    KEY idx_user_id (user_id),
    KEY idx_tool_id (tool_id),
    KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='工具使用记录表';

-- 收藏表
CREATE TABLE IF NOT EXISTS dm_favorite (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    tool_id BIGINT NOT NULL COMMENT '工具ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_user_tool (user_id, tool_id),
    KEY idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏表';

-- 初始化分类数据
INSERT INTO dm_tool_category (code, name, icon, sort_order) VALUES
('calculate', '计算类工具', '🧮', 1),
('template', '模板类工具', '📝', 2),
('analysis', '分析类工具', '📊', 3),
('growth', '职业成长', '📈', 4)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- 初始化工具数据
INSERT INTO dm_tool (code, name, description, category, icon, config, sort_order) VALUES
('kpi-calculator', 'KPI 计算器', '快速计算客服 KPI 指标，包括解决率、平均处理时长、满意度等', 'calculate', 'calculator',
 '{"type": "frontend", "inputs": [{"key": "totalCalls", "label": "总接待量", "type": "number"}, {"key": "resolvedCalls", "label": "解决量", "type": "number"}, {"key": "totalTime", "label": "总处理时长", "type": "number"}]}', 1),
('efficiency-calculator', '人效计算器', '计算客服人效指标，包括人均处理量、单次处理时长等', 'calculate', 'chart',
 '{"type": "frontend", "inputs": [{"key": "workHours", "label": "工作时长", "type": "number"}, {"key": "handleCount", "label": "处理数量", "type": "number"}]}', 2),
('conversion-calculator', '转化率计算器', '计算各类转化率指标', 'calculate', 'percent', NULL, 3),
('script-template', '话术模板', '售前/售后/投诉处理话术模板，支持自定义和快速复制', 'template', 'file-text', NULL, 1),
('sop-generator', 'SOP 生成器', '快速生成标准操作流程文档', 'template', 'list', NULL, 2),
('report-template', '汇报模板', '日报/周报/月报模板生成', 'template', 'clipboard', NULL, 3)
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);
