// 对axios进行封装

import axios from 'axios'
// 请求拦截
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
axios.interceptors.request.use(function (config) {
  // 执行请求成功
//   config是axios的所有配置
  let token = window.localStorage.getItem('user-token') // 获取 令牌
  config.headers.Authorization = `Bearer ${token}` // 统一注入 token
  return config // 返回的config 就会作为新的请求选项去进行请求
}, function () {
  // 执行请求失败
})
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 执行响应成功
  return response.data ? response.data : {} // 解决当data不存在时  then中读取数据报错问题
},
function () {
  // 执行响应失败
})
export default axios
