import axios from 'axios'


export function request(config) {
  //1. 创建axios的实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/w6",
    timeout: 5000
  });

  // 2. axios的拦截器

  //2.1 请求拦截
  //1. 比如说 config中的一些信息不符合服务器的要求
  //2. 每次发送网络请求时, 都希望在界面中添加一个请求的图标
  //3. 某些网络请求(比如 登录token) 必须携带一些特殊的信息
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  });

  // 2.2响应拦截
  instance.interceptors.response.use(res=>{
    //响应拦截必须返回res.data
    return res.data
  },err=>{
    console.log(err);
  });
  return instance(config)
}
