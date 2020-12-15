import request from '@/utils/request'

export function fetchAllStu() {
  return request({
    url: '/vue-element-admin/allusers/get',
    method: 'get'
  })
}
