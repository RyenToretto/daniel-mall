package com.daniel.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.daniel.mall.dto.AnonymousDTO;
import com.daniel.mall.entity.User;
import com.daniel.mall.repository.UserRepository;
import com.daniel.mall.service.UserService;
import com.daniel.mall.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 用户服务实现
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserVO getOrCreateAnonymous(AnonymousDTO dto) {
        // 查找现有用户
        User user = userRepository.selectOne(
                new LambdaQueryWrapper<User>()
                        .eq(User::getAnonymousId, dto.getAnonymousId())
        );

        // 如果不存在则创建
        if (user == null) {
            user = new User();
            user.setAnonymousId(dto.getAnonymousId());
            user.setRole("user");
            user.setIsEmailVerified(false);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.insert(user);
        }

        // 更新最后登录时间
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.updateById(user);

        return toVO(user);
    }

    @Override
    public UserVO getById(Long id) {
        User user = userRepository.selectById(id);
        return user != null ? toVO(user) : null;
    }

    private UserVO toVO(User user) {
        UserVO vo = new UserVO();
        BeanUtils.copyProperties(user, vo);
        vo.setHasEmail(user.getEmail() != null && !user.getEmail().isEmpty());
        return vo;
    }
}
