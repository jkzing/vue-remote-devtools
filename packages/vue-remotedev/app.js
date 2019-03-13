import Vue from 'vue'
import { installDevtools } from './src'

installDevtools()

new Vue({
  data: {
    name: 'zaihui'
  },
  render(h) {
    return h('h1', this.name)
  }
}).$mount('#app')
