import { fetch } from './index'

export default {
  getPluginCode({ compName }) {
    return fetch('/plugin/getcode', { compName })
  },
  getPageCode({ pageName }) {
    return fetch('/page/getcode', { pageName })
  }
}
