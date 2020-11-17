import Axios from 'axios'

const instance = Axios.create({
  withCredentials: true,
  headers: {
    accept: 'application/json',
  },
})

export default instance
