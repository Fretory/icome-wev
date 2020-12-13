import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_TEL: (state, telephone) => {
    state.telephone = telephone
  },
  SET_BIRTHDAY: (state, birthday) => {
    state.birthday = birthday
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user register
  register({ commit }, userInfo) {
    const { username, password, repassword, roles } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, repassword: repassword, roles: roles }).then(response => {
        const { data } = response
        console.log(data)
        console.log(response)
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        if (data.code === 500) {
          console.log(data.message)
          console.log('在register方法下注册成功')
          resolve()
        }
      }).catch(error => {
        console.log(error)
        console.log('注册失败，用户名重复')
        reject(error)
      })
    })
  },

  // get user info
  getInfo: function({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // console.log(data)
        const { roles, name, avatar, birthday, telephone, sex } = data
        // console.log(birthday)
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_BIRTHDAY', birthday)
        commit('SET_SEX', sex)
        commit('SET_TEL', telephone)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

