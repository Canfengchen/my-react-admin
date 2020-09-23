import request from '../libs/axios'

// 新增权限
export function addAuth (data) {
  return request({
    url: 'privilege/addAuth',
    method: 'post',
    data
  })
}
// 更新权限
export function updateAuth (data) {
  return request({
    url: 'privilege/updateAuth',
    method: 'post',
    data
  })
}

// 权限列表获取
export function getAuthList (data) {
  return request({
    url: 'privilege/getAuthList',
    method: 'post',
    data
  })
}

// 权限删除
export function delAuth (data) {
  return request({
    url: 'privilege/delAuth',
    method: 'post',
    data
  })
}

// 权限获取（单条）
export function getAuthOne (data) {
  return request({
    url: 'privilege/getAuthOne',
    method: 'post',
    data
  })
}
// 根据id获取全选的权限数据
export function getRoleAccess (data) {
  return request({
    url: 'role/getRoleAccess',
    method: 'post',
    data
  })
}

// 设置角色权限
export function setRoleAccess (data) {
  return request({
    url: 'role/setRoleAccess',
    method: 'post',
    data
  })
}

// 新增角色
export function addRole (data) {
  return request({
    url: 'role/addRole',
    method: 'post',
    data
  })
}
// 更新角色
export function updateRole (data) {
  return request({
    url: 'role/updateRole',
    method: 'post',
    data
  })
}

// 角色列表获取
export function getRoleList (data) {
  return request({
    url: 'role/getRoleList',
    method: 'post',
    data
  })
}

// 角色删除
export function delRole (data) {
  return request({
    url: 'role/delRole',
    method: 'post',
    data
  })
}

// 角色获取名称，id，描述（单条）
export function getRoleInfo (data) {
  return request({
    url: 'role/getRoleInfo',
    method: 'post',
    data
  })
}

