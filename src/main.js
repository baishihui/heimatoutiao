import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import './styles/index.less' // 引入初始化样式
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import axios from './utils/request'
import Component from './components' // 引入全局组件
import './permission/index'

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
Vue.use(Component) // 全局组件注册
Vue.prototype.$axios = axios // 赋值给全局对象

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
