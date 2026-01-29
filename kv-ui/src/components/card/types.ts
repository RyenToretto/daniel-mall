/**
 * Card 组件类型定义
 */

export interface CardProps {
  /** 卡片标题 */
  title?: string
  /** 卡片副标题 */
  subtitle?: string
  /** 是否有边框 */
  bordered?: boolean
  /** 是否有阴影 */
  shadow?: boolean | 'hover'
  /** 是否可悬浮 */
  hoverable?: boolean
  /** 内边距 */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}
