import CodeGen from './codeGen'

import { API_FORMATTER_STR, API_ORIGIN } from '../constants'
import { getApiInfo } from '../apis'

function init(config) {
  const { apiOrigin = API_ORIGIN, apiFormatterStr = API_FORMATTER_STR } = config

  CodeGen.apiOrigin = apiOrigin

  const apiCodeGen = new CodeGen({
    name: '获取 API 代码',
    request: () => {
      const id = window.location.pathname.split('/').slice(-1)[0]
      return getApiInfo(apiOrigin, { id })
    },
    // eslint-disable-next-line no-new-func
    formatter: new Function(`return (${apiFormatterStr})`)(),
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
