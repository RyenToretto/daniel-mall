/**
 * Input 组件类型定义
 */

export type InputSize = 'sm' | 'md' | 'lg'
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'

export interface InputProps {
  /** 绑定值 */
  modelValue?: string | number
  /** 输入框类型 */
  type?: InputType
  /** 大小 */
  size?: InputSize
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 前缀图标 */
  prefixIcon?: string
  /** 后缀图标 */
  suffixIcon?: string
  /** 最大长度 */
  maxlength?: number
  /** 错误状态 */
  error?: boolean
  /** 错误信息 */
  errorMessage?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
