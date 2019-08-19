import { fetch } from './index'

export default {
  getList () {
    return fetch('/getList')
  }
}