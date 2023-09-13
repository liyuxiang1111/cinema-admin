import axios from 'axios'
const ali = axios.create({
  // baseURL: 'http://127.0.0.1:9999/',
  baseURL: 'https://liyuxiang.com.cn/',
  timeout: 600000
})

ali.interceptors.request.use(
  function(config) {
    // 不需要拦截的url
    let noIntercept = ['flight/search']
    // Do something before request is sent
    let token = localStorage.getItem('token') || ''
    config.headers['token'] = token
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

//封装ajax
export default function ajax(url = '', params = {}, type = 'GET') {
  let promise
  return new Promise((resolve, reject) => {
    //1.判断请求方式
    if ('GET' === type) {
      //1.1拼接字符串
      let str = ''
      Object.keys(params).forEach((value, index) => {
        if (index + 1 === Object.keys(params).length) {
          str += value + '=' + params[value]
        } else {
          str += value + '=' + params[value] + '&'
        }
      })
      //1.2完整路径
      url += '?' + str
      //1.3发送get请求
      promise = ali.get(url)
    } else if ('POST' === type) {
      //1.3发送post请求
      promise = ali.post(url, params)
    }
    //2.返回请求结果
    promise
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
