import vTap from './directives/tap'
import EventEmitter from 'events'
import { TypeCheck, Phone, UA, URL } from 'hu-tool'
// import rem from './helper/rem'
import eruda from './helper/eruda-helper'
import vconsole from './helper/vconsole-helper'
import cookie from 'js-cookie'
import dayjs from 'dayjs'
import axios from 'axios'
import localforage from 'localforage'

export default {
  install (Vue, options) {
    // install v-tap
    Vue.directive('tap', vTap)

    Vue.prototype.$et = new EventEmitter()
    Vue.prototype.$cookie = cookie
    Vue.prototype.$time = dayjs
    Vue.prototype.$axios = axios

    // set driver to localStorage, if you want to use WEBSQL or INDEXEDDB
    // check https://localforage.github.io/localForage/#settings-api-setdriver
    localforage.config({
      driver: localforage.LOCALSTORAGE,
      name: 'cache'
    })
    Vue.prototype.$cache = localforage

    // Mount hu-tool
    let mouteTool = [{
      name: 'TypeCheck', value: TypeCheck
    }, {
      name: 'Phone', value: Phone
    }, {
      name: 'UA', value: UA
    }, {
      name: 'URL', value: URL
    }]

    if (mouteTool.length > 0) {
      Vue.prototype.$tool = {}
      mouteTool.forEach(item => {
        Vue.prototype.$tool[item.name] = item.value
      })
    }

    // rem init
    // rem()
    // debug options
    eruda()
    vconsole()
  }
}
