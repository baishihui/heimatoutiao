import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'
Vue.use(VueRouter)

const routes = [{
  // 强制跳转
  path: '/',
  redirect: '/login'
},
// 主页
{
  path: '/home',
  name: 'Home',
  component: Home,
  children: [
    {
      path: '', // 二级路由什么都不写 ，默认 作为 显示组件
      component: Home2
    },
    // 评论列表
    {
      path: '/home/account', // 完整地址  相对地址
      component: () => import('../views/account')
    },
    // 评论列表
    {
      path: 'comment', // 完整地址  相对地址
      component: () => import('../views/comment')
    },
    // 素材管理
    {
      path: 'material', // 完整地址  相对地址
      component: () => import('../views/material')
    },
    // 文章管理
    {
      path: 'articles', // 完整地址  相对地址
      component: () => import('../views/articles')
    },
    // 发表文章
    {
      path: 'publish',
      component: () => import('../views/publish') // 按需加载
    },
    // 修改文章
    {
      path: 'publish/:articleId',
      component: () => import('../views/publish') // 按需加载
    }
  ]
},
// 登录页
{
  path: '/login',
  component: Login
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
