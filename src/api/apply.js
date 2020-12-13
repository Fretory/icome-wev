import request from '@/utils/request'

export function apply(data) {
  return request({
    url: '/vue-admin-template/list/apply',
    method: 'post',
    data
  })
}
