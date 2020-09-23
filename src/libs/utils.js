import {
  loopRouteFilter
} from './tools'
import {
  constSiderRoutes
} from '@/router/router'
// 导入路由配置
const modulesFiles = require.context('@/router/modules', true, /\.js$/)
const routerModules = modulesFiles.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  module[moduleName] = value.default
  return module
}, {})


export function makeCode(l) {
  let code = ''
  for (let i = 0; i < l; i++) {
    code += randomNum(0, 10)
  }
  return code
}

export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getToken () {
  return sessionStorage.getItem('token') || false
}

export function setToken (token) {
  return sessionStorage.setItem('token', token)
}
export function getDeskTop () {
  return sessionStorage.getItem('desktop') || ''
}

export function setDeskTop (desktop) {
  // const accessRoutes = store.getters.hasAccessRoute
  // router.addRoutes(accessRoutes)
  return sessionStorage.setItem('desktop', desktop)
}

export function getAccessRoutes (desktop, access) {
  let routeArray = routerModules[desktop] || []
  routeArray = [...constSiderRoutes, ...routeArray]
  const accessRoute = loopRouteFilter(routeArray, access)
  return accessRoute
}

export function getDesktopRoutes (desktop) {
  let routeArray = routerModules[desktop] || []
  return [...constSiderRoutes, ...routeArray]
}
