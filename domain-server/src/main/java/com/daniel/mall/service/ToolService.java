package com.daniel.mall.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.daniel.mall.dto.ToolExecuteDTO;
import com.daniel.mall.vo.ToolVO;

import java.util.Map;

/**
 * 工具服务接口
 */
public interface ToolService {

    /**
     * 分页获取工具列表
     */
    Page<ToolVO> list(Integer page, Integer size, String category, String keyword, Long userId);

    /**
     * 获取工具详情
     */
    ToolVO getById(Long id, Long userId);

    /**
     * 执行工具
     */
    Map<String, Object> execute(Long toolId, ToolExecuteDTO dto, Long userId);
}
