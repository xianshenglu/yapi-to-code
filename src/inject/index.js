import axios from 'axios'
import CodeGen from './codeGen'

import { API_FORMATTER_STR, API_ORIGIN } from './constants'

// eslint-disable-next-line no-unused-vars
function hyphenToPascal(str) {
  return str
    .replace(/-([a-z])/g, (...args) => args[1].toUpperCase())
    .replace(/[a-z]/, (...args) => args[0].toUpperCase())
}
//
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
