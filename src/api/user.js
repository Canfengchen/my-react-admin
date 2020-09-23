import request from '../libs/axios'
export function login (data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}
export function getUserInfo (data) {
  return request({
    url: 'user/getUserInfo',
    method: 'post',
    data
  })
}

export function getUserList (data) {
  return request({
    url: 'user/getUserList',
    method: 'post',
    data
  })
}

export function getUserOne (data) {
  return request({
    url: 'user/getUserOne',
    method: 'post',
    data
  })
}

export function addUser (data) {
  return request({
    url: 'user/addUser',
    method: 'post',
    data
  })
}

export function updateUser (data) {
  return request({
    url: 'user/updateUser',
    method: 'post',
    data
  })
}
export function delUser (data) {
  return request({
    url: 'user/delUser',
    method: 'post',
    data
  })
}
