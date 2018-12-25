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

let defaultOptions = {
  vtap: true,
  $et: true,
  $cookie: true,
  $time: true,
  $axios: true,
  $cache: {
    type: 'localstorage'
  },
  $tool: true,
  eruda: true,
  vconsole: true
}

export default {
  install (Vue, opt) {
    const options = Object.assign({}, defaultOptions, opt)

    // console.log('options', options)

    // install v-tap
    if (options['vtap'.toLowerCase()] || options['tap'.toLowerCase()]) {
      Vue.directive('tap', vTap)
    }

    if (options['et'] || options['$et']) {
      Vue.prototype.$et = new EventEmitter()
    }
    if (options['cookie'] || options['$cookie']) {
      Vue.prototype.$cookie = cookie
    }
    if (options['time'] || options['$time']) {
      Vue.prototype.$time = dayjs
    }
    if (options['axios'] || options['$axios']) {
      Vue.prototype.$axios = axios
    }

    const cacheConfig = options['cache'] || options['$cache']
    if (cacheConfig) {
      const type = cacheConfig['type'] || 'LOCALSTORAGE'

      // set driver to localStorage, if you want to use WEBSQL or INDEXEDDB
      // check https://localforage.github.io/localForage/#settings-api-setdriver
      const typeArr = ['LOCALSTORAGE', 'INDEXEDDB', 'WEBSQL']
      if (!type || typeof type !== 'string' || typeArr.indexOf[type.toUpperCase()] === -1) {
        throw new Error('must be LOCALSTORAGE INDEXEDDB or WEBSQL')
      } else {
        localforage.config({
          driver: localforage[type],
          name: 'cache'
        })
        Vue.prototype.$cache = localforage
      }
    }

    if (options['tool'] || options['$tool']) {
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
    }

    // rem init
    // rem()
    // debug options
    if (options['eruda'] || options['Eruda']) {
      eruda()
    }
    if (options['vconsole'] || options['vConsole'] || options['VConsole']) {
      vconsole()
    }
  }
}
