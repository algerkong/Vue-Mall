export default {
  showOrNo(state) {
    state.isShowCart = !state.isShowCart;
  },
  showToast(state, msg) {
    state.isShowToast.isShow = !state.isShowToast.isShow;
    state.isShowToast.msg = msg;
    setTimeout(() => {
      state.isShowToast.isShow = !state.isShowToast.isShow;
    }, 2000)
  },
  showImgBig(state) {
    state.isShowImgBig = !state.isShowImgBig;
  },
  addCounter(state,payload) {

  },
  addToCart(state,payload){
    state.cartList.push(payload);
  },
  addCart(state, payload) {
    //payload添加新的商品
    let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item;
    //   }
    // }
    //查找商品是否已经添加过
    oldProduct = state.cartList.find(item => item.goodsId === payload.goodsId);

    //2. 判断oldProduct
    if (oldProduct) {
      //旧商品+1
      oldProduct.count += payload.count;
    } else {
      //添加新商品
      state.cartList.push(payload);
    }

  }
}
