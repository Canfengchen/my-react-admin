import axios from 'axios'
import {
  getToken,
  setToken
} from './utils'
import config from '../config'
import { message } from 'antd'

const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro
const service = axios.create({
  baseURL,
  // 是否允许跨域
  // withCredentials: false,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['authorization'] = getToken()
  }
  // 可以在此时设置一个遮罩层效果
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const res = response.data
  if (response.status === 200) {
    if (res.code === 1001 || res.code === 1002) {
      // token过期1001,不存在token1002
      message.error('请重新登录', 2);
      setToken('')
      window.location.href = '/login'
    }
  }
  return res
}, error => {
  message.error('网络连接失败', 2);
  return Promise.reject(error)
})

export default service
