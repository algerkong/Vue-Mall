<template>
  <div class="img-big">
    <img :src="imgSrc" alt="" @click="imgSmall">
    <p>{{info}}</p>
  </div>
</template>

<script>
  export default {
    name: "DetailImgBig",
    props: {
      imgSrc: {
        type: String,
        default() {
          return ""
        }
      },
      info: {
        type: String,
        default() {
          return ""
        }
      }
    },
    methods: {
      imgSmall() {
        this.$store.commit('showImgBig')
      }
    }
  }
</script>

<style scoped>
  .img-big {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000000;
  }


  .img-big > img {
    width: 100%;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    animation: imgShow .2s ease-in,cubic-bezier(.2,.64,.86,1.17);
    opacity: 1;
  }

  @keyframes imgShow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }


  .img-big > p {
    position: absolute;
    text-align: center;
    color: #ffffff;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>
