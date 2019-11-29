import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    // 存储token
    // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    Authorization: ''
  },
  // actions: {
  //   changeLogin (ctx, Authorization) {
  //     ctx.commit('changeLogin', Authorization)
  //   }
  // },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      // localStorage.setItem('Authorization', user.Authorization)
    }
  }
})

export default Store
