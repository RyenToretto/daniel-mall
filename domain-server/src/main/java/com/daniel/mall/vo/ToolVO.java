package com.daniel.mall.vo;

import lombok.Data;

import java.util.Map;

/**
 * 工具视图对象
 */
@Data
public class ToolVO {

    private Long id;
    private String code;
    private String name;
    private String category;
    private String categoryName;
    private String description;
    private String icon;
    private Map<String, Object> config;
    private Long usageCount;
    private Boolean isFavorite;
}
