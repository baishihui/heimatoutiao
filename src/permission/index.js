// 权限拦截 导航守卫
import router from '../router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
// 拦截谁 判断拦截地址
//   console.log(to)
  if (to.path !== '/login') {
    //   判断有没有 token  有->放过   没有->跳转到 登录页面
    let token = window.localStorage.getItem('user-token') // 获取 令牌

    if (token) {
      // 直接放过
      next()
    } else {
      next('/login') // 强制跳转到 登录页面
    }
  } else {
    next()
  }
})
