const things = {
  'admin-token': {
    timeline: [
      {
        timestamp: '2019/4/20',
        title: 'Update Github template',
        content: 'PanJiaChen committed 2019/4/20 20:46'
      },
      {
        timestamp: '2019/4/21',
        title: 'Update Github template',
        content: 'PanJiaChen committed 2019/4/21 20:46'
      },
      {
        timestamp: '2019/4/22',
        title: 'Build Template',
        content: 'PanJiaChen committed 2019/4/22 20:46'
      },
      {
        timestamp: '2019/4/23',
        title: 'Release New Version',
        content: 'PanJiaChen committed 2019/4/23 20:46'
      }
    ]
  },
  'editor-token': {
    timeline: [
      {
        timestamp: '2019/4/20',
        title: 'Update Github template',
        content: 'PanJiaChen committed 2019/4/20 20:46'
      },
      {
        timestamp: '2019/4/21',
        title: 'Update Github template',
        content: 'PanJiaChen committed 2019/4/21 20:46'
      },
      {
        timestamp: '2019/4/22',
        title: 'Build Template',
        content: 'PanJiaChen committed 2019/4/22 20:46'
      },
      {
        timestamp: '2019/4/23',
        title: 'Release New Version',
        content: 'PanJiaChen committed 2019/4/23 20:46'
      }
    ]
  }

}
module.exports = [
  {
    url: '/vue-admin-template/user/things',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = things[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  }
]
