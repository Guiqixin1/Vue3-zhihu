import axios from 'axios'

const request = axios.create({
  baseURL: '/baseurl',
  timeout: 7000
})

export default request
