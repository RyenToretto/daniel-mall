package com.daniel.mall.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户实体
 */
@Data
@TableName("dm_user")
public class User {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 匿名用户ID */
    private String anonymousId;

    /** 邮箱 */
    private String email;

    /** 昵称 */
    private String nickname;

    /** 头像URL */
    private String avatar;

    /** 角色 */
    private String role;

    /** 邮箱是否验证 */
    private Boolean isEmailVerified;

    /** 最后登录时间 */
    private LocalDateTime lastLoginAt;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    /** 更新时间 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;

    /** 删除时间 */
    @TableLogic
    private LocalDateTime deletedAt;
}
