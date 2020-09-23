import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale/zh_CN';
import {
  ConfigProvider
} from 'antd'
import configureStore from './redux' // 引入redux

// React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据：
import {Provider} from 'react-redux'
import './style/css.scss'

const store = configureStore()
// if (process.env.NODE_ENV === 'development') {
//   require('./mock')
// }

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
