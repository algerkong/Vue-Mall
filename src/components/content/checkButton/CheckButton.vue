<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    padding: 2px;
    border-radius: 50%;
    border: 1px solid #cccccc;
    width: 22px;
    height: 22px;
  }
  img{
    display: block;
  }
  .checked{
    background-color: var(--color-tint);
  }
</style>
