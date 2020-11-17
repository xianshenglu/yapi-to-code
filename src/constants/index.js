export const API_ORIGIN = 'https://yapi.baidu.com'

export const API_FORMATTER_STR = function fn(data) {
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
  const resultStr = `
        export function ${methodName} (${paramsStr}){  
            return request({   
               url: \`\${API_ORIGIN}\${path}\`,  
               method: '${method}',
               ${requestBodyStr}    
            })
        }          
        `
  return resultStr
}.toString()
