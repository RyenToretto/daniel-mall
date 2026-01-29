package com.daniel.mall;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Daniel Mall 应用启动类
 */
@SpringBootApplication
@MapperScan("com.daniel.mall.repository")
public class DanielMallApplication {

    public static void main(String[] args) {
        SpringApplication.run(DanielMallApplication.class, args);
    }
}
