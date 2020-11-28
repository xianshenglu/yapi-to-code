import request from './request'
import { YApiResponse } from '../typings/apis'

export function getApiInfo(
  origin: string,
  params: Record<string, unknown>
): YApiResponse {
  return request({
    url: `${origin}/api/interface/get`,
    method: 'GET',
    params,
  })
}
