const Mock = require('mockjs')

const List = []
const count = Mock.Random.integer(1, 80)

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    title: '@title(5, 10)',
    desc: Mock.Random.paragraph(1),
    'ApplyStatus|1': [0, 1, 2],
    'ProjectStatus|1': [0, 1, 2]
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/applications/get',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(_ => {
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
