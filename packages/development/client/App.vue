<template>
  <div class="app">
    <h1>Vue Remotedev Test</h1>
    <section class="router">
      <div class="links">
        <router-link to="/foo">-> foo</router-link>&nbsp;
        <router-link to="/bar">-> bar</router-link>
      </div>
      <router-view></router-view>
    </section>
    <section class="vuex">
      <div class="counter">
        <button @click="increase">+</button>
        <span>&nbsp;&nbsp;{{ count }}&nbsp;&nbsp;</span>
        <button @click="decrease">-</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['count']),
  },
  methods: {
    ...mapMutations({
      increase: 'INCREMENT',
      decrease: 'DECREMENT'
    })
  }
}
</script>

