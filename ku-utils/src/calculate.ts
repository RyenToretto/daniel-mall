/**
 * 客服 KPI 计算工具函数
 */

/**
 * KPI 计算输入参数
 */
export interface KPIInput {
  /** 总接待量 */
  totalCalls: number
  /** 解决量 */
  resolvedCalls: number
  /** 总处理时长（分钟） */
  totalTime: number
  /** 满意评价数 */
  satisfiedCount?: number
  /** 总评价数 */
  totalRated?: number
}

/**
 * KPI 计算结果
 */
export interface KPIResult {
  /** 解决率 (%) */
  resolutionRate: number
  /** 平均处理时长（分钟） */
  avgHandleTime: number
  /** 每小时接待量 */
  callsPerHour: number
  /** 满意度 (%) */
  satisfactionRate: number | null
}

/**
 * 计算客服 KPI 指标
 */
export function calculateKPI(input: KPIInput): KPIResult {
  const { totalCalls, resolvedCalls, totalTime, satisfiedCount, totalRated } = input

  // 解决率
  const resolutionRate = totalCalls > 0 ? (resolvedCalls / totalCalls) * 100 : 0

  // 平均处理时长
  const avgHandleTime = resolvedCalls > 0 ? totalTime / resolvedCalls : 0

  // 每小时接待量
  const callsPerHour = totalTime > 0 ? totalCalls / (totalTime / 60) : 0

  // 满意度
  const satisfactionRate =
    totalRated && totalRated > 0 && satisfiedCount !== undefined
      ? (satisfiedCount / totalRated) * 100
      : null

  return {
    resolutionRate: Math.round(resolutionRate * 100) / 100,
    avgHandleTime: Math.round(avgHandleTime * 100) / 100,
    callsPerHour: Math.round(callsPerHour * 100) / 100,
    satisfactionRate: satisfactionRate !== null ? Math.round(satisfactionRate * 100) / 100 : null,
  }
}

/**
 * 人效计算输入参数
 */
export interface EfficiencyInput {
  /** 工作时长（小时） */
  workHours: number
  /** 处理数量 */
  handleCount: number
  /** 员工数量 */
  staffCount?: number
}

/**
 * 人效计算结果
 */
export interface EfficiencyResult {
  /** 人均每小时处理量 */
  handlePerHour: number
  /** 人均每日处理量（按8小时计算） */
  handlePerDay: number
  /** 单次处理时长（分钟） */
  timePerHandle: number
}

/**
 * 计算人效指标
 */
export function calculateEfficiency(input: EfficiencyInput): EfficiencyResult {
  const { workHours, handleCount, staffCount = 1 } = input

  // 人均每小时处理量
  const handlePerHour = workHours > 0 && staffCount > 0 ? handleCount / workHours / staffCount : 0

  // 人均每日处理量
  const handlePerDay = handlePerHour * 8

  // 单次处理时长（分钟）
  const timePerHandle =
    handleCount > 0 && staffCount > 0 ? (workHours * 60 * staffCount) / handleCount : 0

  return {
    handlePerHour: Math.round(handlePerHour * 100) / 100,
    handlePerDay: Math.round(handlePerDay * 100) / 100,
    timePerHandle: Math.round(timePerHandle * 100) / 100,
  }
}

/**
 * 转化率计算
 */
export function calculateConversionRate(converted: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((converted / total) * 10000) / 100
}

/**
 * 客诉率计算
 */
export function calculateComplaintRate(complaints: number, totalOrders: number): number {
  if (totalOrders <= 0) return 0
  return Math.round((complaints / totalOrders) * 10000) / 100
}

/**
 * 响应时间评级
 */
export function getResponseTimeLevel(
  avgResponseSeconds: number
): 'excellent' | 'good' | 'normal' | 'poor' {
  if (avgResponseSeconds <= 15) return 'excellent'
  if (avgResponseSeconds <= 30) return 'good'
  if (avgResponseSeconds <= 60) return 'normal'
  return 'poor'
}
