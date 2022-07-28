// 内置加载进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'

// 白名单 完全通行
const whiteList = ['/404', '/login']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  // console.log(to.path)
  // console.log(token)
  // 权限控制
  // token ? to.path === '/login' ? next('/') : next() : whiteList.includes(to.path) ? next() : next('/login')
  if (token) {
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
      // 有token，访问的不是登陆界面，请求个人资料
      if (!store.state.user.userInfo.id) {
        const userInfo = await store.dispatch('user/getInfo')
        await store.dispatch('permission/filter', userInfo.roles.menus)
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) next()
    else next('/login')
  }
  // 开启进度条效果
  // NProgress.start()
  next()
})
router.afterEach((to, from, next) => {
  // 结束进度条效果
  // NProgress.done()
})
