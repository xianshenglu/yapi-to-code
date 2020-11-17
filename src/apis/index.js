import Axios from 'axios'

export function getApiInfo(origin, params) {
  return Axios({
    url: `${origin}/api/interface/get`,
    method: 'GET',
    params,
  })
}
