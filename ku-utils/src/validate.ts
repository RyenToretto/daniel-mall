/**
 * 验证工具函数
 */

/**
 * 验证邮箱格式
 */
export function isEmail(value: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value)
}

/**
 * 验证手机号（中国大陆）
 */
export function isPhone(value: string): boolean {
  const regex = /^1[3-9]\d{9}$/
  return regex.test(value)
}

/**
 * 验证 URL
 */
export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * 验证是否为空
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 验证是否为正数
 */
export function isPositiveNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value) && value > 0
}

/**
 * 验证是否为非负数
 */
export function isNonNegativeNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= 0
}

/**
 * 验证数值范围
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max
}

/**
 * 验证字符串长度
 */
export function isLengthInRange(value: string, min: number, max: number): boolean {
  return typeof value === 'string' && value.length >= min && value.length <= max
}

/**
 * 验证 UUID 格式
 */
export function isUUID(value: string): boolean {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return regex.test(value)
}
