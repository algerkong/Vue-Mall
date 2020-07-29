<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper";

  export default {
    name: "DetailSwiper",
    components: {Swiper, SwiperItem},
    data() {
      return {
        isOneShow: false,
        imgCount: 0
      }
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    watch: {
      topImages: {
        handler: function (newVal, oldVal) {
          this.imgCount = newVal.length;
          this.isOneShow = this.imgCount === 1 ;
        },
        deep: true
      }
    },
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
  .no-img{
    background-color: #000000;
    position: relative;
  }
  .no-img::after{
    content: '没有更多图片了...';
    position: absolute;
    top: 0;
    left: 0;
    color: #ffffff;
  }
</style>
