/**
 * Button 组件类型定义
 */

export type ButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType
  /** 按钮大小 */
  size?: ButtonSize
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否为块级按钮 */
  block?: boolean
  /** 原生按钮类型 */
  htmlType?: 'button' | 'submit' | 'reset'
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}
