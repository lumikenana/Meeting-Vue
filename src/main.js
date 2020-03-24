// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from "axios"
import App from './App'
import router from './router'
// import { Layout } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import CryptoJS from 'crypto-js';
import crypto from './crypto.js';
import store from './store';

Vue.config.productionTip = false;
Vue.config.devtools = true

// 引入axios
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = "http://127.0.0.1:5000/api";

// Vue.component(Layout.name, Layout);
Vue.use(ElementUI);
// Vue.prototype.$cryptojs = CryptoJS;
Vue.prototype.$crypto = crypto;

import Head from '@/components/Head';
import Aside from '@/components/Aside';
import Meets from '@/components/meetTable/Meets';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Loading from '@/components/Loading';

Vue.component(Head.name, Head);
Vue.component(Aside.name, Aside);
Vue.component(Meets.name, Meets);
Vue.component(Login.name, Login);
Vue.component(Home.name, Home);
Vue.component(Loading.name, Loading);


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token || to.name == 'Login') {
    next();
  } else {
    next({
      name: 'Login',
      redirect: to.path,
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
