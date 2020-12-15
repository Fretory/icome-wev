const Mock = require('mockjs')

const List = []
const count = 800

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    title: '@title(5, 10)',
    desc: Mock.Random.paragraph(1),
    'status|1': [0, 1, 2]
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
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
  },

  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/article/me',
    type: 'get',
    response: config => {
      const L = []
      const { title, page = 1, limit = 20, sort, username } = config.query
      for (let i = 0; i < count; ++i) {
        L.push(Mock.mock({
          id: i,
          timestamp: +Mock.Random.date('T'),
          author: username,
          title: '@title(2, 3)',
          desc: Mock.Random.paragraph(1),
          'status|1': [0, 1, 2]
        }))
      }

      let mockList = L.filter(item => {
        return !(title && item.title.indexOf(title) < 0)
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: L.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/allPass',
    type: 'get',
    response: _ => {
      const L = []
      for (let i = 0; i < 20; ++i) {
        L.push(Mock.mock({
          joinerID: Mock.Random.id(),
          timestamp: +Mock.Random.date('T'),
          name: '@first',
          status: 2
        }))
      }
      return {
        code: 20000,
        data: {
          total: L.length,
          items: L
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/allApplication',
    type: 'get',
    response: _ => {
      const L = []
      const c = Mock.Random.integer(1, 30)
      for (let i = 0; i < c; ++i) {
        L.push(Mock.mock({
          joinerID: Mock.Random.id(),
          timestamp: +Mock.Random.date('T'),
          name: '@first',
          status: 1
        }))
      }
      return {
        code: 20000,
        data: {
          total: L.length,
          items: L
        }
      }
    }
  }
]

