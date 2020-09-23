const userList = [
  {
    userName: 'admin',
    password: '123456',
    name: '管理员',
    roleName: '超级管理员',
    phone: '123456',
    position: "管理员",
    orgName: "勤丰科技",
    token: 'admin',
    createTime: 1585727874,
    access: 'task,task1,task2,log,log1,log2,log3,permission,tree_list,user_manager,auth_manager,role_manager'
  },
  {
    userName: 'test',
    password: '123456',
    name: '测试',
    roleName: '超级管理员',
    phone: '123456',
    position: "测试",
    orgName: "勤丰科技",
    token: 'test',
    createTime: 1585727874,
    access: 'task,task1,task2,log,log1,log2,log3,permission,tree_list,user_manager,auth_manager,role_manager'
  }
]

export default [
  {
    url: '/dev-mock/user/login',
    type: 'post',
    response: config => {
      const { userName, password } = JSON.parse(config.body)
      let index = -1
      for (const i in userList) {
        if (userName === userList[i].userName && password === userList[i].password) {
          index = i
          break
        }
      }
      if (index !== -1) {
        return {
          code: 0,
          data: userList[index]
        }
      } else {
        return {
          code: 1,
          msg: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/dev-mock/user/getUserInfo',
    type: 'post',
    response: config => {
      const { token } = JSON.parse(config.body)
      let index = -1
      for (const i in userList) {
        if (token === userList[i].token) {
          index = i
          break
        }
      }
      if (index !== -1) {
        return {
          code: 0,
          data: userList[index]
        }
      } else {
        return {
          code: 1,
          msg: '账号登录过期'
        }
      }
    }
  },
  {
    url: '/dev-mock/user/getUserList',
    type: 'post',
    response: config => {
      // const { token } = JSON.parse(config.body)
      const token = '123'
      if (token) {
        return {
          code: 0,
          data: userList,
          count: userList.length
        }
      } else {
        return {
          code: 1,
          msg: '账号登录过期'
        }
      }
    }
  }
]
