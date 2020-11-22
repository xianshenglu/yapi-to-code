import CodeGen from './codeGen'

import { API_FORMATTER_STR, API_ORIGIN } from '../constants'
import { getApiInfo } from '../apis'
import { getApiId } from '../utils'

function init(config) {
  const { apiOrigin = API_ORIGIN, apiFormatterStr = API_FORMATTER_STR } = config

  CodeGen.apiOrigin = apiOrigin

  const apiCodeGen = new CodeGen({
    name: '生成 API 代码',
    request: () => {
      return getApiInfo(apiOrigin, { id: getApiId() })
    },
    // eslint-disable-next-line no-new-func
    formatter: new Function(`return (${apiFormatterStr})`)(),
  })
  apiCodeGen.init()

  const reqParamCodeGen = new CodeGen({
    name: '生成 请求 FormData 代码',
  })
  reqParamCodeGen.hide()

  const responseToTableGen = new CodeGen({
    name: '生成 响应 ElTable 代码',
  })
  responseToTableGen.hide()

  const responseMockCodeGen = new CodeGen({
    name: '生成 响应 Mock 代码',
  })
  responseMockCodeGen.hide()
}

chrome.storage.sync.get(null, init)
