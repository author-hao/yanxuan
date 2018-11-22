// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI, { Loading } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './config/global.js'

import VueLazyload from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/js/swiper.min.js'
import './assets/css/app.scss'
import VueScroller from 'vue-scroller'
import axios from 'axios'
import store from './store/store' // Vuex
import VueCookie from 'vue-cookie'

Vue.use(VueCookie) // 使用cookie
// console.log(global.data.api)
Vue.use(VueScroller)
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

// 检测登录
let token = VueCookie.get('token')
axios.post(global.data.api + '/user/check-token', 'token=' + token).then(res => {
  let { data } = res
  if (data.code === 0) {

  } else {

  }
})

// let loadingInstance
axios.interceptors.request.use(function (config) {
  // 请求数据时 开启 lodding 动画
  // loadingInstance = Loading.service({ fullscreen: true })
  return config
}, function (error) {
  // loadingInstance.close()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 以服务的方式调用的 Loading 需要异步关闭
  // setTimeout(() => {
  //   loadingInstance.close()
  // }, 1)
  return response
}, function (error) {
  // setTimeout(() => {
  //   loadingInstance.close()
  // }, 1)
  return Promise.reject(error)
})

router.beforeEach((to, from, next) => {
  let Token = VueCookie.get('token')
  if (to.fullPath === '/') {
    if (!Token) {
      next('/login')
    } else {
      next()
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// 图片懒加载
Vue.use(VueLazyload, {
  loading: '../static/tiaowen.gif'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
