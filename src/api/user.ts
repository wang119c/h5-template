interface Result<T> {
  code: number
  data: T
  msg: string
  time: number
}

interface User {
  avatar: string
  name: string
  signStatus: number
}

interface Info {
  idCard: string
  gender: number
  age: number
  mobile: string
  address: string
  source: string
  tags: any[]
}

interface FamilyMemberItem {
  avatar: string
  name: string
  age: number
  gender: number
  relation: string
}

export interface UserInfo {
  user: User
  service: any[]
  info: Info
  familyMember: FamilyMemberItem[]
}

export const getUserInfo = (): Promise<Result<UserInfo>> => {
  return new Promise((resolve) => {
    // 调用接口获取用户信息
    resolve({
      code: 200,
      data: {
        user: {
          avatar: 'avatar',
          name: '翟枫君',
          signStatus: 0
        },
        service: [
          {
            id: 0,
            imgSrc: 'icon_health_record',
            title: '健康档案',
            bgColor: '#eafefa'
          },
          {
            id: 1,
            imgSrc: 'icon_heartbeat',
            title: '健康记录',
            bgColor: '#fff4e6'
          },
          {
            id: 2,
            imgSrc: 'icon_signing_information',
            title: '签约信息',
            bgColor: '#e9f1ff'
          },
          {
            id: 3,
            imgSrc: 'icon_service',
            title: '服务记录',
            bgColor: '#fff7da'
          }
        ],
        info: {
          idCard: '334526489542563345',
          gender: 0,
          age: 26,
          mobile: '13800138000',
          address: '广东省佛山市南海区大沥镇五一村3号',
          source: '医生建档',
          tags: [
            {
              id: 0,
              title: '高血压',
              borderColor: '#72cbc1',
              bgColor: '#eafefa'
            },
            {
              id: 1,
              title: '低血糖',
              borderColor: '#fb7c4f',
              bgColor: '#fff2e8'
            }
          ]
        },
        familyMember: [
          {
            avatar: 'avatar_1',
            name: '韦栋',
            age: 58,
            gender: 0,
            relation: '母亲'
          },
          {
            avatar: 'avatar_2',
            name: '布馨昭',
            age: 60,
            gender: 1,
            relation: '父亲'
          }
        ]
      },
      msg: 'success',
      time: new Date().getTime()
    })
  })
}
