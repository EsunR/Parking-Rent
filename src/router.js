import Vue from 'vue'
import Router from 'vue-router'
// import global from './common.js'

// check
import checkIdentity from './components/checkIdentity.vue'

// user
import user from './components/user/user.vue'
import home from './components/user/home/home.vue'
import center from './components/user/center/center.vue'
import detail from './components/user/home/detail.vue'

// admin

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: checkIdentity
    },
    {
      path: '/user',
      component: user,
      redirect: '/user/home',
      children: [
        {
          path: 'home',
          component: home
        },
        {
          path: 'center',
          component: center
        },
        {
          path: 'detail',
          name: 'detail',
          component: detail
        }
      ]
    }
  ]
})
