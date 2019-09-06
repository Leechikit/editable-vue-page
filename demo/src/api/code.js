import { fetch } from './index'

export default {
  getPluginCode({ compId, compType }) {
    return fetch('/plugin/getcode', { compId, compType })
  },
  getPageCode({ pageName }) {
    return fetch('/page/getcode', { pageName })
  }
}
