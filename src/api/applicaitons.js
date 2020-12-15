import request from '@/utils/request'

export function fetchMyApplication(query) {
  return request({
    url: '/vue-element-admin/applications/get',
    method: 'get',
    params: query
  })
}
