<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="toast">购买</div>
    </div>
  </div>

</template>

<script>

  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart');
      },
      toast() {
         this.$store.commit('showToast', '先加入购物车!');
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #e6e6e6;
  }

  .bar-item {
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: space-around;
    height: 80%;
    line-height: 100%;
    border-radius: 40px;
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
  }

  .bar-left {
    flex: 1;
    border-radius: 0;
  }

  .icon {
    display: block;
    width: 25px;
    height: 25px;
    margin: 0 auto;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  i.icon.shop {
    background-position: 0 -110px;
  }

  i.icon.select {
    background-position: 0 2px;
  }

  i.icon.service {
    background-position: 0 -59px;
  }

  span.text {
    font-size: 13px;
  }

  .bar-right > div {
    width: 50%;
    height: 100%;
    line-height: 38px;
    text-align: center;
  }

  .cart {
    background-image: linear-gradient(179.5deg, rgba(255, 230, 69, 1) 3.3%, rgba(255, 157, 73, 1) 96%);
    color: #333333;
  }

  .buy {
    background-image: linear-gradient(179.5deg, rgb(255 97 115) 3.3%, rgb(255 48 48) 96%);
    color: #ffffff;
  }
</style>
