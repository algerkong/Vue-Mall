<template>
  <div class="cart-price">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="isChecked"/>
      <span>全选</span>
    </div>
    <div class="price-text">
      <span style="color:#000;">合计:</span>
      <span class="price">￥{{ totalPrice }}</span>
    </div>
    <div class="buy-content">
      <div class="buy-btn" @click="buyClick">购买({{ checkedLength }})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
import {mapGetters} from "vuex"

export default {
  name: "CartPrice",
  components: {CheckButton},
  methods: {
    buyClick() {
      // if(!this.isSelectAll){
      //   this.$store.commit('showToast', '请选择商品!');
      // }else{
      //   this.$store.commit('showToast', '购买商品');
      // }
      this.$toasta.show('11111', 2000);
    },
    //点击切换全选状态
    isChecked() {
      if (!this.isSelectAll) {
        this.cartList.forEach(item => item.checked = true)
      } else {
        this.cartList.forEach(item => item.checked = false)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    //计算价格
    //filter过滤属性
    //计算选中的属性的价格 用reduce计算
    //reduce 接收一个函数作为累加器
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        // console.log(item);
        return preValue + item.price * item.count;
      }, 0).toFixed(2)
    },
    //选中的数量
    checkedLength() {
      return this.cartList.filter(item => {
        return item.checked
      }).length;
    },
    //是否全部选中
    isSelectAll() {
      //多种方法

      //判断商品的与不选中的长度是否相同 相同即为true 不相同为false
      return (this.cartList.length === 0 ? false : this.cartList.length === this.checkedLength)

      //返回所有的不选中的商品数量, 再取反 ,数量为0就是true 其他为false
      // return !(this.cartList.filter(item=> !item.checked).length)

      // 返回是否有选中的商品
      // return !this.cartList.find(item=> !item.checked)

      //普通遍历
      // for(let item of this.cartList){
      //   if(!item.checked){
      //     return false
      //   }
      // }
      // return true
    }
  }
}
</script>

<style scoped>
.cart-price {
  height: 40px;
  background-color: #ffffff;
  position: absolute;
  bottom: 49px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.check-content {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: space-evenly;
}

.price-text {
  flex: 2.5;
  text-align: right;

}

.price-text > .price {
  color: #F44336;
}


.buy-content {
  flex: 1;
  padding-left: 10px;
  height: 100%;
}

.buy-content > .buy-btn {
  background-color: var(--color-tint);
  width: 100%;
  line-height: 30px;
  text-align: center;
  margin: 5px 0;
  border-radius: 30px;
  color: #ffffff;
  font-size: 18px;
  background-image: linear-gradient(90deg, rgb(255 98 145) 3.3%, rgb(239 55 55) 96%);
}
</style>
