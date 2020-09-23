import asyncComponent from '@/components/asyncComponent'
import ErrorPage from '@/components/404/ErroePage'
// import Main from '@/components/Main/Main'
export const constRoutes = [

  {
    path: '/login',
    component: asyncComponent(() => import('@/view/login/login'))
  },
  {
    path: '/sass-platform',
    component: asyncComponent(() => import('@/view/sass-platform/SassPlatform'))
  }
]
export const constSiderRoutes = [
  // 公共导航侧边栏
  {
    path: '/home',
    title: '首页',
    component: asyncComponent(() => import('@/components/Main/Main')),
    routes: [
      {
        path: '/home',
        title: '首页',
        component: asyncComponent(() => import('@/view/home/home'))
      }
    ]
  }
]
export const redirectRoutes = [
  {
    // 重定向路由应放在对应的路由后面
    path: '/',
    redirect: '/login',
    exact: true
  },
  {
    path: '*',
    component: ErrorPage
  }
]

// React.render(<Router routes={routes} />, document.body)
