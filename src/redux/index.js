import { createStore } from 'redux'
import reducers from './modules' // 获取所有的reducer

export default function configureStore(initialState) {
  // reducers: 当前的 state 树和要处理的;  action:initialState:初始时的 state
  const store = createStore(reducers, initialState)

  function listen() {
    // 订阅打印最新的redux
    console.warn('订阅打印最新的redux:', store.getState())
  }

  store.subscribe(listen)
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
