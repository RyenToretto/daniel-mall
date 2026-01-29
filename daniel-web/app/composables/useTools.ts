/**
 * 工具相关 Composable
 */
import type { Tool, Category } from '~/types/tool'

export function useTools() {
  const tools = useState<Tool[]>('tools', () => [])
  const categories = useState<Category[]>('categories', () => [])
  const currentTool = useState<Tool | null>('currentTool', () => null)
  const loading = useState('toolsLoading', () => false)

  // 模拟数据
  const mockTools: Tool[] = [
    {
      id: 1,
      code: 'kpi-calculator',
      name: 'KPI 计算器',
      category: 'calculate',
      categoryName: '计算类工具',
      description: '快速计算客服 KPI 指标，包括解决率、平均处理时长、满意度等',
      icon: 'calculator',
      usageCount: 1234,
      isFavorite: false,
    },
    {
      id: 2,
      code: 'efficiency-calculator',
      name: '人效计算器',
      category: 'calculate',
      categoryName: '计算类工具',
      description: '计算客服人效指标，包括人均处理量、单次处理时长等',
      icon: 'chart',
      usageCount: 856,
      isFavorite: true,
    },
    {
      id: 3,
      code: 'script-template',
      name: '话术模板',
      category: 'template',
      categoryName: '模板类工具',
      description: '售前/售后/投诉处理话术模板，支持自定义和快速复制',
      icon: 'file-text',
      usageCount: 2341,
      isFavorite: false,
    },
    {
      id: 4,
      code: 'sop-generator',
      name: 'SOP 生成器',
      category: 'template',
      categoryName: '模板类工具',
      description: '快速生成标准操作流程文档',
      icon: 'list',
      usageCount: 567,
      isFavorite: false,
    },
    {
      id: 5,
      code: 'conversion-calculator',
      name: '转化率计算器',
      category: 'calculate',
      categoryName: '计算类工具',
      description: '计算各类转化率指标',
      icon: 'percent',
      usageCount: 423,
      isFavorite: false,
    },
    {
      id: 6,
      code: 'report-template',
      name: '汇报模板',
      category: 'template',
      categoryName: '模板类工具',
      description: '日报/周报/月报模板生成',
      icon: 'clipboard',
      usageCount: 789,
      isFavorite: true,
    },
  ]

  const mockCategories: Category[] = [
    { code: 'calculate', name: '计算类工具', icon: '🧮', toolCount: 5 },
    { code: 'template', name: '模板类工具', icon: '📝', toolCount: 8 },
    { code: 'analysis', name: '分析类工具', icon: '📊', toolCount: 3 },
    { code: 'growth', name: '职业成长', icon: '📈', toolCount: 2 },
  ]

  const fetchTools = async (params?: { category?: string; keyword?: string; size?: number }) => {
    loading.value = true
    try {
      // TODO: 调用真实 API
      await new Promise(resolve => setTimeout(resolve, 300))

      let result = [...mockTools]

      if (params?.category) {
        result = result.filter(t => t.category === params.category)
      }

      if (params?.keyword) {
        const keyword = params.keyword.toLowerCase()
        result = result.filter(
          t =>
            t.name.toLowerCase().includes(keyword) || t.description.toLowerCase().includes(keyword)
        )
      }

      if (params?.size) {
        result = result.slice(0, params.size)
      }

      tools.value = result
    } finally {
      loading.value = false
    }
  }

  const fetchTool = async (id: number) => {
    loading.value = true
    try {
      // TODO: 调用真实 API
      await new Promise(resolve => setTimeout(resolve, 200))
      currentTool.value = mockTools.find(t => t.id === id) || null
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    // TODO: 调用真实 API
    categories.value = mockCategories
  }

  const toggleFavorite = async (toolId: number) => {
    const tool = tools.value.find(t => t.id === toolId)
    if (tool) {
      tool.isFavorite = !tool.isFavorite
    }
    if (currentTool.value?.id === toolId) {
      currentTool.value.isFavorite = !currentTool.value.isFavorite
    }
    // TODO: 调用 API 同步
  }

  return {
    tools,
    categories,
    currentTool,
    loading: readonly(loading),
    fetchTools,
    fetchTool,
    fetchCategories,
    toggleFavorite,
  }
}
