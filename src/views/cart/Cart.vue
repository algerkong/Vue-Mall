<template>
  <div class="cart-page">
    <!--    导航-->
    <nav-bar class="nav">
      <div slot="center"><p>购物车({{ cartLength }})</p></div>
    </nav-bar>
    <!--    商品列表-->
    <scroll class="content" :probe-type="3" :pull-up-load="{threshold: 500}" ref="scroll">
      <div v-for="(item,index) in cartList">
        <cart-item :cart-list-item="item" :key="index"/>
      </div>
    </scroll>
    <!--    底部汇总-->
    <cart-price/>
  </div>
</template>

<script>
import CartItem from "./childComps/CartItem";
import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "@/components/common/navbar/NavBar";

import {mapGetters} from 'vuex'
import CartPrice from "./childComps/CartPrice";

export default {
  name: "cart",
  components: {CartPrice, NavBar, Scroll, CartItem},
  computed: {
    //mapGetters在vuex中导入  可以如 cartList 为 this.$state.store.cartList
    ...mapGetters({
      cartLength: 'cartLength',
      cartList: 'cartList'
    })
  }
}
</script>

<style scoped>
.cart-page {
  height: 100vh;
  background-color: #f2f2f2;
}

.nav {
  background-color: var(--color-tint);
  position: relative;
  z-index: 99;
  color: #ffffff;
}

.content {
  height: calc(100vh - 49px - 64px - 40px);
}
</style>
