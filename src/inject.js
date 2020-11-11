const API_ORIGIN = 'https://yapi.baidu.com'

const API_FORMATTER_STR = ` // 接受一个参数 data , 返回希望生成的代码
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

class CodeGen {
  constructor({ name, request = function () {}, formatter = function () {} }) {
    this.el = this.injectBtn(name)
    this.request = request
    this.formatter = formatter
  }

  // eslint-disable-next-line class-methods-use-this
  injectBtn(innerHTML) {
    const btn = document.createElement('BUTTON')
    btn.innerHTML = innerHTML
    btn.style.marginRight = '10px'
    CodeGen.container.appendChild(btn)
    return btn
  }

  hide() {
    this.el.style.display = 'none'
  }

  async init() {
    const { data } = await this.request()
    const result = this.formatter(data)
    this.el.dataset.clipboardText = result
    new ClipboardJS(this.el).on('error', function () {
      // eslint-disable-next-line no-alert
      alert('复制失败！')
    })
  }

  static initContainer() {
    const styles = {
      position: 'fixed',
      right: '10px',
      top: '65px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
    const div = document.createElement('div')

    Object.entries(styles).forEach(([key, val]) => {
      div.style[key] = val
    })

    document.body.appendChild(div)
    return div
  }
}
CodeGen.apiOrigin = ''
CodeGen.container = CodeGen.initContainer()

// eslint-disable-next-line no-unused-vars
function hyphenToPascal(str) {
  return str
    .replace(/-([a-z])/g, (...args) => args[1].toUpperCase())
    .replace(/[a-z]/, (...args) => args[0].toUpperCase())
}

function init(config) {
  const {
    apiOrigin = API_ORIGIN,
    apiFormatterBody = API_FORMATTER_STR,
  } = config

  chrome.storage.sync.set({ apiOrigin, apiFormatterBody })

  CodeGen.apiOrigin = apiOrigin

  const apiCodeGen = new CodeGen({
    name: '获取 API 代码',
    request: () => {
      const id = window.location.pathname.split('/').slice(-1)[0]
      return axios({
        url: `${apiOrigin}/api/interface/get?id=${id}`,
        headers: {
          accept: 'application/json',
        },
        method: 'GET',
        withCredentials: true,
      })
    },
    // eslint-disable-next-line no-new-func
    formatter: new Function('data', apiFormatterBody),
  })
  apiCodeGen.init()

  const reqParamCodeGen = new CodeGen({
    name: '获取 FormData 代码',
  })
  reqParamCodeGen.hide()

  const responseToTableGen = new CodeGen({
    name: '获取 ElTable 代码',
  })
  responseToTableGen.hide()

  const responseMockCodeGen = new CodeGen({
    name: '获取 响应 Mock 代码',
  })
  responseMockCodeGen.hide()
}

chrome.storage.sync.get(null, init)
