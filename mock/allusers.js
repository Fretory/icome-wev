const Mock = require('mockjs')

const List = []
const count = 66

Mock.Random.extend({
  phone: function() {
    var phonePrefixs = ['132', '135', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    username: '@first',
    id: '@increment',
    'sex|1': ['男', '女'],
    tel: Mock.Random.phone()
  }))
}

module.exports = [{
  url: '/vue-element-admin/allusers/get',
  type: 'get',
  response: _ => {
    return {
      code: 20000,
      data: {
        total: List.length,
        items: List
      }
    }
  }
}]
