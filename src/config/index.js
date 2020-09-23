import moment from 'moment'
export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '测试项目',
  baseURL: {
    'dev': 'http://localhost:8090',
    'pro': 'pro'
  },
  $moment: moment

}
