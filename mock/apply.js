const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/list/apply',
    type: 'post',
    response: config => {
      const { username, id } = config.body
      const token = tokens[username]
      // mock error
      if (!token && id < 0) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        code: 20000,
        data: 'apply successfully'
      }
    }
  }
]
