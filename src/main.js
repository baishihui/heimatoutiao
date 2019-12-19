import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import './styles/index.less' // 引入初始化样式
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import axios from 'axios' // 引入axios

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
Vue.prototype.$axios = axios // 将axios赋值给全局对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
