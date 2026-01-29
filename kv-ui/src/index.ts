/**
 * kv-ui - Daniel Mall Vue UI 组件库
 */

import type { App } from 'vue'

// 组件导入
import KvButton from './components/button/KvButton.vue'
import KvInput from './components/input/KvInput.vue'
import KvCard from './components/card/KvCard.vue'
import KvModal from './components/modal/KvModal.vue'
import KvIcon from './components/icon/KvIcon.vue'

// 样式导入
import './styles/index.scss'

// 组件列表
const components = {
  KvButton,
  KvInput,
  KvCard,
  KvModal,
  KvIcon,
}

// 安装函数
export function install(app: App): void {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

// 导出组件
export { KvButton, KvInput, KvCard, KvModal, KvIcon }

// 导出类型
export * from './components/button/types'
export * from './components/input/types'
export * from './components/card/types'
export * from './components/modal/types'

// 默认导出
export default {
  install,
}
