import CodeGen from './codeGen'

import {
  API_FORMATTER_STR,
  API_ORIGIN,
  RESPONSE_TO_TABLE_CONF_STR,
} from '../constants'
import { getApiInfo } from '../apis'
import { getApiId } from '../utils'

function init(config) {
  const {
    apiOrigin = API_ORIGIN,
    apiFormatterStr = API_FORMATTER_STR,
    responseToTableConfStr = RESPONSE_TO_TABLE_CONF_STR,
  } = config

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

  const responseToTableConfGen = new CodeGen({
    name: '生成 响应 Table 代码',
    request: () => {
      return getApiInfo(apiOrigin, { id: getApiId() })
    },
    // eslint-disable-next-line no-new-func
    formatter: new Function(`return (${responseToTableConfStr})`)(),
  })
  responseToTableConfGen.init()

  const responseMockCodeGen = new CodeGen({
    name: '生成 响应 Mock 代码',
  })
  responseMockCodeGen.hide()
}

chrome.storage.sync.get(null, init)
