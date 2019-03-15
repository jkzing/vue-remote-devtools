import Vue from 'vue'
import { installDevtools } from 'vue-remotedev/src'
import router from './router'
import store from './store'
import App from './App.vue'

installDevtools()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
