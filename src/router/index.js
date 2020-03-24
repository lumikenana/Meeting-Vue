import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
};

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home'),
      redirect: '/home/default',
      children: [{
          path: 'default',
          name: 'defaultback',
          component: () => import('@/components/defaultback'),
        },
        {
          path: 'checkMeetTable/:index',
          name: 'CheckMeetTable',
          component: () => import('@/components/meetTable/checkMeetTable'),
        },
        {
          path: 'bookMeetTable/:index',
          name: 'BookMeetTable',
          component: () => import('@/components/meetTable/bookMeetTable'),
        },
        {
          path: 'personnel',
          name: 'Personnel',
          component: () => import("@/components/manage/Personnel"),
          children: [{
            path: 'edituser',
            name: 'EditUser',
            component: () => import('@/components/manage/EditUser'),
            props: {
              isedit: true
            }
          }, ]
        },
        {
          path: 'meeting',
          name: 'Meeting',
          component: () => import("@/components/manage/Meeting"),
          children: [{
            path: 'editroom',
            name: 'EditRoom',
            component: () => import("@/components/manage/EditRoom"),
            props: {
              isedit: true
            }
          },
          {
            path: 'editdepart',
            name: 'EditDepart',
            component: () => import("@/components/manage/Editdepart"),
            props: {
              isedit: true
            }
          }, 
          {
            path: 'editdate',
            name: 'EditDate',
            component: () => import("@/components/manage/EditDate"),
            props: {
              isedit: true
            }
          }, 
          ]
        }
      ]
    },
  ]
})
