package com.daniel.mall.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 工具使用记录实体
 */
@Data
@TableName(value = "dm_tool_history", autoResultMap = true)
public class ToolHistory {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 用户ID */
    private Long userId;

    /** 工具ID */
    private Long toolId;

    /** 工具代码 */
    private String toolCode;

    /** 输入参数 */
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Object> input;

    /** 输出结果 */
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Object> output;

    /** 执行耗时(ms) */
    private Integer executionTime;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
}
