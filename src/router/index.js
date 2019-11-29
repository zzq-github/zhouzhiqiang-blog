import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import NProgress from 'nprogress'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import register from '@/views/register'
import notFound from '@/views/404'
import layout from '@/components/layout/index'
import home from '@/views/pages/home'
import articleDetail from '@/views/pages/singlePages/articleDetail/index'
import about from '@/views/pages/singlePages/about'

import addArticle from '@/views/admin/addArticle'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      redirect: 'home',
      children: [
        { path: '/home', name: 'home', component: home }, // 文章列表
        { path: '/about', name: 'about', component: about }, // 关于我
        { path: '/articleDetail', name: 'articleDetail', component: articleDetail } // 文章详情页
      ]
    },
    {
      path: '/addArticle',
      name: 'addArticle',
      component: addArticle
    },
    {
      path: '*',
      name: 'notFond',
      component: notFound
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(to.name)
  if (to.name !== 'addArticle') {
    next()
  } else {
    // let token = localStorage.getItem('token')
    if (!store.state.Authorization) {
      next('/home')
    } else {
      next()
    }
  }
})

router.afterEach(transition => {
  NProgress.done()
})

export default router
