package com.daniel.mall.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 匿名用户请求
 */
@Data
public class AnonymousDTO {

    @NotBlank(message = "匿名ID不能为空")
    private String anonymousId;
}
