import Vue from 'vue'
import HTTP_CODE from '@/api/code'
;(function(win) {
  let evp = {}
  win.evp = evp

  function getJavascriptObject(str) {
    return new Function(`return ${str}`)()
  }

  evp.registerPlugin = function(compName) {
    return new Promise(async (resolve, reject) => {
      let result = await HTTP_CODE.getPluginCode({
        compName
      })
      if (+result.code === 0) {
        if (document.querySelectorAll(`#${compName}`).length === 0) {
          let styleEl = document.createElement('style')
          styleEl.innerHTML = result.result.css
          styleEl.id = compName
          document.body.appendChild(styleEl)
        }
        let options = {
          name: compName,
          ...getJavascriptObject(result.result.javascript),
          template: result.result.template
        }
        Vue.component(compName, resolve => {
          resolve(options)
        })
        resolve()
      } else {
        reject(result.msg)
      }
    })
  }

  evp.registerPage = async function(pageName) {
    return new Promise(async (resolve, reject) => {
      let result = await HTTP_CODE.getPageCode({
        pageName
      })
      if (+result.code === 0) {
        if (document.querySelectorAll(`#${pageName}`).length === 0) {
          let styleEl = document.createElement('style')
          styleEl.innerHTML = result.result.css
          styleEl.id = pageName
          document.body.appendChild(styleEl)
        }
        let options = {
          name: pageName,
          ...getJavascriptObject(result.result.javascript),
          template: result.result.template
        }
        Vue.component(pageName, resolve => {
          resolve(options)
        })
        resolve()
      } else {
        reject(result.msg)
      }
    })
  }
})(window)
