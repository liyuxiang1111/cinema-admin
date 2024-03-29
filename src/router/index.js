import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import HallManage from '../pages/Home/children/HallManage'
import UserManage from '../pages/Home/children/UserManage'
import MovieManage from '../pages/Home/children/MovieManage'
import MovieSchedule from '../pages/Home/children/MovieSchedule'
import CinemaManage from '../pages/Home/children/CinemaManage'
import CommentManage from '../pages/Home/children/CommentManage'
import OrderManage from '../pages/Home/children/OrderManage'
import SnackManage from '../pages/Home/children/SnackManage'
import BannerManage from '../pages/Home/children/BannerManage'
import AdminManage from '../pages/Home/children/AdminManage'
Vue.use(Router)
const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: 'user_manage', component: UserManage },
      { path: 'movie_manage', component: MovieManage },
      { path: 'movie_schedule', component: MovieSchedule },
      { path: 'cinema_manage', component: CinemaManage },
      { path: 'hall_manage', component: HallManage },
      { path: 'comment_manage', component: CommentManage },
      { path: 'order_manage', component: OrderManage },
      { path: 'snack_manage', component: SnackManage },
      { path: 'banner_manage', component: BannerManage },
      { path: 'admin_manage', component: AdminManage },
      {
        path: '/home',
        // 动态重定向
        redirect: to => {
          if (to.query.name == 'admin') {
            // 是数字
            return '/home/user_manage'
          } else {
            // 不是数字
            return '/home/hall_manage'
          }
        }
      }
    ]
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
