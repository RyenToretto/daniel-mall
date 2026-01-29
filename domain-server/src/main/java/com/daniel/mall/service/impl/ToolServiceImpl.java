package com.daniel.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.daniel.mall.dto.ToolExecuteDTO;
import com.daniel.mall.entity.Tool;
import com.daniel.mall.entity.ToolHistory;
import com.daniel.mall.exception.BusinessException;
import com.daniel.mall.repository.ToolRepository;
import com.daniel.mall.service.ToolService;
import com.daniel.mall.vo.ToolVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 工具服务实现
 */
@Service
@RequiredArgsConstructor
public class ToolServiceImpl implements ToolService {

    private final ToolRepository toolRepository;

    @Override
    public Page<ToolVO> list(Integer page, Integer size, String category, String keyword, Long userId) {
        LambdaQueryWrapper<Tool> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Tool::getIsActive, true);

        if (category != null && !category.isEmpty()) {
            wrapper.eq(Tool::getCategory, category);
        }

        if (keyword != null && !keyword.isEmpty()) {
            wrapper.and(w -> w
                    .like(Tool::getName, keyword)
                    .or()
                    .like(Tool::getDescription, keyword)
            );
        }

        wrapper.orderByAsc(Tool::getSortOrder);

        Page<Tool> toolPage = toolRepository.selectPage(new Page<>(page, size), wrapper);

        Page<ToolVO> voPage = new Page<>(toolPage.getCurrent(), toolPage.getSize(), toolPage.getTotal());
        voPage.setRecords(toolPage.getRecords().stream().map(this::toVO).toList());

        return voPage;
    }

    @Override
    public ToolVO getById(Long id, Long userId) {
        Tool tool = toolRepository.selectById(id);
        if (tool == null || !tool.getIsActive()) {
            throw new BusinessException(404003, "工具不存在");
        }
        return toVO(tool);
    }

    @Override
    public Map<String, Object> execute(Long toolId, ToolExecuteDTO dto, Long userId) {
        Tool tool = toolRepository.selectById(toolId);
        if (tool == null || !tool.getIsActive()) {
            throw new BusinessException(404003, "工具不存在");
        }

        long startTime = System.currentTimeMillis();

        // 执行计算（这里简化处理，实际应该根据工具类型调用不同的计算引擎）
        Map<String, Object> result = executeCalculation(tool, dto.getInput());

        long executionTime = System.currentTimeMillis() - startTime;

        // 更新使用次数
        tool.setUsageCount(tool.getUsageCount() + 1);
        toolRepository.updateById(tool);

        // 返回结果
        Map<String, Object> response = new HashMap<>();
        response.put("output", result);
        response.put("executionTime", executionTime);

        return response;
    }

    private Map<String, Object> executeCalculation(Tool tool, Map<String, Object> input) {
        // 根据工具代码执行不同的计算逻辑
        return switch (tool.getCode()) {
            case "kpi-calculator" -> calculateKPI(input);
            case "efficiency-calculator" -> calculateEfficiency(input);
            default -> input;
        };
    }

    private Map<String, Object> calculateKPI(Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();

        double totalCalls = getDouble(input, "totalCalls");
        double resolvedCalls = getDouble(input, "resolvedCalls");
        double totalTime = getDouble(input, "totalTime");
        double satisfiedCount = getDouble(input, "satisfiedCount");
        double totalRated = getDouble(input, "totalRated");

        // 解决率
        double resolutionRate = totalCalls > 0 ? (resolvedCalls / totalCalls) * 100 : 0;
        result.put("resolutionRate", Math.round(resolutionRate * 100) / 100.0);

        // 平均处理时长
        double avgHandleTime = resolvedCalls > 0 ? totalTime / resolvedCalls : 0;
        result.put("avgHandleTime", Math.round(avgHandleTime * 100) / 100.0);

        // 每小时接待量
        double callsPerHour = totalTime > 0 ? totalCalls / (totalTime / 60) : 0;
        result.put("callsPerHour", Math.round(callsPerHour * 100) / 100.0);

        // 满意度
        if (totalRated > 0) {
            double satisfactionRate = (satisfiedCount / totalRated) * 100;
            result.put("satisfactionRate", Math.round(satisfactionRate * 100) / 100.0);
        } else {
            result.put("satisfactionRate", null);
        }

        return result;
    }

    private Map<String, Object> calculateEfficiency(Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();

        double workHours = getDouble(input, "workHours");
        double handleCount = getDouble(input, "handleCount");
        double staffCount = getDouble(input, "staffCount");
        if (staffCount <= 0) staffCount = 1;

        // 人均每小时处理量
        double handlePerHour = workHours > 0 ? handleCount / workHours / staffCount : 0;
        result.put("handlePerHour", Math.round(handlePerHour * 100) / 100.0);

        // 人均每日处理量
        result.put("handlePerDay", Math.round(handlePerHour * 8 * 100) / 100.0);

        // 单次处理时长
        double timePerHandle = handleCount > 0 ? (workHours * 60 * staffCount) / handleCount : 0;
        result.put("timePerHandle", Math.round(timePerHandle * 100) / 100.0);

        return result;
    }

    private double getDouble(Map<String, Object> map, String key) {
        Object value = map.get(key);
        if (value == null) return 0;
        if (value instanceof Number) return ((Number) value).doubleValue();
        try {
            return Double.parseDouble(value.toString());
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private ToolVO toVO(Tool tool) {
        ToolVO vo = new ToolVO();
        BeanUtils.copyProperties(tool, vo);
        // TODO: 设置 categoryName 和 isFavorite
        vo.setCategoryName(getCategoryName(tool.getCategory()));
        vo.setIsFavorite(false);
        return vo;
    }

    private String getCategoryName(String category) {
        return switch (category) {
            case "calculate" -> "计算类工具";
            case "template" -> "模板类工具";
            case "analysis" -> "分析类工具";
            case "growth" -> "职业成长";
            default -> "其他";
        };
    }
}
