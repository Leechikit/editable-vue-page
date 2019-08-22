import { fetch } from './index'

const BASEPATH = '/plugin'

export default {
  getList({ compType }) {
    return fetch(`${BASEPATH}/list`, { compType })
  },
  getCode({ compType, compId }) {
    return fetch(`${BASEPATH}/get`, { compType, compId })
  }
}
