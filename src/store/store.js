import Vue from 'vue'
import Vuex from 'vuex'
import cookie from './cookie'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const userInfo = {
  name: cookie.getCookie('name') || '',
  token: cookie.getCookie('token') || ''
}

const state = {
  userInfo
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
