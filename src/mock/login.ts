import { getQueryString } from './../utils/index'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    gender: 1,
    mobile: '13500000000'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    gender: 1,
    mobile: '13500000000'
  }
}

export default [
  {
    url: '/user/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body
      const token = tokens[username]
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        code: 200,
        data: token
      }
    }
  },
  {
    url: '/user/profile',
    type: 'get',
    response: (config) => {
      const token = getQueryString(config.query, 'token')
      const info = users[token]
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }
      return {
        code: 200,
        data: info
      }
    }
  }
]
