import Vue from 'vue'

new Vue({
  data: {
    name: 'zaihui'
  },
  render(h) {
    return h('h1', this.name)
  }
}).$mount('#app')
