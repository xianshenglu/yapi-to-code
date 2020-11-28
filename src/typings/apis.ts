/* eslint-disable camelcase */
export interface YApiResponseData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  res_body: string
  res_body_type: 'json'
}
/* eslint-enable camelcase */

export interface YApiResponseBody {
  data: YApiResponseData
  errcode: 0 | 1
  errmsg: string
}

export type YApiRequest = (arg?: unknown) => Promise<YApiResponseBody>

export type YApiResponse = ReturnType<YApiRequest>
