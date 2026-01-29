package com.daniel.mall.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

/**
 * 工具执行请求
 */
@Data
public class ToolExecuteDTO {

    @NotNull(message = "输入参数不能为空")
    private Map<String, Object> input;
}
