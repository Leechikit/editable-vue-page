const router = require('koa-router')()
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const platformList = require('../public/javascripts/plugin-platform')
const projectList = require('../public/javascripts/plugin-project')
const ROOTDIR = path.join(process.cwd(), '..')
let promiseList = Promise.resolve()

function dbPromise(funcName, ...params) {
  return new Promise((resolve, reject) => {
    db[funcName](...params, function(err, ret = '') {
      if (err) {
        return reject(err)
      } else {
        return resolve(ret)
      }
    })
  })
}

// 加载模块
const nedb = require('nedb')

// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
  filename: './data/plugin.db',
  autoload: true
})
// 对索引设置唯一性约束
dbPromise('ensureIndex', { fieldName: 'enName', unique: true }).catch(err => {
  console.error(err)
})

router.prefix('/serve/plugin')

router.post('/list', async (ctx, next) => {
  const { compType } = ctx.request.body
  if (compType === 'platform' && platformList !== void 0) {
    ctx.response.body = { code: 0, result: platformList }
  } else if (compType === 'project' && projectList !== void 0) {
    ctx.response.body = { code: 0, result: projectList }
  } else {
    ctx.response.body = { code: -1, msg: '无数据' }
  }
})

router.post('/get', async (ctx, next) => {
  const { compId, compType } = ctx.request.body
  let result = {}
  let plugin = null
  if (compType === 'platform' && platformList !== void 0) {
    plugin = platformList.find(item => item.id === compId)
  } else if (compType === 'project' && projectList !== void 0) {
    plugin = projectList.find(item => item.id === compId)
  }
  if (plugin) {
    shell.cd(path.join(ROOTDIR, 'serve', 'resources', compType))
    if (fs.existsSync(`${plugin.enName}/vue/index.vue`)) {
      let file = fs.readFileSync(`${plugin.enName}/vue/index.vue`, 'utf8')
      let template = /<template>\s*([\s\S]*)\s*<\/template>/.exec(file)
      let script = /<script>\s?export default {\s*([\s\S]*)\s*}\s?<\/script>/.exec(
        file
      )
      let style = /<style lang="scss" scoped>\s*([\s\S]*)\s*<\/style>/.exec(
        file
      )
      result.code = 0
      result.result = {
        id: plugin.id,
        cnName: plugin.cnName,
        enName: plugin.enName,
        width: plugin.width,
        height: plugin.height,
        template: (template && template[1]) || '',
        script: (script && script[1]) || '',
        style: (style && style[1]) || ''
      }
    }
  } else {
    result.code = -1
    result.msg = '暂无数据'
  }
  ctx.response.body = result
})

router.post('/save', async (ctx, next) => {
  try {
    const { compId, compType, detail, code } = ctx.request.body
    const configPath = path.join(
      ROOTDIR,
      'serve',
      'public',
      'javascripts',
      `plugin-${compType}.js`
    )
    let pluginList = []
    if (compType === 'project') {
      pluginList = projectList
    } else if (compType === 'platform') {
      pluginList = platformList
    }
    // 没传compId，为添加
    if (compId === void 0) {
      if (pluginList.find(item => item.enName === detail.enName)) {
        throw new Error('该组件英文名称已存在')
      }
      pluginList.push({
        id: pluginList.length + 1 + '',
        enName: detail.enName,
        cnName: detail.cnName,
        width: detail.width,
        height: detail.height,
        complete: false
      })
      // 插入单项
      await dbPromise('insert', {
        enName: detail.enName,
        cnName: detail.cnName,
        width: detail.width,
        height: detail.height,
        type: 'porject',
        complete: false
      }).catch(err => {
        console.error(err)
        ctx.response.body = { code: -1, msg: '保存失败' }
      })
    } else {
      let curPlugin = pluginList.find(item => item.enName === detail.enName)
      if (!curPlugin) {
        throw new Error('该组件不存在')
      }
      curPlugin.width = detail.width
      curPlugin.height = detail.height
      curPlugin.complete = false
      // 更新单项
      await dbPromise(
        'update',
        {
          enName: detail.enName
        },
        {
          $set: {
            cnName: detail.cnName,
            width: detail.width,
            height: detail.height,
            complete: false
          }
        }
      ).catch(err => {
        console.error(err)
        ctx.response.body = { code: -1, msg: '保存失败' }
      })
    }
    shell
      .ShellString(`module.exports = ${JSON.stringify(pluginList)}`)
      .to(configPath)
    ctx.response.body = { code: 0, msg: '保存成功' }

    promiseList = promiseList
      .then(() => {
        return new Promise((resolve, reject) => {
          const sourcePath = path.join(ROOTDIR, 'source')

          // 写入单个.vue文件
          shell.cd(path.join(sourcePath, 'src/vue'))
          const vueStr = `<template>
${code.template}
</template>
<script>
export default {
${code.script}
}
</script>
<style lang="scss" scoped>
${code.style}
</style>`
          shell.ShellString(vueStr).to('index.vue')

          // 写入js文件
          shell.cd(path.join(sourcePath, 'src/javascript'))
          const javascriptStr = `exports.exportJavascript = {
${code.script}
}`
          shell.ShellString(javascriptStr).to('index.js')

          // 写入scss文件
          shell.cd(path.join(sourcePath, 'src/style'))
          shell.ShellString(code.style).to('index.scss')

          // 子进程编译
          exec(
            'npm run build',
            { cwd: sourcePath },
            (error, stdout, stderr) => {
              if (error) {
                console.error(`编译失败: ${error}`)
                return reject()
              }
              // 拷贝
              const targetDir = path.join(
                ROOTDIR,
                'serve',
                'resources',
                compType
              )
              shell.cd(targetDir)
              shell.chmod(777, targetDir)
              if (fs.existsSync(detail.enName)) {
                shell.rm('-rf', detail.enName)
              }
              shell.mkdir(
                detail.enName,
                `${detail.enName}/dist`,
                `${detail.enName}/vue`
              )
              const distTargetDir = path.join(targetDir, detail.enName, 'dist')
              const vueTargetDir = path.join(targetDir, detail.enName, 'vue')
              const distDir = path.join(sourcePath, 'dist')
              const vueDir = path.join(sourcePath, 'src', 'vue')
              let jsCode = fs.readFileSync(path.join(distDir, 'index.js'))
              let matchJsCode = /exportJavascript\s*=\s*({[\s\S]*})\s*}\s*,\s*\/\*/.exec(
                jsCode
              )
              shell
                .ShellString((matchJsCode && matchJsCode[1]) || '')
                .to(path.join(distTargetDir, 'index.js'))
              // shell.cp('-Rf', `${distDir}/*.js`, distTargetDir)
              shell.cp('-Rf', `${distDir}/*.css`, distTargetDir)
              shell.cp('-Rf', `${vueDir}/*.vue`, vueTargetDir)

              // 写入构建完成状态
              let curPlugin = pluginList.find(
                item => item.enName === detail.enName
              )
              curPlugin.complete = true
              // 更新单项
              db.update(
                {
                  enName: detail.enName
                },
                {
                  $set: {
                    complete: true
                  }
                },
                (err, ret) => {
                  console.log(err)
                  ctx.response.body = { code: 0, msg: '保存成功' }
                }
              )
              shell
                .ShellString(`module.exports = ${JSON.stringify(pluginList)}`)
                .to(configPath)
              resolve()
            }
          )
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
    ctx.response.body = { code: -1, msg: '保存失败' }
  }
})

router.post('/getcode', async (ctx, next) => {
  const { compName } = ctx.request.body
  let plugin = null
  let compType = ''
  if (/^pf-/.test(compName) && platformList !== void 0) {
    plugin = platformList.find(item => item.enName === compName)
    compType = 'platform'
  } else if (/^pj-/.test(compName) && projectList !== void 0) {
    plugin = projectList.find(item => item.enName === compName)
    compType = 'project'
  }
  if (plugin) {
    const targetDir = path.join(ROOTDIR, 'serve', 'resources', compType)
    shell.cd(targetDir)
    let result = {}
    if (fs.existsSync(`${plugin.enName}/dist`)) {
      let jsCode = fs.readFileSync(
        path.join(targetDir, plugin.enName, 'dist', 'index.js'),
        'utf8'
      )
      let cssCode = fs.readFileSync(
        path.join(targetDir, plugin.enName, 'dist', 'index.css'),
        'utf8'
      )
      let vueCode = fs.readFileSync(
        path.join(targetDir, plugin.enName, 'vue', 'index.vue'),
        'utf8'
      )
      let templateCode = /<template>\s*([\s\S]*)\s*<\/template>/.exec(vueCode)
      ctx.response.body = {
        code: 0,
        result: {
          javascript: jsCode,
          css: cssCode,
          template: (templateCode && templateCode[1]) || ''
        }
      }
    } else {
      ctx.response.body = { code: -1, msg: '该组件未构建' }
    }
  } else {
    ctx.response.body = { code: -2, msg: '未找到该组件' }
  }
})

module.exports = router
