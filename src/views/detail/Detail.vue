<template>
  <div id="detail">
    <details-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" :probe-type="3" :pull-up-load="{threshold: 100}"
            @scroll="contentScroll" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <div class="goods-detail">
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
      </div>
      <detail-info-img :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>

    <detail-bottom-bar @addCart="addCart"/>

    <detail-cart-choose :goods-cart-info="goodsCartInfo" :btn-name="'加入购物车'" :title="goods.title" :iid="iid"/>
    <!--    回到顶部-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>


  </div>
</template>

<script>

  import DetailsNavBar from "@/views/detail/childDetails/DetailsNavBar";
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/details";
  import DetailSwiper from "@/views/detail/childDetails/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childDetails/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childDetails/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailInfoImg from "./childDetails/DetailInfoImg";
  import DetailParamInfo from "./childDetails/DetailParamInfo";
  import DetailCommentInfo from "./childDetails/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childDetails/DetailBottomBar";

  import {backTopMixin} from "@/common/mixin";
  import DetailCartChoose from "./childDetails/DetailCartChoose";

  export default {
    name: "detail",
    components: {
      DetailCartChoose,
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo, DetailInfoImg, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailsNavBar
    },
    data() {
      return {
        iid: null,  //商品id
        topImages: [],  //轮播图
        goods: {},  //商品信息
        shop: {},   //店铺信息
        detailInfo: {},  //商品详情
        paramInfo: {},  //参数信息
        commentInfo: {},//评论信息
        recommends: [], //推荐数据
        themeTopYs: [], //跳转位置
        goodsCartInfo: {}, //商品加入购物车信息
        preferentialInfo: []  //优惠信息
      }
    },
    mixins: [backTopMixin],
    created() {
      // 1. 保存要传入的ID
      this.iid = this.$route.query.iid;
      // 2. 根据id请求数据
      getDetail(this.iid).then(res => {
        //1. 获取顶部图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        console.log(res);
        // 2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3. 创建店铺信息
        this.shop = new Shop(data.shopInfo);

        //4. 保存商品详情
        this.detailInfo = data.detailInfo;

        //5. 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6. 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

        //7.获取商品加入购物车信息
        this.goodsCartInfo = data.skuInfo;
      });
      //7. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
        console.log(this.recommends)
      });

      // 8.给getThemeYs赋值


      //在上面所有函数渲染完成才会执行this.$nextTick这个方法
      //offSetTop值不对 一般都是图片加载问题
      this.$nextTick(() => {
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      });

    },
    mounted() {

    },

    updated() {

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index] - 50), 100);
      },
      contentScroll(position) {
        //1. 判断BackTop是否显示
        this.listenShowBackTop(position);

        //2. 滚动到位置改变顶部tab
        const positionY = -position.y;
        for (let i in this.themeTopYs) {
          if (this.currentIndex !== i * 1 && ((i < this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i * 1] - 50 && positionY < this.themeTopYs[i * 1 + 1] - 50) || (i * 1 === this.themeTopYs.length - 1 && positionY > this.themeTopYs[i * 1] - 50))) {
            this.currentIndex = i * 1;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },
      addCart() {
        //1. 获取购物车需要的商品信息
        // this.isShowCart = this.$store.state.isShow;
        this.$store.commit('showOrNo');
      }
    }
  }
</script>

<style scoped>

  #detail {
    height: 100vh;
  }

  .content {
    height: calc(100% - 93px);
  }

  .goods-detail {
    padding: 0 10px;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
  }
</style>
