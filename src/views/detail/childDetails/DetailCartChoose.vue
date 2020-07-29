<template>
  <div class="cart-page" v-if="this.$store.state.isShowCart">
    <div class="cart-click" @click="cartClick"></div>
    <div class="cart-choose">
      <div class="cart-top">
        <div class="img-page"><img :src="imgSrc" class="shop-img" alt="" @click="imgBig"></div>
        <div class="cart-info">
          <div class="shop-price">￥{{price}}<span class="old-price" v-show="oldPrice">￥{{oldPrice}}</span></div>
          <div class="shop-stock">库存{{stock}}件</div>
          <div class="shop-choose">选择<span>{{name1}},{{name2}}</span></div>
        </div>
      </div>
      <scroll class="content" :probe-type="2" :pull-up-load="{threshold: 100}">
        <div class="cart-bottom">
          <div class="cart-info-page">
            <div class="title">{{props[0].label}}</div>
            <div class="class-name">
              <span class="name" v-for="(list,count) in props[0].list" :key="count"
                    :class="{'name-click':count===name1Count}" @click="name1Click(count,list.name)">{{list.name}}</span>
            </div>
          </div>
          <div class="cart-info-page">
            <div class="title">{{props[1].label}}</div>
            <div class="class-name">
              <span class="name" v-for="(list,count) in props[1].list" :key="count"
                    :class="{'name-click':count===name2Count}" @click="name2Click(count,list.name)">{{list.name}}</span>
            </div>
          </div>
        </div>
        <div class="cart-number">
          <div>购买数量</div>
          <div class="counter">
            <span @click="counterMinus">-</span>
            <span>{{goodNumber}}</span>
            <span @click="counterAdd">+</span>
          </div>
        </div>
      </scroll>
      <div class="submit">
        <input type="button" :value="btnName" @click="addCart">
      </div>
      <detail-img-big :img-src="imgSrc" :info="this.name1" v-if="$store.state.isShowImgBig"/>

    </div>
  </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import DetailImgBig from "./DetailImgBig";
  import {formatPrice} from "@/common/utils";

  import {mapActions} from "vuex"

  export default {
    name: "DetailCartChoose",
    components: {DetailImgBig, Scroll},
    data() {
      return {
        price: null,     //价格
        oldPrice: "",
        stock: 0,       //库存
        goodNumber: 1,  //加入数量
        props: null,     //商品颜色尺寸信息
        name1: null,    //颜色
        name2: null,    //尺寸
        name1Count: null,//颜色第几个
        name2Count: null,//尺寸第几个
        skus: null,      //图片信息
        imgSrc: null,    //图片地址
        isImgBig: this.$store.state.isShowImgBig, //是否显示大图
        toast: null,
        goodsId: null,  //商品ID
      }
    },
    props: {
      goodsCartInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      btnName: {
        type: String,
        default() {
          return "确定"
        }
      },
      title: {
        type: String,
        default() {
          return ""
        }
      },
      iid: {
        type: String,
        default() {
          return ""
        }
      }
    },
    watch: {
      //监测数据变化
      goodsCartInfo: function (newVal, oldVal) {
        this.price = newVal.defaultPrice.substr(1);
        this.props = newVal.props;
        this.name1 = newVal.props[0].label;
        this.name2 = newVal.props[1].label;
        this.stock = newVal.totalStock;
        this.skus = newVal.skus;
        this.imgSrc = newVal.skus[0].img;
      }

    },
    methods: {
      //组件里也可以映射vuex 的方法
      ...mapActions(['addCart']),
      //1. 数量减
      counterMinus() {
        if (this.goodNumber > 1) {
          this.goodNumber--;
        } else {
          this.toast = "数量低于范围";
          this.$store.commit('showToast', this.toast);
        }
      },
      //2. 数量加
      counterAdd() {
        this.stock = this.goodsCartInfo.totalStock;
        if (this.goodNumber < this.stock) {
          this.goodNumber++;
        }
      },
      //3.加入购物车
      addCart() {
        //1.获取商品信息
        const product = {
          iid: this.iid,
          count: this.goodNumber,
          image: this.imgSrc,
          title: this.title,
          price: this.price,
          goodsId: this.goodsId,
          style: this.name1,
          size: this.name2,
          checked: false
        };
        if (product.goodsId != null) {
          if (this.name2Count != null) {
            //2.添加到购物车
            this.$store.dispatch('addCart', product).then(res => {
              this.$store.commit('showToast', res)
            });
            // this.addCart(product).then(res => {this.toast = res;});
            console.log(this.$store.state.cartList);

            //隐藏购物选择
            this.$store.commit('showOrNo');
            this.goodNumber = 1;
          } else {
            this.toast = "请选择尺寸";
            this.$store.commit('showToast', this.toast);

          }
        } else {
          this.toast = "请选择商品";
          this.$store.commit('showToast', this.toast);

        }
      },
      // 4.点击黑色隐藏页面
      cartClick() {
        this.$store.commit('showOrNo');
      },
      //5.选择颜色
      name1Click(count, name1) {
        this.name1Count = count;
        this.name1 = name1;
        //改变图片
        let i = this.name1Count * this.props[1].list.length + this.name2Count;
        this.imgSrc = this.skus[i].img;
        //改变价格
        let floatPrice = parseFloat(this.skus[i].nowprice) / 100;
        this.price = floatPrice.toFixed(2);
        this.oldPrice = (this.skus[i].price / 100).toFixed(2);
        this.goodsId = this.skus[i].stockId;
      },
      //6.选择尺寸
      name2Click(count, name2) {
        this.name2Count = count;
        this.name2 = name2;
      },
      //7.图片放大
      imgBig() {
        this.$store.commit('showImgBig');
      }
    }
  }
</script>

<style scoped>
  .cart-click {
    width: 100%;
    height: 40vh;
  }

  .cart-page {
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 0;
    background-color: #00000087;
    z-index: 99;
  }

  .cart-choose {
    width: 100%;
    padding: 10px;
    background: #fff;
    min-height: 60vh;
    position: fixed;
    bottom: 0;
    animation: toTop ease-in .5s;
  }

  @keyframes toTop {
    0% {
      bottom: -70vh;
    }
    90% {
      bottom: 0;
    }
    100% {
      bottom: 0;
    }
  }

  .cart-top {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid #dbdbdb;
    background-color: #ffffff;
  }

  .img-page {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #333;
  }

  .img-page > img {
    width: 100px;
  }

  .cart-info {
    padding: 10px;
  }

  .content {
    height: calc(60vh - 120px - 34px);
    overflow: hidden;
  }

  .shop-price {
    font-size: 20px;
    color: #F44336;
    font-weight: 600;
  }

  .old-price {
    color: #b1b1b1;
    font-size: 14px;
    margin-left: 15px;
    text-decoration: line-through;
    font-weight: normal;
  }

  .shop-stock {
    font-size: 14px;
    padding: 5px 0;
    color: #939393;
  }

  .shop-choose {
    padding: 5px 0;
    font-size: 14px;
  }

  .title {
    color: #000;
  }

  .name {
    padding: 3px 6px;
    background-color: #f5f5f5;
    margin: 5px;
    display: inline-block;
    border-radius: 5px;
    transition: .5s;
  }

  .cart-info-page {
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid #dbdbdb;
  }

  .cart-number {
    display: flex;
    justify-content: space-between;
    color: #000;
    padding: 5px 0;
  }

  .counter > span {
    display: inline-block;
    padding: 5px 10px;
    margin-left: 2px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  .submit > input {
    width: 90%;
    padding: 7px;
    margin: 0 auto;
    display: block;
    background-color: var(--color-high-text);
    border: none;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    outline: none;
    background-image: linear-gradient(179.5deg, rgb(255 184 64) 3.3%, rgb(255 121 73) 96%);
  }

  .name-click {
    background-color: var(--color-high-text);
    color: #ffffff;
  }
</style>
