import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview'

import MainContainer from './components/MainContainer'
Vue.component('main-container', MainContainer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
