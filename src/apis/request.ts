import Axios, { AxiosResponse } from 'axios'
import _ from 'lodash'
import { YApiResponseBody } from '../typings/apis'

function handleErrorResponse(error: Error) {
  let errorMsg = '未知错误！'

  const isMessageValid =
    _.isObject(error) &&
    typeof error.message === 'string' &&
    error.message.trim() !== ''

  if (isMessageValid) {
    errorMsg = error.message
  }
  // eslint-disable-next-line no-alert
  alert(errorMsg)
  return Promise.reject(error)
}

const instance = Axios.create({
  withCredentials: true,
  headers: {
    accept: 'application/json',
  },
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config
}, handleErrorResponse)

// 添加响应拦截器 todo handle type
instance.interceptors.response.use(function (
  response: AxiosResponse<YApiResponseBody>
): YApiResponseBody {
  return response.data
},
handleErrorResponse)

export default instance
