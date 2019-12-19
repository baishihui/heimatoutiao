import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 全局注册
    Vue.component('layout-header', layoutHeader) // 全局注册
  }

}
