import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//安装插件
Vue.use(Vuex);

//state
const state = {
   detailTopImgCount: 0,
    isShowCart: false,
    isShowToast: {isShow:false,msg:'提示'},
    isShowImgBig: false,
    cartList: []
};

//创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store
