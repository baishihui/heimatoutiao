// 对axios进行封装

import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
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
function (error) {
  // 执行响应失败
  // 获取状态码 => 根据状态码 进行相应的提示或者操作
  let status = error.response.status
  let message = ''// 提示消息
  switch (status) {
    case 400:
      message = '手机号或者验证码错误'
      break
    case 403:
      // 如果同样的状态码 但是不同意思 => 需要通过 请求地址来判断是哪个的响应  请求地址 + 状态码 一起来判断 怎么处理
      // resfehtoken 过期 强制跳转到登录页 resfehtoken => 是用来换取 token的
      // this.$router => 路由实例对象
      router.push('/login')
      break
    case 401:
      // token过期
      router.push('/login') // 强制回登录
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示消息
  // 状态码 提示
})
export default axios