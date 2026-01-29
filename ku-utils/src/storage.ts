/**
 * 存储工具函数
 */

const STORAGE_PREFIX = 'dm_'

/**
 * 创建带前缀的 key
 */
function prefixKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`
}

/**
 * 获取 localStorage 值
 */
export function getStorage<T>(key: string, defaultValue?: T): T | null {
  if (typeof window === 'undefined') return defaultValue ?? null
  try {
    const item = localStorage.getItem(prefixKey(key))
    if (item === null) return defaultValue ?? null
    return JSON.parse(item) as T
  } catch {
    return defaultValue ?? null
  }
}

/**
 * 设置 localStorage 值
 */
export function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(prefixKey(key), JSON.stringify(value))
  } catch (e) {
    console.error('localStorage setItem error:', e)
  }
}

/**
 * 删除 localStorage 值
 */
export function removeStorage(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(prefixKey(key))
}

/**
 * 清空所有 Daniel Mall 相关存储
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') return
  const keysToRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key))
}

/**
 * 获取 sessionStorage 值
 */
export function getSession<T>(key: string, defaultValue?: T): T | null {
  if (typeof window === 'undefined') return defaultValue ?? null
  try {
    const item = sessionStorage.getItem(prefixKey(key))
    if (item === null) return defaultValue ?? null
    return JSON.parse(item) as T
  } catch {
    return defaultValue ?? null
  }
}

/**
 * 设置 sessionStorage 值
 */
export function setSession<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(prefixKey(key), JSON.stringify(value))
  } catch (e) {
    console.error('sessionStorage setItem error:', e)
  }
}

/**
 * 删除 sessionStorage 值
 */
export function removeSession(key: string): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(prefixKey(key))
}
