import { fetch } from './index'

const BASEPATH = '/page'

export default {
  getList() {
    return fetch(`${BASEPATH}/list`)
  },
  getDetail({ pageId }) {
    return fetch(`${BASEPATH}/get`, { pageId })
  },
  save({ pageId, name, code }) {
    return fetch(`${BASEPATH}/save`, { pageId, name, code })
  }
}
