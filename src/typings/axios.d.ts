import Axios from 'axios'
import { YApiResponse } from './apis'

declare module 'axios' {
  // export interface AxiosResponse<T> extends T {}
  export interface AxiosInstance {
    (config: AxiosRequestConfig): YApiResponse
  }
}
export default Axios
