import {request} from './request';
//获取首页导航栏和推荐数据
export function getHomeMultiData() {
  return request({
    url:'/home/multidata'
  })
}

//获取首页三类商品信息
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}
