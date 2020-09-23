import Main from '@/components/Main/Main'
import asyncComponent from '@/components/asyncComponent'

export default [
  {
    path: '/permission',
    title: '权限管理',
    component: Main,
    meta: {
      access: 'permission'
    },
    routes: [
      {
        path: '/permission/user-manager',
        title: '用户管理',
        component: asyncComponent(() => import('@/view/permission/UserManager')),
        meta: {
          access: 'user-manager'
        }
      },
      {
        path: '/permission/auth-manager',
        title: '权限管理',
        component: asyncComponent(() => import('@/view/permission/AuthManager')),
        meta: {
          access: 'auth-manager'
        }
      },
      {
        path: '/permission/role-manager',
        title: '分组管理',
        component: asyncComponent(() => import('@/view/permission/RoleManager')),
        meta: {
          access: 'role-manager'
        }
      },
    ]
  }
]

