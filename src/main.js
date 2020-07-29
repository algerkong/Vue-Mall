import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import store from '@/store'


import FastClick from 'fastclick';

import VueLazyload from "vue-lazyload";

import toasta from "./components/common/toasta/toasta";

Vue.config.productionTip = false;


//将vuex的store添加到Vue的原型中 , 即所有组件中
Vue.prototype.$store = store;

//事件总线  用来监听发射方法
Vue.prototype.$bus = new Vue();

//安装toasta插件
Vue.use(toasta)

//解决移动端300ms的延迟
FastClick.attach(document.body)

//vue图片懒加载
Vue.use(VueLazyload,{
  loading: require("./assets/img/common/loader.gif")
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
