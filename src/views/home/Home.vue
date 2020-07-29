<template>
  <div class="home">
    <!--  导航栏-->
    <nav-bar class="home-nav">
      <div slot="left">
        <span class="nav-title">购物</span>
      </div>
      <div slot="center" class="nav-search">
        <label>
          <input type="text" placeholder="搜索点什么吧..." class="search-input">
        </label>
      </div>
    </nav-bar>
    <!--  小导航-->
    <div class="tab-border" v-show="isTabFixed">
      <tab-control class="tab-control-top"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"/>
    </div>

    <!--    监听滚动-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="{threshold: 500}"
            @pullingUp="loadMore">
      <div class="home-main">
        <!--  轮播图-->
        <home-swiper :banners="banners" class="banners"/>
        <!--  推荐信息-->
        <recommend-view :recommends="recommends" class="recommend-view box-shadow"/>
        <!--  本周流行-->
        <feature-view class="feature box-shadow"/>
        <!--  小导航-->
        <tab-control class="tab-control box-shadow"
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"/>
        <!--      商品列表-->
        <!--      将数据传递到子组件中-->
        <goods-list :goods="showGoods" class="goods"/>
      </div>
    </scroll>
    <!--    回到顶部-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import GoodsList from "@/components/content/goods/GoodsList";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";

import {getHomeMultiData, getHomeGoods} from "@/network/home";
import Scroll from "@/components/common/scroll/Scroll";

import {backTopMixin} from "@/common/mixin";


export default {
  name: "Home",
  components: {Scroll, GoodsList, FeatureView, RecommendView, HomeSwiper, NavBar, TabControl},
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 660,
      isTabFixed: false,
      saveY: 0
    }
  },

  //当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 50);
    this.$refs.scroll.refresh();
  },

  deactivated() {
    this.saveY = this.$refs.scroll.getCurrentY();
  },

  computed: {
    showGoods() {
      //获取到数据的商品列表 根据 类型获取
      return this.goods[this.currentType].list
    }
  },

  //在页面创建时运行的Vue生命周期函数
  created() {
    // 1. 请求多个数据  轮播和推荐
    this.getHomeMultiData();

    // 2. 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },

  mounted() {
    //防抖
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    //3. 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      // this.$refs.scroll.refresh();
      refresh();
    })
    // 获取tabControl的offsetTop
    // console.log(this.$refs.tabControl2.$el.offsetTop);
  },

  methods: {

    //防抖函数
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      };
    },

    /*事件监听
    * */
    //点击时根据index修改currentType的值, 使得页面数据切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    /*backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },*/

    contentScroll(position) {
      //1. 判断BackTop是否显示
      this.listenShowBackTop(position);
      //2. 决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },

    //上拉加载 只能运行一次  必须添加finishPullUp 完成函数
    loadMore() {
      // 使用方法继续调用网络数据
      this.getHomeGoods(this.currentType);
      // 使用scroll的方法刷新获取到的容器高度
      this.$refs.scroll.refresh();
    },


    /*网络请求
    * */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        //把参数返回到组件对象中
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      //初始页设为第一页
      const pageCount = this.goods[type].page + 1;
      //网络请求 根据 类型和页数请求数据
      getHomeGoods(type, pageCount).then(res => {
        //将请求到的数据添加的goods中
        this.goods[type].list.push(...res.data.list);
        //将页数加1
        this.goods[type].page += 1;

        //上拉加载完成  可以继续上拉加载
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
.box-shadow {
  box-shadow: 0 0 4px 2px #0000000f;
  border-radius: 10px;
  overflow: hidden;
}


.home {
  background: #f2f2f2;
  height: 100vh;
  position: relative;
}

.home-main {
  padding: 10px 10px 0;
}

.home-nav {
  background-color: var(--color-tint);
  color: var(--color-background);
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*z-index: 100;*/
  width: 100%;
}

.nav-title {
  font-size: 20px;
  font-weight: 600;
}

.nav-search input {
  width: 100%;
  border: none;
  height: 30px;
  border-radius: 30px;
  padding-left: 10px;
  font-size: 14px;
}


.content {
  height: calc(100% - 49px);
  overflow: hidden;
  /*position: absolute;*/
  /*top: 44px;*/
  /*bottom: 49px;*/
  /*left: 0;*/
  /*right: 0;*/
}

.tab-border {
  background-color: #f2f2f2;
  padding: 0 10px;
  position: absolute;
  top: 44px;
  /*left: 10px;*/
  /*right: 10px;*/

  overflow: hidden;
  z-index: 9;
  width: 100%;

}

.tab-control-top {
  border-radius: 10px;
  box-shadow: 0 0 4px 2px #0000000f;
}

.banners {
  border-radius: 10px;
}

.tab-control {
  /*position: sticky;*/
  /*top: 44px;*/
  margin: 10px 0 2px 0;
}

.recommend-view {
  overflow: hidden;
  margin: 10px 0;
}

.feature {
  overflow: hidden;
}

.goods {
  padding-bottom: 49px;
}


</style>
