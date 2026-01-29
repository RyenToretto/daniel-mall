package com.daniel.mall.service;

import com.daniel.mall.dto.AnonymousDTO;
import com.daniel.mall.vo.UserVO;

/**
 * 用户服务接口
 */
public interface UserService {

    /**
     * 创建或获取匿名用户
     */
    UserVO getOrCreateAnonymous(AnonymousDTO dto);

    /**
     * 根据ID获取用户
     */
    UserVO getById(Long id);
}
