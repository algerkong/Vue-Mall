<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discountDesc}}</span>
    </div>
    <div class="info-title">{{goods.title}}</div>
    <div class="info-other">
      <span>{{goods.discount[0]}}</span>
      <span>{{goods.discount[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-2">
        <img align="absmiddle" :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .info-price {
    position: relative;
    display: block;
    overflow: hidden;
  }

  span.n-price {
    font-size: 25px;
    font-weight: bold;
    color: #F44336;
    line-height: 2em;
  }

  span.o-price {
    color: #8c8c8c;
    font-size: 14px;
    margin-left: 10px;
    text-decoration: line-through;
  }

  span.discount {
    padding: 2px 5px;
    font-size: 14px;
    background: var(--color-high-text);
    color: var(--color-background);
    border-radius: 16px;
    margin-left: 10px;
    position: absolute;
    top: 14px;
  }

  .info-title {
    font-size: 18px;
    line-height: 30px;
    color: #333;
  }

  .info-other {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    line-height: 45px;
    border-bottom: 1px solid #e0e0e0;
  }

  .info-service {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }

  .info-service-item img {
    width: 18px;
  }

  .info-service {
    padding: 15px 0;
  }
</style>
