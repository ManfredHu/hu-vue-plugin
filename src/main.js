// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import huVuePlugin from './index'

Vue.config.productionTip = false
// use hu-vue-plugin
Vue.use(huVuePlugin, {
  $cache: {
    type: 'IndexedDB' // IndexedDB or WebSQL, localstorage
  },
  eruda: true,
  vconsole: true,
  vtap: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
