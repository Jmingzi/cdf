import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

// post data格式为默认form表单格式
let instance = axios.create({
  baseURL: 'http://oa.ixunle.com',
  timeout: 10000,
  withCredentials: true,
  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  // transformRequest: [function (data, headers) {
  //   // Do whatever you want to transform the data
  //
  //   return data
  // }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  // transformResponse: [function (data) {
  //   // Do whatever you want to transform the data
  //   console.log(data)
  //   return data
  // }],

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
    Vue.prototype.$message(response.data.msg)
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
  return post(uri, data)
  // if (mock || data.mock) {
  //   uri = getMockUrl(uri)
  // }
  // return instance.get(uri, {
  //   params: data
  // })
}
let post = (uri, data = {})=> {
  if (mock || data.mock) {
    uri = getMockUrl(uri)
  }
  return instance.post(uri, data)
}

export default {
  // url: {
  //   login: '/api/login',
  //   getDept: '/api/getDept',
  //   getUserByDeptId: '/api/getUserByDeptId',
  //   getAnnous: '/api/getAnnous',
  //   addAnnous: '/api/addAnnous',
  //   editAnnous: '/api/editAnnous',
  //   getPrivList: '/api/getPrivList',
  //   addPriv: '/api/addPriv',
  //   editPriv: '/api/editPriv',
  //   jobList: '/api/jobList',
  //   addJob: '/api/addJob',
  //   addUserToJob: '/api/addUserToJob',
  //   delJobUser: '/api/delJobUser',
  //   getProcess: '/api/getProcess',
  //   applyExpense: '/api/applyExpense',
  //   getInfos: '/service/logic/controller/IndexController.php?act=user&met=login',
  //   getSetting: '/api/getSetting',
  //   addProcess: '/api/addProcess',
  //   delProcess: '/api/delProcess',
  //   getExpenseList: '/api/getExpenseList',
  //   saveUser: '/api/saveUser',
  //   saveDeptUri: '/api/saveDept',
  //   handleProcessStatus: '/api/handleProcessStatus',
  //   delPriv: '/api/delPriv',
  //   delAnnous: '/api/delAnnous',
  //   optAnnous: '/api/optAnnous',
  //   expenseDetail: '/api/expenseDetail'
  // },
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
    addProcess: '/ service/logic/controller/IndexController.php?act=process&met=save',
    delProcess: '/service/logic/controller/IndexController.php?act=process&met=del',
    getExpenseList: '/service/logic/controller/IndexController.php?act=expense&met=getExpenses',
    saveUser: '/service/logic/controller/IndexController.php?act=user&met=save',
    saveDeptUri: '/service/logic/controller/IndexController.php?act=dept&met=add',
    handleProcessStatus: '/service/logic/controller/IndexController.php?act=expense&met=handle',
    delPriv: '/service/logic/controller/IndexController.php?act=priv&met=del',
    optAnnous: '/service/logic/controller/IndexController.php?act=notice&met=opt',
    expenseDetail: '/service/logic/controller/IndexController.php?act=expense&met=getById',
    delJob: '/service/logic/controller/IndexController.php?act=job&met=del',
    applySpreadExpense: '/service/logic/controller/IndexController.php?act=job&met=del',
    addSpreadExpenseDetail: '/service/logic/controller/IndexController.php?act=job&met=del',
    getSpreadExpenseList: '/service/logic/controller/IndexController.php?act=job&met=del',
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
  }
}
