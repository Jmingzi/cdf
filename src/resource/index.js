import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import utils from '../assets/utils'

// post data格式为默认form表单格式
let instance = axios.create({
  baseURL: 'http://oa.ixunle.com',
  timeout: 10000,
  withCredentials: true,
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  },
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

let responseSafeCode = [200, 601]
// Add a response interceptor
instance.interceptors.response.use(function (response) {
  if (responseSafeCode.includes(response.data.code)) {
    return response.data
  } else {
    // console.log(response.data.msg)
    // Vue.prototype.$message(response.data.msg)
    return Promise.reject(response)
  }
}, function (error) {
  return Promise.reject(error)
})

// a switch
let mock = false
let getMockUrl = (str)=> {
  let index = str.lastIndexOf('/')
  return `./static${str.substr(index, str.length)}.json`
}
let get = (uri, data = {})=> {
  // if (mock || data.mock) {
  //   uri = getMockUrl(uri)
  //   return instance.get(uri, {
  //     params: data
  //   })
  // }
  return post(uri, data)
}
let post = (uri, data = {})=> {
  if (mock || data.mock) {
    uri = getMockUrl(uri)
  }
  return instance.post(uri, data)
}

export default {
  url: {
    login: '/service/logic/controller/IndexController.php?act=user&met=login',
    getDept: '/service/logic/controller/IndexController.php?act=dept&met=depts',
    getUserByDeptId: '/service/logic/controller/IndexController.php?act=dept&met=getUserById',
    getAnnous: '/service/logic/controller/IndexController.php?act=notice&met=notices',
    addAnnous: '/service/logic/controller/IndexController.php?act=notice&met=add',
    editAnnous: '/service/logic/controller/IndexController.php?act=notice&met=edit',
    getPrivList: '/service/logic/controller/IndexController.php?act=priv&met=privs',
    addPriv: '/service/logic/controller/IndexController.php?act=priv&met=add',
    editPriv: '/service/logic/controller/IndexController.php?act=priv&met=edit',
    jobList: '/service/logic/controller/IndexController.php?act=job&met=getJobs',
    addJob: '/service/logic/controller/IndexController.php?act=job&met=add',
    addUserToJob: '/service/logic/controller/IndexController.php?act=job&met=addUser',
    delJobUser: '/service/logic/controller/IndexController.php?act=job&met=delUser',
    getProcess: '/service/logic/controller/IndexController.php?act=process&met=getProcess',
    applyExpense: '/service/logic/controller/IndexController.php?act=expense&met=apply',
    getInfos: '/service/logic/controller/IndexController.php?act=user&met=getInfo',
    getSetting: '/service/logic/controller/IndexController.php?act=process&met=getSetting',
    addProcess: '/service/logic/controller/IndexController.php?act=process&met=save',
    delProcess: '/service/logic/controller/IndexController.php?act=process&met=del',
    getExpenseList: '/service/logic/controller/IndexController.php?act=expense&met=getExpenses',
    saveUser: '/service/logic/controller/IndexController.php?act=user&met=save',
    saveDeptUri: '/service/logic/controller/IndexController.php?act=dept&met=add',
    handleProcessStatus: '/service/logic/controller/IndexController.php?act=expense&met=handle',
    handleSpreadStatus: '/service/logic/controller/IndexController.php?act=spread&met=handle',
    delPriv: '/service/logic/controller/IndexController.php?act=priv&met=del',
    optAnnous: '/service/logic/controller/IndexController.php?act=notice&met=opt',
    expenseDetail: '/service/logic/controller/IndexController.php?act=expense&met=getById',
    delJob: '/service/logic/controller/IndexController.php?act=job&met=del',
    applySpreadExpense: '/service/logic/controller/IndexController.php?act=spread&met=apply',
    addSpreadExpenseDetail: '/service/logic/controller/IndexController.php?act=spread&met=addItem',
    getSpreadExpenseList: '/service/logic/controller/IndexController.php?act=spread&met=getExpenses',
    getSpreadDetail: '/service/logic/controller/IndexController.php?act=spread&met=getById',
    updatePwd: '/service/logic/controller/IndexController.php?act=user&met=updatePass',
    logOut: '/service/logic/controller/IndexController.php?act=user&met=logout',
  },

  login(data) {
    return get(this.url.login, data)
  },

  // 查询所有部门
  getDept(data) {
    return get(this.url.getDept, data)
  },

  getUserByDeptId(data) {
    return get(this.url.getUserByDeptId, data)
  },

  getAnnous(data) {
    return get(this.url.getAnnous, data)
  },

  addAnnous(data) {
    return get(this.url.addAnnous, data)
  },

  editAnnous(data) {
    return get(this.url.editAnnous, data)
  },

  getPrivList(data) {
    return get(this.url.getPrivList, data)
  },

  addPriv(data) {
    return get(this.url.addPriv, data)
  },

  editPriv(data) {
    return get(this.url.editPriv, data)
  },

  jobList() {
    return get(this.url.jobList)
  },

  addJob(data) {
    return get(this.url.addJob, data)
  },

  addUserToJob(data) {
    return get(this.url.addUserToJob, data)
  },

  delJobUser(data) {
    return get(this.url.delJobUser, data)
  },

  getProcess(data) {
    return get(this.url.getProcess, data)
  },

  applyExpense(data) {
    return get(this.url.applyExpense, data)
  },

  getInfos(data) {
    return get(this.url.getInfos, data)
  },

  getSetting(data) {
    return get(this.url.getSetting, data)
  },

  addProcess(data) {
    return get(this.url.addProcess, data)
  },

  delProcess(data) {
    return get(this.url.delProcess, data)
  },

  getExpenseList(data) {
    return get(this.url.getExpenseList, data)
  },

  saveUser(data) {
    return get(this.url.saveUser, data)
  },

  saveDept(data) {
    return get(this.url.saveDeptUri, data)
  },

  handleProcessStatus(data) {
    return get(this.url.handleProcessStatus, data)
  },

  delPriv(data) {
    return get(this.url.delPriv, data)
  },

  optAnnous(data) {
    return get(this.url.optAnnous, data)
  },

  getExpenseDetail(data) {
    return get(this.url.expenseDetail, data)
  },

  delJob(data) {
    return get(this.url.delJob, data)
  },

  applySpreadExpense(data) {
    return get(this.url.applySpreadExpense, data)
  },

  addSpreadExpenseDetail(data) {
    return get(this.url.addSpreadExpenseDetail, data)
  },

  getSpreadExpenseList(data) {
    return get(this.url.getSpreadExpenseList, data)
  },

  getSpreadDetail(data) {
    return get(this.url.getSpreadDetail, data)
  },

  handleSpreadStatus(data) {
    return get(this.url.handleSpreadStatus, data)
  },

  updatePwd(data) {
    return get(this.url.updatePwd, data)
  },

  logOut() {
    return get(this.url.logOut)
  }
}
