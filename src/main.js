// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from 'js-md5'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'mavon-editor/dist/css/index.css'
import animated from 'animate.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(animated)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// // 异步请求前在header里加入token
// axios.interceptors.request.use(
//   config => {
//     if (config.url !== '/addArticle') { // 如果是登录和注册操作，则不需要携带header里面的token
//     } else {
//       if (this.$Store.state.Authorization) {
//         config.headers.Authorizatior = this.$Store.state.Authorization
//       }
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   })
// // 异步请求后，判断token是否过期
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           this.$Store.state.Authorization = ''
//           this.$router.push('/')
//       }
//     }
//   }
// )
// // 异步请求前判断请求的连接是否需要token
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/addArticle') {
//     next()
//   } else {
//     let token = this.$Store.state.Authorization
//     console.log('我是token: ' + token)
//     if (token === 'null' || token === '') {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })
