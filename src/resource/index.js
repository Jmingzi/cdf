import axios from 'axios'
import qs from 'qs'

// post data格式为默认form表单格式
let instance = axios.create({
  baseURL: '/',
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
    alert(response.data.msg)
    return Promise.reject(response)
  }
}, function (error) {
  return Promise.reject(error)
})

// a switch
let mock = true
let getMockUrl = (str)=> {
  let index = str.lastIndexOf('/')
  return `./static${str.substr(index, str.length)}.json`
}
let get = (uri, data = {})=> {
  if (mock || data.mock) {
    uri = getMockUrl(uri)
  }
  return instance.get(uri, {
    params: data
  })
}
let post = (uri, data = {})=> {
  if (mock || data.mock) {
    uri = getMockUrl(uri)
  }
  return instance.post(uri, data)
}

export default {
  url: {
    login: '/api/login',
    getDept: '/api/getDept',
    getUserByDeptId: '/api/getUserByDeptId',
    getAnnous: '/api/getAnnous',
    addAnnous: '/api/addAnnous',
    editAnnous: '/api/editAnnous',
    getPrivList: '/api/getPrivList',
    addPriv: '/api/addPriv',
    editPriv: '/api/editPriv',
    jobList: '/api/jobList',
    addJob: '/api/addJob',
    addUserToJob: '/api/addUserToJob',
    delJobUser: '/api/delJobUser',
    getProcess: '/api/getProcess',
    applyExpense: '/api/applyExpense',
    getInfos: '/api/getInfos',
    getSetting: '/api/getSetting',
    addProcess: '/api/addProcess',
    delProcess: '/api/delProcess',
    getExpenseList: '/api/getExpenseList'
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
  }
}
