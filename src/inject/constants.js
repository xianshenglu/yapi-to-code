export const API_ORIGIN = 'https://yapi.baidu.com'

export const API_FORMATTER_STR = ` // 接受一个参数 data , 返回希望生成的代码
  const {
    data: { method, path },
  } = data;
  const lastPath = path.split("/").slice(-1)[0];
  const methodName = method.toLowerCase() + hyphenToPascal(lastPath);
  const hasReqBody = ["post", "put"].includes(method.toLowerCase());
  const paramsStr = hasReqBody ? "data" : "";
  const requestBodyStr = hasReqBody ? "data" : "";  
  const resultStr = \`
      export function \${methodName} ($\{paramsStr}){  
          return request({   
             url: \\\`\${API_ORIGIN}\${path}\\\`,  
             method: '\${method}',
             \${requestBodyStr}    
          })
      }          
      \`;
  return resultStr;
`
