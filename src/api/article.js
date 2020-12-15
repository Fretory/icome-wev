import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
export function fetchMyList(query) {
  return request({
    url: '/vue-element-admin/article/me',
    method: 'get',
    params: query
  })
}

export function fetchAllPass(query) {
  return request({
    url: '/vue-element-admin/article/allPass',
    method: 'get',
    params: query
  })
}

export function fetchAllApplication(query) {
  return request({
    url: '/vue-element-admin/article/allApplication',
    method: 'get',
    params: query
  })
}
