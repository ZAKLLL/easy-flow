import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
})

export default service

//export function update(data) {
//   return request({
//     url: 'api/genConfig',
//     data,
//     method: 'put'
//   })
// }
