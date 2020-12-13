
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const userlist=['111','22222']

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    birthday: '2020-01-01',
    telephone: '88888888',
    sex: 'male'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    birthday: '2020-01-01',
    telephone: '88888888',
    sex: 'male'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },
  // user register
  {
    url: '/vue-admin-template/user/register',
    type: 'post',
    response: config => {
      // const { username } = config.body
      let flag = 0
      const { username } = config.body
      for(let i=0,len=userlist.length;i<len;i++)
      {
        if(username == userlist[i]){
          flag = 1;
        }
      }
      if (flag == 1) {
        return {
          code:10000,
          data:{
            code: 20000,
            message: '注册失败.'
          }
        }
      }
      else
      {
        return {
          code:20000,
          data:{
            code: 500,
            message: '注册成功.'
          }
        }
      }
    }
  },
  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
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
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
