/**
 * Commitlint 配置 - 遵循 Conventional Commits 规范
 * https://www.conventionalcommits.org/
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复 Bug
        'docs',     // 文档变更
        'style',    // 代码格式（不影响功能）
        'refactor', // 重构（既不是新增功能，也不是修复 Bug）
        'perf',     // 性能优化
        'test',     // 添加测试
        'build',    // 构建系统或外部依赖变更
        'ci',       // CI 配置变更
        'chore',    // 其他不修改源代码的变更
        'revert',   // 回滚提交
      ],
    ],
    // 主题大小写不限制（支持中文）
    'subject-case': [0],
    // 主题不能为空
    'subject-empty': [2, 'never'],
    // 类型不能为空
    'type-empty': [2, 'never'],
    // 主题最大长度
    'subject-max-length': [2, 'always', 100],
  },
}
