const router = require('koa-router')()
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const pageList = require('../public/javascripts/page')
const ROOTDIR = path.join(process.cwd(), '..')
let promiseList = Promise.resolve()

router.prefix('/serve/page')

router.post('/list', async (ctx, next) => {
  ctx.response.body = { code: 0, result: pageList }
})

router.post('/get', async (ctx, next) => {
  const { pageId } = ctx.request.body
  let result = {}
  let page = pageList.find(item => item.id === pageId)
  shell.cd(path.join(ROOTDIR, 'serve', 'resources', 'page'))
  if (fs.existsSync(`${page.enName}/vue/${page.enName}.vue`)) {
    let file = fs.readFileSync(`${page.enName}/vue/${page.enName}.vue`, 'utf8')
    let template = /<template>\s+([\s\S]*)\s+<\/template>/.exec(file)
    let script = /<script>\s?export default {\s+([\s\S]*)\s+}\s?<\/script>/.exec(
      file
    )
    let style = /<style lang="scss" scoped>\s+([\s\S]*)\s+<\/style>/.exec(file)
    result.code = 0
    result.result = {
      name: page.enName,
      template: (template && template[1]) || '',
      script: (script && script[1]) || '',
      style: (style && style[1]) || ''
    }
  }
  ctx.response.body = result
})

router.post('/save', async (ctx, next) => {
  try {
    const { pageId, name, code } = ctx.request.body
    const configPath = path.join(
      ROOTDIR,
      'serve',
      'public',
      'javascripts',
      'page.js'
    )
    // 没传compId，为添加
    if (pageId === void 0) {
      if (pageList.find(item => item.enName === name.enName)) {
        throw new Error('该组件英文名称已存在')
      }
      pageList.push({
        id: pageList.length + 1 + '',
        enName: name.enName,
        cnName: name.cnName,
        complete: false,
        cssLink: `http://localhost:3000/serve/page/getcode?pageId=${pageList.length +
          1}&fileName=app.css`,
        jsLink: `http://localhost:3000/serve/page/getcode?pageId=${pageList.length +
          1}&fileName=app.js`,
        chunkJsLink: `http://localhost:3000/serve/page/getcode?pageId=${pageList.length +
          1}&fileName=chunk-vendors.js`
      })
    } else {
      let curPage = pageList.find(item => item.enName === name.enName)
      if (!curPage) {
        throw new Error('该页面不存在')
      }
      curPage.complete = false
    }
    shell
      .ShellString(`module.exports = ${JSON.stringify(pageList)}`)
      .to(configPath)
    ctx.response.body = { code: 0, msg: '保存成功' }

    promiseList = promiseList.then(() => {
      return new Promise((resolve, reject) => {
        // 写入element-id
        const sourcePath = path.join(ROOTDIR, 'source')
        shell.cd(path.join(sourcePath, 'src'))
        shell
          .ShellString(`exports.elementId = '${name.enName}'`)
          .to('element-id.js')

        // 写入单个.vue文件
        shell.rm(path.join(sourcePath, 'src/components/*'))
        shell.cd(path.join(sourcePath, 'src/components'))
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
        shell.ShellString(vueStr).to(`${name.enName}.vue`)

        // 子进程编译
        exec('npm run build', { cwd: sourcePath }, (error, stdout, stderr) => {
          if (error) {
            console.error(`编译失败: ${error}`)
            return reject()
          }
          // 拷贝
          const targetDir = path.join(ROOTDIR, 'serve', 'resources', 'page')
          shell.cd(targetDir)
          shell.chmod(777, targetDir)
          if (fs.existsSync(name.enName)) {
            shell.rm('-rf', name.enName)
          }
          shell.mkdir(name.enName, `${name.enName}/dist`, `${name.enName}/vue`)
          const distTargetDir = path.join(targetDir, name.enName, 'dist')
          const vueTargetDir = path.join(targetDir, name.enName, 'vue')
          const jsDir = path.join(sourcePath, 'dist', 'js')
          const cssDir = path.join(sourcePath, 'dist', 'css')
          const vueDir = path.join(sourcePath, 'src', 'components')
          shell.cp('-Rf', `${jsDir}/*.js`, distTargetDir)
          shell.cp('-Rf', `${cssDir}/*.css`, distTargetDir)
          shell.cp('-Rf', `${cssDir}/*.css`, distTargetDir)
          shell.cp('-Rf', `${vueDir}/*.vue`, vueTargetDir)

          // 写入构建完成状态
          let curPage = pageList.find(item => item.enName === name.enName)
          curPage.complete = true
          shell
            .ShellString(`module.exports = ${JSON.stringify(pageList)}`)
            .to(configPath)
          resolve()
        })
      })
    })
  } catch (error) {
    console.log(error)
    ctx.response.body = { code: -1, msg: '保存失败' }
  }
})

router.get('/getcode', async (ctx, next) => {
  const { pageId, fileName } = ctx.query
  const reg = new RegExp(
    `${fileName.split('.')[0]}.\\S+.${fileName.split('.')[1]}`
  )
  let plugin = null
  let page = pageList.find(item => item.id === pageId)

  if (page) {
    const targetDir = path.join(ROOTDIR, 'serve', 'resources', 'page')
    shell.cd(targetDir)
    if (fs.existsSync(`${page.enName}/dist`)) {
      let matchFileName = null
      let fileList = fs.readdirSync(`${page.enName}/dist`)
      for (let i = 0, len = fileList.length; i < len; i++) {
        if (reg.test(fileList[i])) {
          matchFileName = fileList[i]
          break
        }
      }
      if (matchFileName) {
        let result = fs.readFileSync(
          path.join(targetDir, page.enName, 'dist', matchFileName)
        )
        ctx.response.body = result
      } else {
        ctx.response.body = { code: -1, msg: '未找到该文件' }
      }
    } else {
      ctx.response.body = { code: -2, msg: '该组件未构建' }
    }
  } else {
    ctx.response.body = { code: -3, msg: '未找到该组件' }
  }
})

module.exports = router
