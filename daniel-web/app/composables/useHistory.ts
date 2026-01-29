/**
 * 历史记录 Composable
 */
import { generateUUID } from '@daniel-mall/ku-utils'
import type { ToolHistory } from '~/types/tool'

export function useHistory() {
  const history = useState<ToolHistory[]>('history', () => [])

  const saveHistory = (data: {
    toolId: number
    input: Record<string, unknown>
    output: Record<string, unknown>
  }) => {
    const record: ToolHistory = {
      id: generateUUID(),
      toolId: data.toolId,
      toolName: '', // TODO: 从工具信息获取
      toolCode: '',
      input: data.input,
      output: data.output,
      createdAt: new Date().toISOString(),
    }

    history.value.unshift(record)

    // 限制历史记录数量
    if (history.value.length > 100) {
      history.value = history.value.slice(0, 100)
    }

    // TODO: 同步到服务端
  }

  const clearHistory = () => {
    history.value = []
    // TODO: 同步到服务端
  }

  const deleteHistory = (id: string) => {
    history.value = history.value.filter(h => h.id !== id)
    // TODO: 同步到服务端
  }

  return {
    history: readonly(history),
    saveHistory,
    clearHistory,
    deleteHistory,
  }
}
