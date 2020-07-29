import {
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload添加新的商品
      let oldProduct = null;
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item;
      //   }
      // }
      //查找商品是否已经添加过
      oldProduct = context.state.cartList.find(item => item.goodsId === payload.goodsId);
      console.log(oldProduct);
      //2. 判断oldProduct
      if (oldProduct != null) {
        //旧商品+1
        oldProduct.count += payload.count;
        resolve('商品数量+'+payload.count)
      } else {
        //添加新商品
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新商品')
      }
    })
  }
}
