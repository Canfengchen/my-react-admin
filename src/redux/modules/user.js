// 初始化state数据

export const initialState = {
  token: '',
  userName: '',
  userId: '',
  access: []
}

// 定义action常量
const actionType = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USERNAME: 'SET_USERNAME',
  SET_USERID: 'SET_USERID',
  SET_ACCESS: 'SET_ACCESS',
}

// 定义action方法
export const userActions = {
  setUserName(userName) {
    return {
      type: actionType.SET_USERNAME,
      userName
    }
  },
  setUserId(userId) {
    return {
      type: actionType.SET_USERID,
      userId
    }
  },
  setAccess(access) {
    return {
      type: actionType.SET_ACCESS,
      access
    }
  }
}

// 输出模块的reducer方法
export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case actionType.SET_USERNAME:
      return {...state, ...{userName: action.userName}}
    case actionType.SET_USERID:
      return {...state, ...{userId: action.userId}}
    case actionType.SET_ACCESS:
      return {...state, ...{access: action.access}}
    default:
      return state
  }
}
