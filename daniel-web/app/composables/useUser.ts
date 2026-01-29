/**
 * 用户状态 Composable
 */
import { generateUUID } from '@daniel-mall/ku-utils'
import type { User } from '~/types/user'

export function useUser() {
  const user = useState<User | null>('user', () => null)
  const anonymousId = useState<string>('anonymousId', () => '')
  const token = useState<string>('token', () => '')

  const isLoggedIn = computed(() => !!user.value?.email)

  const initUser = async () => {
    if (!import.meta.client) return

    // 获取或创建匿名 ID
    let id = localStorage.getItem('dm-anonymous-id')
    if (!id) {
      id = generateUUID()
      localStorage.setItem('dm-anonymous-id', id)
    }
    anonymousId.value = id

    // TODO: 调用 API 获取用户信息
    // 这里暂时模拟
    user.value = {
      id: 1,
      anonymousId: id,
      createdAt: new Date().toISOString(),
    }
  }

  const bindEmail = async (email: string, code: string) => {
    // TODO: 调用 API 绑定邮箱
    console.log('Binding email:', email, code)
  }

  const logout = () => {
    token.value = ''
    user.value = null
  }

  return {
    user: readonly(user),
    anonymousId: readonly(anonymousId),
    token: readonly(token),
    isLoggedIn,
    initUser,
    bindEmail,
    logout,
  }
}
