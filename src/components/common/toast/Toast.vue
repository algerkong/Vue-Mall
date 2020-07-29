<template>
  <div class="toast-page" v-show="$store.state.isShowToast.isShow">
    <div>
      {{$store.state.isShowToast.msg}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Toast"
  }
</script>

<style scoped>
  .toast-page {
    opacity: 0;
    text-align: center;
    position: fixed;
    bottom: 20%;
    z-index: 100;
    margin: 0 auto;
    left: 0;
    right: 0;

    animation: opacity 2s;
  }

  .toast-page > div {
    display: inline-block;
    padding: 5px 10px;
    background-color: #ffffff;
    color: #000000;
    box-shadow: 0 5px 20px #00000026;
    border-radius: 20px;
    border: 1px solid #dfdfdf;
    animation: scale 1s;
  }


  @keyframes opacity {
    0% {
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1.1);
    }
    40% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
