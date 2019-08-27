const router = require('koa-router')()
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const cryptoRandomString = require('crypto-random-string')
const platformList = require('../public/javascripts/plugin-platform')
const projectList = require('../public/javascripts/plugin-project')
const ROOTDIR = path.join(process.cwd(), '..')
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
    if (fs.existsSync(`${plugin.enName}/vue/${plugin.enName}.vue`)) {
      let file = fs.readFileSync(
        `${plugin.enName}/vue/${plugin.enName}.vue`,
        'utf8'
      )
      let template = /<template>\s+([\s\S]*)\s+<\/template>/.exec(file)
      let script = /<script>\s?export default {\s+([\s\S]*)\s+}\s?<\/script>/.exec(
        file
      )
      let style = /<style lang="scss" scoped>\s+([\s\S]*)\s+<\/style>/.exec(
        file
      )
      result.code = 0
      result.result = {
        cnName: plugin.cnName,
        enName: plugin.enName,
        id: plugin.id,
        template: template && template[1],
        script: script && script[1],
        style: style && style[1]
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
    const { compId, compType, name, code } = ctx.request.body
    // 没传compId，为添加
    if (compId === void 0) {
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
      }
      if (pluginList.find(item => item.enName === name.enName)) {
        throw new Error('该组件英文名称已存在')
      }
      pluginList.push({
        id: pluginList.length + 1 + '',
        enName: name.enName,
        cnName: name.cnName
      })
      shell
        .ShellString(`module.exports = ${JSON.stringify(pluginList)}`)
        .to(configPath)
    }
    const sourcePath = path.join(ROOTDIR, 'source')
    // 写入element-id
    shell.cd(path.join(sourcePath, 'src'))
    shell
      .ShellString(
        `exports.elementId = '${cryptoRandomString({
          length: 10,
          characters: 'qwertyuiopasdfghjklzxcvbnm'
        })}'`
      )
      .to('element-id.js')
    // 写入单个.vue文件
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
    shell.cd(sourcePath)
    // 编译
    if (shell.exec('npm run build').code !== 0) {
      shell.echo('Error: Git commit failed') //输出内容
      shell.exit(1) //退出
    } else {
      // 拷贝
      const targetDir = path.join(ROOTDIR, 'serve', 'resources', compType)
      shell.cd(targetDir)
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

      ctx.response.body = { code: 0, msg: '保存成功' }
    }
  } catch (error) {
    console.log(error)
    ctx.response.body = { code: -1, msg: '保存失败' }
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
