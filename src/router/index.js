import Vue from "vue";
import VueRouter from "vue-router";


// 1. 安装插件
Vue.use(VueRouter);

const Home = () => import('@/views/home/Home');
const Cart = () => import('@/views/cart/Cart');
const Profile = () => import('@/views/profile/Profile');
const Category = () => import('@/views/category/Category');
const Detail = () => import('@/views/detail/Detail');


const routes = [
  {
    path: '',
    redirect: '/home',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: true
    }
  },
  {
    //动态路由i
    path: '/detail',
    component: Detail,
    meta:{
      keepAlive: false
    }
  }

];
// 2. 创建路由对象
const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
