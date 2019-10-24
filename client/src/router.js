import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'admin' }
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: { name: 'plugin/project' },
      component: () => import('@/views/admin'),
      children: [
        {
          path: 'page/:pageId',
          name: 'page/editor',
          component: () => import('@/views/admin/page')
        },
        {
          path: 'plugin/:compType',
          name: 'plugin',
          component: () => import('@/views/admin/plugin')
        },
        {
          path: 'plugin/:compType/:compId',
          name: 'plugin/editor',
          component: () => import('@/views/admin/plugin/editor.vue')
        }
      ]
    },
    {
      path: '/form-editor',
      name: 'form-editor',
      component: () => import('@/views/form/editor.vue')
    },
    {
      path: 'background',
      name: 'background',
      component: () => import('@/views/background')
    }
  ]
})
