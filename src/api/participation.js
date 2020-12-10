import request from '@/utils/request'

export function getTimeLine(token) {
  return request({
    url: '/vue-admin-template/user/things',
    method: 'get',
    params: { token }
  })
}
