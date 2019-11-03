import axios from 'axios'
import Qs from 'qs'

import { getToken } from '@/utils/auth'

import Vue from 'vue'

// 创建axios实例
const service = axios.create({
  // baseURL: 'https://www.orthchina.cn',
  timeout: 5000,
  paramsSerializer (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }
  // withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers.Authorization = getToken()
  }
  return config
}, error => {
  console.log(error) // for debug
  Vue.prototype.$closeLoading()
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      return Promise.reject('error') // eslint-disable-line
    } else {
      return response.data
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
