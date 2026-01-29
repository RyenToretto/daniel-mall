/**
 * 工具相关类型定义
 */

export interface Tool {
  id: number
  code: string
  name: string
  category: string
  categoryName: string
  description: string
  icon: string
  config?: ToolConfig
  usageCount: number
  isFavorite: boolean
}

export interface ToolConfig {
  type: 'frontend' | 'backend' | 'hybrid'
  inputs: InputField[]
  outputs: OutputField[]
}

export interface InputField {
  key: string
  label: string
  type: 'text' | 'number' | 'select' | 'textarea'
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

export interface OutputField {
  key: string
  label: string
  type: 'text' | 'number' | 'percent' | 'duration'
  format?: string
}

export interface Category {
  code: string
  name: string
  icon: string
  toolCount: number
}

export interface ToolHistory {
  id: string
  toolId: number
  toolName: string
  toolCode: string
  input: Record<string, unknown>
  output: Record<string, unknown>
  createdAt: string
}
