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
          path: 'page/home',
          name: 'page/home',
          component: () => import('@/views/admin/page/home')
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
      path: 'background',
      name: 'background',
      component: () => import('@/views/background')
    }
  ]
})
