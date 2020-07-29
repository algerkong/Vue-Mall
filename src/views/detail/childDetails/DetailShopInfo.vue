<template>
  <div v-if="Object.keys(shop).length !== 0" class="shop-info">
    <div class="shop-top">
      <div class="info">
        <img :src="shop.logo" align=absmiddle alt="">
        <span class="title">{{shop.name}}</span>
      </div>
      <div class="shop-btn">
        <button @click="enterStore">进店逛逛</button>
      </div>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellsFilters}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
  import TabControl from "@/components/content/tabControl/TabControl";

  export default {
    name: "DetailShopInfo",
    components: {TabControl},
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      enterStore() {
        this.$store.commit('showToast', '进入店铺');
      }
    },
    filters: {
      sellsFilters: function (value) {
        if (value) {
          let v = value;
          if (v >= 100000000) {
            v = (v / 100000000).toFixed(2) + '亿';
            return v;
          } else if (v >= 10000) {
            v = (v / 10000).toFixed(2) + '万';
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
  .shop-info {
    padding: 10px 0;
    border-top: 1px solid #e0e0e0;
    color: #333;
  }

  .shop-top {
    display: flex;
    justify-content: space-between;
  }

  .shop-top > .info {
    flex: 1;
  }

  .shop-top > .info > img {
    width: 60px;
    border: 2px solid #eeeeee;
    border-radius: 50%;
    margin-right: 10px;
  }

  .shop-top .info > span {
    vertical-align: middle;
  }

  .shop-btn {
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
  }

  .shop-btn > button {
    outline: none;
    display: block;
    border: none;
    padding: 8px 12px;
    border-radius: 20px;
    color: #ffffff;
    font-size: 14px;
    background-image: linear-gradient(90deg, rgb(255 172 76) 3.3%, rgb(241 107 35) 96%);
  }


  .shop-middle {
    display: flex;
    padding: 10px 10px;
  }

  .shop-middle-item.shop-middle-left > div {
    width: 50%;
    text-align: center;
  }

  .shop-middle-item.shop-middle-left {
    display: flex;
    width: 55%;
    padding-top: 5px;
    padding-right: 10px;
    border-right: 2px solid #eeeeee;
  }

  .shop-middle-item.shop-middle-right {
    width: 45%;
    padding-left: 20px;
    font-size: 14px;
  }

  .sells-count, .goods-count {
    font-size: 18px;
    padding: 10px 0;
  }

  .sells-text, .goods-text {
    font-size: 14px;
  }

  .shop-middle-item.shop-middle-right > table > tr > td {
    position: relative;
    line-height: 22px;
  }

  .score {
    color: #EB0000;
  }

  .score::after {
    content: '低';
    color: #ffffff;
    background-color: #EB0000;
    position: absolute;
    right: -25px;
  }

  .score-better {
    color: #42b983;
  }

  .score-better::after {
    content: '高';
    color: #ffffff;
    background-color: #42b983;
    position: absolute;
    right: -25px;
  }


</style>
