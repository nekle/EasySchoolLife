// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
import VideoPlayer from 'vue-video-player'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.prototype.$video = Video
Vue.use(VideoPlayer)
Vue.use(axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$ip = '120.26.176.248'
Vue.prototype.$port = '8082'
/* eslint-disable no-new */
// set default config
Vue.$cookies.config('3d')
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      console.log('token保存')
      config.headers.token = localStorage.getItem('token')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  })

// 异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    let token = localStorage.getItem('token')
    console.log('我是浏览器本地缓存的token: ' + token)
    if (token === 'null' || token === '') {
      console.log('token 不存在')
      next('/')
    } else {
      next()
    }
  }
})
