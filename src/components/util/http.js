
import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://api.it120.cc/small4'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  } // 设置跨域请求头
})

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
  // 在发送请求之前做些什么
    // const token = getCookie('session')
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // if (token) {
    //   config.params = { 'token': token }
    // }
    return config
  }, function (error) {
  // 对请求错误做些什么
    return Promise.reject(error)
  })

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
