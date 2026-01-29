package com.daniel.mall.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 工具实体
 */
@Data
@TableName(value = "dm_tool", autoResultMap = true)
public class Tool {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 工具代码 */
    private String code;

    /** 工具名称 */
    private String name;

    /** 工具描述 */
    private String description;

    /** 分类代码 */
    private String category;

    /** 图标 */
    private String icon;

    /** 工具配置 */
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Object> config;

    /** 排序 */
    private Integer sortOrder;

    /** 是否启用 */
    private Boolean isActive;

    /** 是否付费 */
    private Boolean isPremium;

    /** 使用次数 */
    private Long usageCount;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    /** 更新时间 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}
