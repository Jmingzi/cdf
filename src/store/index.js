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
    // 当前展示人员的部门
    currentUserDeptId: 0,

    handleType: '',
    userInfo: null,
    // 权限
    // 部门和人员权限的范围都是针对部门
    // priv: [{ dept: [1, 2] }, { user: [1, 2] }, 'menu', 'annous', 'money'],
    isSuperAdmin: false
  },
  getters: {
    userList(state) {
      return (state.userMap[state.currentUserDeptId] || []).map(item => {
        return {
          ...item,
          joinDateF: Vue.prototype.$utils.formatTime(item.joinDate),
          transferDateF: Vue.prototype.$utils.formatTime(item.transferDate),
          leaveDateF: Vue.prototype.$utils.formatTime(item.leaveDate),
          birthdayF: Vue.prototype.$utils.formatTime(item.birthday),
        }
      })
    },

    contactPriv(state) {
      let user = false
      let dept = false
      let imp = false
      if (state.userInfo) {
        const { contactPriv } = state.userInfo
        user = contactPriv.includes(0)
        dept = contactPriv.includes(1)
        imp = contactPriv.includes(2)
      }
      return { user, dept, imp }
    },

    otherPriv(state) {
      let process = false
      let annous = false
      let job = false
      let expense = false
      let spread = false
      if (state.userInfo) {
        const { contactPriv } = state.userInfo
        process = contactPriv.includes(3)
        annous = contactPriv.includes(4)
        job = contactPriv.includes(5)
        expense = contactPriv.includes(6)
        spread = contactPriv.includes(7)
      }
      return { process, annous, job, expense, spread }
    }
  },
  mutations: {
    clear(state) {
      state.userMap = {}
      state.userInfo = null
      state.isSuperAdmin = false
    },
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
      let deptId = payload.deptId !== undefined ? payload.deptId : payload
      let callback = payload.callback
      let cacheDept = state.userMap[deptId]
      state.currentUserDeptId = deptId

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
