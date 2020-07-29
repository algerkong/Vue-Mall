<template>
  <div class="goods">
    <goods-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsItem from "@/components/content/goods/GoodsListItem";
  export default {
    name: "GoodsList",
    components: {GoodsItem},
    //将父组件的商品数组传递到这里 这里再传递到goodsListItem中
    props:{
      goods:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
