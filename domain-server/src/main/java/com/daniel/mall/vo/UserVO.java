package com.daniel.mall.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户视图对象
 */
@Data
public class UserVO {

    private Long id;
    private String anonymousId;
    private String email;
    private String nickname;
    private String avatar;
    private Boolean hasEmail;
    private LocalDateTime createdAt;
}
