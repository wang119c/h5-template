// 获取环境变量
export const getEnvValue = (type: string) => {
  return import.meta.env[type]
}

// 获取url的参数
export const getQueryString = (url: string, queryKey: string): string => {
  const reg = new RegExp(`&{1}${queryKey}\\=[a-zA-Z0-9_-]+`, 'g')
  const matchResult = url.replace(/\?/g, '&').match(reg)![0]
  return matchResult.substr(matchResult.indexOf('=') + 1)
}

// 获取对象类型
export const getObjectType = (obj: any) => {
  const str = Object.prototype.toString.call(obj)
  const regex = /^\[object\s([a-zA-Z]+)\]$/
  const arr = str.match(regex)
  return arr?.length ? arr[1].toLowerCase() : ''
}

// 动态加载本地图片资源
export const getImageUrl = (name: string, type: string = 'png') => {
  return new URL(
    // 本地资源路径
    `/src/assets/images/${name}.${type}`,
    import.meta.url
  ).href
}
