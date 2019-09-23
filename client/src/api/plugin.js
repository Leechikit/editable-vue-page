import { fetch } from './index'

const BASEPATH = '/plugin'

export default {
  getList({ compType }) {
    return fetch(`${BASEPATH}/list`, { compType })
  },
  getDetail({ compType, compId }) {
    return fetch(`${BASEPATH}/get`, { compType, compId })
  },
  save({ compId, compType, detail, code }) {
    return fetch(`${BASEPATH}/save`, { compId, compType, detail, code })
  }
}
