import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

// axios.defaults.timeout = 20000 // 响应时间
// axios.defaults.baseURL = '/ctg-workflow' // 配置接口地址

var instance = axios.create({
  baseURL: '/custom',
  timeout: 20000
})

// POST传参序列化(添加请求拦截器)
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat'
      })
    }
    return config
  },
  error => {
    Message.error('错误的传参', 'fail')
    return Promise.reject(error)
  }
)
// 返回状态判断(添加响应拦截器)
instance.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.status !== 200) {
      return Promise.reject(res)
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, Object.assign({}, params, { isMobile: true }))
      .then(
        response => {
          if (response) resolve(response.data)
        },
        err => {
          console.log(err)
          reject(err)
        }
      )
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}
