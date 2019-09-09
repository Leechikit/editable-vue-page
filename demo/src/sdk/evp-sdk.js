import Vue from 'vue'
import HTTP_CODE from '@/api/code'
;(function(win) {
  let evp = {
    version: '1.0.0'
  }
  win.evp = evp

  function getJavascriptObject(str) {
    return new Function(`return ${str}`)()
  }

  function registerComponent(compName, code) {
    if (document.querySelectorAll(`#${compName}`).length === 0) {
      let styleEl = document.createElement('style')
      styleEl.innerHTML = code.css
      styleEl.id = compName
      document.body.appendChild(styleEl)
    }
    let options = {
      name: compName,
      ...getJavascriptObject(code.javascript),
      template: code.template
    }
    Vue.component(compName, resolve => {
      resolve(options)
    })
  }

  /**
   * 注册组件
   *
   * @param: {String} compName 组件名称
   * @return: {Promise} return
   */
  evp.registerPlugin = function(compName) {
    return new Promise(async (resolve, reject) => {
      let result = await HTTP_CODE.getPluginCode({
        compName
      })
      if (+result.code === 0) {
        registerComponent(compName, result.result)
        resolve()
      } else {
        reject(result.msg)
      }
    })
  }

  /**
   * 注册页面
   *
   * @param: {String} pageName 页面名称
   * @return: {Promise} return
   */
  evp.registerPage = async function(pageName) {
    return new Promise(async (resolve, reject) => {
      let result = await HTTP_CODE.getPageCode({
        pageName
      })
      if (+result.code === 0) {
        registerComponent(pageName, result.result)
        resolve()
      } else {
        reject(result.msg)
      }
    })
  }
})(window)
