package com.daniel.mall.controller;

import com.daniel.mall.config.Result;
import com.daniel.mall.dto.AnonymousDTO;
import com.daniel.mall.service.UserService;
import com.daniel.mall.vo.UserVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 认证控制器
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    /**
     * 创建或获取匿名用户
     */
    @PostMapping("/anonymous")
    public Result<UserVO> anonymous(@Valid @RequestBody AnonymousDTO dto) {
        return Result.success(userService.getOrCreateAnonymous(dto));
    }
}
