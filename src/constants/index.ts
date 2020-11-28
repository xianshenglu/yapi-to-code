import { YApiResponseData } from '../typings/apis'

export const API_ORIGIN = 'https://yapi.baidu.com'
// todo refactor
export const API_FORMATTER_STR = `function fn(data) {
  // 接受一个参数 data , 返回希望生成的代码
  const {
    data: { method, path },
  } = data
  const lastPath = path.split('/').slice(-1)[0]
  function hyphenToPascal(str) {
    return str
      .replace(/-([a-z])/g, (...args) => args[1].toUpperCase())
      .replace(/[a-z]/, (...args) => args[0].toUpperCase())
  }
  const methodName = method.toLowerCase() + hyphenToPascal(lastPath)
  const hasReqBody = ['post', 'put'].includes(method.toLowerCase())
  const paramsStr = hasReqBody ? 'data' : ''
  const requestBodyStr = hasReqBody ? 'data' : ''
  const resultStr = \`
        export function \${methodName} (\${paramsStr}){  
            return request({   
               url: \\\`\\\${API_ORIGIN}\${path}\\\`,  
               method: '\${method}',
               \${requestBodyStr}    
            })
        }          
        \`
  return resultStr
}`

export const RESPONSE_TO_TABLE_CONF_STR = `function fn(data) {
  // 接受一个参数 data , 返回希望生成的代码
  const resBody = JSON.parse(data.data.res_body)
  const tableColumnConf =
    resBody.properties.result.properties.list.items.properties
  const result = Object.entries(tableColumnConf).map(([prop, val]) => {
    return { prop, label: val.description }
  })
  return JSON.stringify(result, null, 2)
}`

export function getMockStr(response: YApiResponseData, nodeName) {
  const { type } = response
  if (type === 'array') {
    return getArrayMock(response, nodeName)
  }
  if (type === 'object') {
    return getObjectMock(response, nodeName)
  }
  return getPrimitivesMock(response)

  function getArrayMock(node, nodeName) {
    const { items } = node
    // rootArray or array in array
    return [getMockStr(items, nodeName)]
  }
  /**
   *
   * @param {{type:string,properties?:object,items?:unknown[]}} node
   * @param {string|undefined} name
   * @returns {string}
   */
  function getPrimitivesMock(node, name) {
    const { type } = node
    const typeMockMap = {
      string: '@cparagraph(0,100)',
      number: '@float(0,1000000,0,2)',
      boolean: '@boolean',
      integer: '@integer(0,1000000)',
    }
    const similarTypeMockMap = {
      id: '@id',
      time: "@datetime('yyyy-MM-DD HH:mm:ss')",
      date: "@datetime('yyyy-MM-DD')",
      //   todo enhance
      provinceId: '@id()',
      provinceName: '@id()',
      province: '@id()',
    }
    if (typeof name !== 'string') {
      return typeMockMap[type]
    }
    const similarType = Object.keys(similarTypeMockMap).find((key) =>
      name.toLowerCase().endsWith(key)
    )
    if (similarType !== undefined) {
      return similarTypeMockMap[similarType]
    }
    return typeMockMap[type]
  }

  function getObjectMock(node) {
    const { properties } = node
    const result = Object.keys(properties).reduce((acc, nodeName) => {
      const curNode = properties[nodeName]
      const curNodeName =
        curNode.type === 'array' ? `${nodeName}|1-10` : nodeName
      acc[curNodeName] = getMockStr(curNode, nodeName)
      return acc
    }, {})
    return result
  }
}
