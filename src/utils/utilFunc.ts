import Qs from 'qs'
// 获取指定url参数
export const getUrlParam = (key: string, url?: string) => {
  const urlStr = url || window.location.search
  const index = urlStr.indexOf('?')
  if (index === -1) return ''
  const params = urlStr.slice(index + 1)
  const parseObj = Qs.parse(params)
  return parseObj[key] as string
}
// 过滤对象中的无用属性
export const filerRedundantProps = (obj: any) => {
  if (typeof obj === 'object') {
    const resObj: any = {}
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        obj[key] !== undefined &&
        obj[key] !== null &&
        obj[key] !== '' &&
        `${obj[key]}` !== 'NaN'
      )
        resObj[key] = obj[key]
    }
    return resObj
  }
  return obj
}

export const getTargetProperty = (params: {
  data: any[]
  filterKey: string
  resultKey: string
  value: any
}) => {
  if (params.data.length) {
    const findItem = params.data.find((item) => {
      return item[params.filterKey] + '' === params.value + ''
    })
    if (findItem) {
      return findItem[params.resultKey]
    }
  }
  return ''
}

export const emailReg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
