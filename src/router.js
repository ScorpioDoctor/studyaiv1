import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/sign/Login.vue')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('./views/sign/Regist.vue')
    },
    {
      path: '/blog/create',
      name: 'blogCreate',
      component: () => import('./views/blogs/BlogCreate.vue')
    },
    {
      path: '/jqxx',
      name: 'jqxx',
      component: () => import('./views/jqxx/Jqxx.vue')
    },
    {
      path: '/jqsj',
      name: 'jqsj',
      component: () => import('./views/jqsj/Jqsj.vue')
    }
  ]
})
