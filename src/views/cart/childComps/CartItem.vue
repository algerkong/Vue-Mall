<template>
  <div class="cart-item">
    <div class="choose-page">
      <check-button :is-checked="cartListItem.checked" @click.native="checkClick"/>
    </div>
    <div class="chick-goods" @click="cartClick">
      <div class="img-page">
        <img :src="cartListItem.image" alt="">
      </div>
      <div class="good-info">
        <div class="title"><p>{{cartListItem.title}}</p></div>
        <div class="attr">{{cartListItem.style}};{{cartListItem.size}}</div>
        <div class="price-count">
          <div class="price">￥{{cartListItem.price}}</div>
          <div class="count">×{{cartListItem.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";

  export default {
    name: "CartItem",
    components: {CheckButton},
    props: {
      cartListItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      cartClick() {
        this.$router.push({
          path: '/detail',
          query: {
            iid: (this.cartListItem.iid)
          }
        });
      },
      checkClick(){
        this.cartListItem.checked = !this.cartListItem.checked;
      }
    }
  }
</script>

<style scoped>
  .cart-item {
    display: flex;
    margin: 10px 10px 0 10px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .cart-item > .choose-page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 7px;
  }

  .chick-goods {
    display: flex;
    overflow: hidden;
  }

  .img-page {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 5px;
  }

  .img-page > img {
    width: 100px;
  }

  .good-info {
    flex: 1;
    overflow: hidden;
    margin-left: 10px;
  }

  .good-info > .title > p {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
  }

  .good-info > .attr {
    background-color: #f9f9f9;
    display: inline-block;
    padding: 0 5px;
    margin: 10px 5px;
    color: #a3a3a3;
    border-radius: 3px;

  }

  .good-info > .price-count {
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: -20px;
  }

  .price-count > .price {
    font-size: 18px;
    font-weight: 600;
    color: #F44336;
  }

  .price-count > .count {
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 0 3px;
  }
</style>
