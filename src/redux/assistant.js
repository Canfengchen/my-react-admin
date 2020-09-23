import {bindActionCreators} from 'redux'
import { userActions } from './modules/user'
import { appActions } from './modules/app'

const actionMethods = {
  userActions,
  appActions
}

/*********单个引入state,action*********/


// export function userState(state) {
//   return state.user
// }
//
// export function userAction(dispatch) {
//   return {
//     ...bindActionCreators(userActions, dispatch)
//   }
// }

/**
 * 一个页面使用多模块数据
 * @param state
 * @param value -- string/array
 *value不传参时默认取所有的state合并到页面中, value可传模块字符串取单个模块的数值合并到页面数据
 * value传多个参数时可以数组的形式，可把多个模块的数据合并到页面中
 */
export function mapStateToProps(state, value = '') {
  let stateObj = {}
  Object.keys(state).forEach((name) => {
    stateObj = {...stateObj, ...state[name]}
  })
  switch (typeof value) {
    case 'string':
      stateObj = {}
      stateObj = value ? state[value] : stateObj
      break
    case 'object':
      if (Array.isArray(value)) {
        stateObj = {}
        value.forEach((item) => {
          stateObj = {...stateObj, ...state[item]}
        })
      }
      break
    default:
      break
  }
  return stateObj
}

/**
 * 一个页面使用多模块action
 * @param state
 * @param value -- string/array
 *value不传参时默认取所有的state合并到页面中, value可传模块字符串取单个模块的数值合并到页面数据 eg: mapDispatchToProps(dispatch, 'carActions')
 * value传多个参数时可以数组的形式，可把多个模块的数据合并到页面中 eg: mapDispatchToProps(dispatch, ['carActions', 'shoppingActions'])
 */
export function mapDispatchToProps(dispatch, action = '') {
  let actionObj = {}
  Object.keys(actionMethods).forEach((item) => {
    actionObj = {...actionObj, ...actionMethods[item]}
  })
  switch (typeof action) {
    case 'string':
      if (action) {
        actionObj = {...actionMethods[action]}
      }
      break
    case 'object':
      if (Array.isArray(action)) {
        actionObj = {}
        action.forEach(item => {
          actionObj = {...actionObj, ...actionMethods[item]}
        })
      }
      break
    default:
      break
  }
  return {
    ...bindActionCreators(actionObj, dispatch)
  }
}


