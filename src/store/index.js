import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    username: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).username : '未登录',
    multipleSelection: [],
    data: {},
    activeName: 'first',
    status: 'add',
    loading: false,
  },
  getters: {
    username(state) {
      return state.username;
    },
    multipleSelection(state) {
      return state.multipleSelection;
    },
    data(state) {
      return state.data;
    },
    activeName(state) {
      return state.activeName;
    },
    getStatus(state) {
      return state.status;
    },
    getLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    username(state) {
      state.username = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).username : '未登录';
    },
    multipleSelection(state, val) {
      state.multipleSelection = val;
    },
    getdata(state, val) {
      state.data = val;
    },
    saveActiveName(state, val) {
      state.activeName = val;
    },
    updateStatus(state, val) {
      state.status = val;
    },
    openLoading(state) {
      state.loading = true;
    },
    closeLoading(state) {
      state.loading = false;
    }
    
  },
  actions: {
    commitSelection({commit}, val) {
      commit('multipleSelection', val);
    },
    commitData({commit}, val) {
      commit('getdata', val);
    },
    commitActiveName({commit}, val) {
      commit('saveActiveName', val);
    },
    commitStatus({commit}, val) {
      commit('updateStatus', val);
    },
  },
})
