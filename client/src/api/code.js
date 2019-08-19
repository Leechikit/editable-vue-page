import { fetch } from './index'

export default {
  save({ type, codes, controlkey }) {
    return fetch('/save', { type, codes, controlkey })
  },
  add({ displayname, controlkey }) {
    return fetch('/add', { displayname, controlkey })
  },
  modify({ displayname, controlkey }) {
    return fetch('/modify', { displayname, controlkey })
  },
  delete({ controlkey }) {
    return fetch('/delete', { controlkey })
  },
  getCodes() {
    return fetch('/getCodes')
  }
}
