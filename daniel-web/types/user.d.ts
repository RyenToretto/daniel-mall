/**
 * 用户相关类型定义
 */

export interface User {
  id: number
  anonymousId: string
  email?: string
  nickname?: string
  avatar?: string
  role?: string
  createdAt: string
}
