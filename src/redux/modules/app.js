// 初始化state数据
import { setDeskTop } from '@/libs/utils'

export const initialState = {
  desktop: '',
  visitedTags: [],
  breadcrumbList: []
}

// 定义action常量
const actionType = {
  SET_DESKTOP: 'SET_DESKTOP',
  ADD_VISITED_TAGS: 'ADD_VISITED_TAGS',
  REMOVE_TAGS: 'REMOVE_TAGS',
  DEL_OTHER_TAGS: 'DEL_OTHER_TAGS',
  DEL_ALL_TAGS: 'DEL_ALL_TAGS',
  SET_BREADCRUMBLIST: 'SET_BREADCRUMBLIST'
}

// 定义action方法
export const appActions = {
  setDeskTop(deskTop) {
    setDeskTop(deskTop)
    return {
      type: actionType.SET_DESKTOP,
      deskTop
    }
  },
  addVisitedTags(route) {
    return {
      type: actionType.ADD_VISITED_TAGS,
      route
    }
  },
  removeTags(route) {
    return {
      type: actionType.REMOVE_TAGS,
      route
    }
  },
  delOtherTags(route) {
    return {
      type: actionType.DEL_OTHER_TAGS,
      route
    }
  },
  delAllTags() {
    return {
      type: actionType.DEL_ALL_TAGS
    }
  },
  setBreadcrumbList(breadcrumbList) {
    return {
      type: actionType.SET_BREADCRUMBLIST,
      breadcrumbList
    }
  },
}

// 输出模块的reducer方法
export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case actionType.SET_DESKTOP:
      return {...state, ...{desktop: action.deskTop}}

    case actionType.ADD_VISITED_TAGS:
      const visitedTags1 = JSON.parse(JSON.stringify(state.visitedTags))
      const route1 = action.route
      if (visitedTags1.some(router => router.name === route1.name)) return
      visitedTags1.push(route1)
      return {...state, ...{visitedTags: visitedTags1}}

    case actionType.REMOVE_TAGS:
      const route2 = action.route
      const visitedTags2 = state.visitedTags.filter(router => router.name !== route2.name)
      return {...state, ...{visitedTags: visitedTags2}}

    case actionType.DEL_OTHER_TAGS:
      const route3 = action.route
      const visitedTags3 = state.visitedTags.filter(router => {
        if (router.meta && router.meta.affix) {
          return true
        }
        return router.name === route3.name
      })
      return {...state, ...{visitedTags: visitedTags3}}

    case actionType.DEL_ALL_TAGS:
      const visitedTags4 = state.visitedTags.filter(router => {
        if (router.meta && router.meta.affix) {
          return true
        }
      })
      return {...state, ...{visitedTags: visitedTags4}}

    case actionType.SET_BREADCRUMBLIST:
      return {...state, ...{breadcrumbList: action.breadcrumbList}}

    default:
      return state
  }
}

