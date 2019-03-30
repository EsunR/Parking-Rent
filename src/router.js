import Vue from 'vue'
import Router from 'vue-router'
// import global from './common.js'

// check
import checkIdentity from './components/checkIdentity.vue'

// user
import user from './components/user/user.vue'
import home from './components/user/home.vue'
import center from './components/user/center/center.vue'
import detail from './components/user/detail.vue'
import activity from './components/user/activity.vue'

// admin
import admin from './components/admin/admin.vue'
import parkingList from './components/admin/manageParking/parkingList'
import addParking from './components/admin/manageParking/addParking.vue'
import manageSpace from './components/admin/manageParking/manageSpace.vue'
import manageUser from './components/admin/manageUser/manageUser.vue'
import userList from './components/admin/manageUser/userList.vue'
import staffList from './components/admin/manageUser/staffList.vue'
import backOrderList from './components/admin/manageUser/backOrderList.vue'
import feedback from './components/admin/manageUser/feedback.vue'
import manageActivity from './components/admin/manageUser/manageActivity.vue'

Vue.use(Router)

var router = new Router({
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
          path: 'detail',
          name: 'detail',
          component: detail
        },
        {
          path: "activity/:id",
          component: activity
        },
        {
          path: 'center',
          component: center
        },
      ]
    },
    {
      path: '/admin',
      component: admin,
      redirect: '/admin/manageParking/parkingList',
      children: [
        {
          path: 'manageParking/parkingList',
          component: parkingList
        },
        {
          path: 'manageParking/addParking',
          component: addParking
        },
        {
          path: 'manageParking/manageSpace',
          name: 'manageSpace',
          component: manageSpace
        },
        {
          path: 'manageUser',
          component: manageUser,
          redirect: 'manageUser/userList',
          children: [
            {
              path: 'userList',
              component: userList
            },
            {
              path: 'staffList',
              component: staffList
            },
            {
              path: 'backOrderList',
              component: backOrderList
            },
            {
              path: 'feedback',
              component: feedback
            },
            {
              path: 'manageActivity',
              component: manageActivity
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
  } else {
    console.log("no token!");
    window.location.href = global.login_location
    next();
  }
})

export default router

