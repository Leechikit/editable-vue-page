const router = require('koa-router')()
const shell = require('shelljs')
const fs = require('fs')
const platformList = require('../public/javascripts/plugin-platform')
const projectList = require('../public/javascripts/plugin-project')
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
  if (compType === 'platform' && platformList !== void 0) {
    const result = platformList.find(item => item.id === compId)
    ctx.response.body = { code: 0, result }
  } else if (compType === 'project' && projectList !== void 0) {
    const result = projectList.find(item => item.id === compId)
    ctx.response.body = { code: 0, result }
  } else {
    ctx.response.body = { code: -1, msg: '无数据' }
  }
})

router.post('/save', async (ctx, next) => {
  try {
    const { compId, compType, name, code } = ctx.request.body
    shell.cd('../source')
    const str = `<template>
${code.template}
</template>
<script>
export default {
${code.script}
}
</script>
<style  lang="scss" scoped>
${code.style}
</style>`
    shell.ShellString(str).to(`${name.enName}.vue`)
    ctx.response.body = { code: 0, msg: '保存成功' }
  } catch (error) {
    ctx.response.body = { code: -1, msg: '保存失败' }
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
