package com.daniel.mall.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.daniel.mall.entity.Tool;
import org.apache.ibatis.annotations.Mapper;

/**
 * 工具数据访问
 */
@Mapper
public interface ToolRepository extends BaseMapper<Tool> {
}
