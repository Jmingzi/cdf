import Vue from 'vue'
import Vuex from 'vuex'
import resource from '../resource'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 左侧菜单id
    currMenuId: 0,
    // 人员table高度
    userTableHeight: 0,
    // array
    dept: null,
    // object
    userMap: {},
    currentDept: null,
    currentUser: null,

    // 权限
    // 部门和人员权限的范围都是针对部门
    priv: [{ dept: [1, 2] }, { user: [1, 2] }, 'menu', 'annous', 'money'],
    isSuperAdmin: false,
  },
  getters: {
    userList(state) {
      return state.currentDept && state.userMap
        ? state.userMap[state.currentDept.id] || []
        : []
    }
  },
  mutations: {
    setState(state, payload) {
      if (payload.key === 'array') {
        Object.keys(payload.value).forEach(field=> {
          state[field] = payload.value[field]
        })
      } else {
        state[payload.key] = payload.value
      }
    }
  },
  actions: {
    getUserById({ state, commit }, payload) {
      let deptId = payload.deptId || payload
      let callback = payload.callback
      let cacheDept = state.userMap[deptId]

      if (cacheDept) {
        callback && callback(cacheDept)
        return cacheDept
      }

      resource.getUserByDeptId({ deptId }).then(res=> {
        if (!res.data) {
          return void 0
        }
        Vue.set(state.userMap, deptId, res.data)
        callback && callback(res.data)
      })
    }
  }
})
