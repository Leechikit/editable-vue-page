import { fetch } from './index'

const BASEPATH = '/page'

export default {
  getList() {
    return fetch(`${BASEPATH}/list`)
  },
  getDetail({ pageId }) {
    return fetch(`${BASEPATH}/get`, { pageId })
  },
  save({ pageId, detail, code }) {
    return fetch(`${BASEPATH}/save`, { pageId, detail, code })
  },
  remove({ pageId }) {
    return fetch(`${BASEPATH}/remove`, { pageId })
  }
}
