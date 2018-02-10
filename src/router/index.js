import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Login from '../views/Login'
import cookie from 'js-cookie'
Vue.use(Router)

let route = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        auth: true,
        title: '管理系统'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false,
        title: '管理系统登录'
      }
    }
  ]
})

route.beforeEach((to, from , next)=> {
  // 此处要做匹配，否则会陷入死循环，路由解析失败
  if (
    to.matched.some(item=> item.meta.auth) &&
    !cookie.get('_token')
  ) {
    next('/login')
  } else {
    next()
  }
})
route.afterEach((to, from)=> {
  document.title = to.meta.title
})

export default route
