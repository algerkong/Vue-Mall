<template>
  <div class="goods-item-page" @click="itemClick">
    <div class="goods-item">
      <div class="img-page"><img v-lazy="showImage" alt="" @load="imageLoad"></div>
      <div class="goods-title">
        <p>{{goodsItem.title}}</p>
        <p>
          <span class="price">￥{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav | sellsFilters}}人收藏</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    //将父组件goodslist的数据传递到这里 然后展示 图片 价格
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad');
      },
      itemClick() {
        // this.$router.push('/detail/' + (||this.goodsItem.iid));
        this.$router.push({
          path: '/detail',
          query: {
            iid: (this.goodsItem.iid || this.goodsItem.item_id)
          }
        });
      }
    },
    filters: {
      sellsFilters: function (value) {
        if (value) {
          let v = value;
          if (v >= 10000) {
            v = (v / 10000).toFixed(1) + '万';
            return v;
          } else if (v >= 1000) {
            v = (v / 1000).toFixed(1) + '千';
            return v;
          } else {
            return value;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item-page {
    width: 47.5%;
    padding-bottom: 10px;
  }

  /*.goods-item-page:nth-child(2n-1){*/
  /*  padding-right: 5px;*/
  /*}*/
  /*.goods-item-page:nth-child(2n){*/
  /*  padding-left: 5px;*/
  /*}*/

  .goods-item {
    overflow: hidden;
    border-radius: 10px;
    background-color: var(--color-background);
    box-shadow: 0 0 4px 2px #0000000f;
  }

  .img-page {
    width: 100%;
    height: 55vw;
    overflow: hidden;
    text-align: center;
  }

  .goods-item img {
    width: 100%;
    /*height: 100%;*/
  }

  .goods-title {
    padding: 0 10px;
    overflow: hidden;
    box-shadow: inset 0 2px 12px #0000000a;
  }

  .goods-title p:nth-child(1) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 2em;
    font-weight: bold;
    color: #333;
  }

  .goods-title p:nth-child(2) {
    line-height: 1.5em;
  }

  .price {
    float: left;
    font-weight: bold;
    color: #fb3e29;
  }

  .collect {
    float: right;
    font-size: 14px;
  }
</style>
