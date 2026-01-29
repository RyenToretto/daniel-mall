package com.daniel.mall.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.daniel.mall.config.Result;
import com.daniel.mall.dto.ToolExecuteDTO;
import com.daniel.mall.service.ToolService;
import com.daniel.mall.vo.ToolVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 工具控制器
 */
@RestController
@RequestMapping("/api/v1/tools")
@RequiredArgsConstructor
public class ToolController {

    private final ToolService toolService;

    /**
     * 获取工具列表
     */
    @GetMapping
    public Result<Page<ToolVO>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword
    ) {
        // TODO: 从请求头获取用户ID
        Long userId = null;
        return Result.success(toolService.list(page, size, category, keyword, userId));
    }

    /**
     * 获取工具详情
     */
    @GetMapping("/{id}")
    public Result<ToolVO> getById(@PathVariable Long id) {
        // TODO: 从请求头获取用户ID
        Long userId = null;
        return Result.success(toolService.getById(id, userId));
    }

    /**
     * 执行工具
     */
    @PostMapping("/{id}/execute")
    public Result<Map<String, Object>> execute(
            @PathVariable Long id,
            @Valid @RequestBody ToolExecuteDTO dto
    ) {
        // TODO: 从请求头获取用户ID
        Long userId = null;
        return Result.success(toolService.execute(id, dto, userId));
    }
}
