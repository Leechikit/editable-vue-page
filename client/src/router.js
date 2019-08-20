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
          path: 'plugin/platform',
          name: 'plugin/platform',
          component: () => import('@/views/admin/plugin/platform')
        },
        {
          path: 'plugin/project',
          name: 'plugin/project',
          component: () => import('@/views/admin/plugin/project')
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
