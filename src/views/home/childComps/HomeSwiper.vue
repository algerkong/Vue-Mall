<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>

</template>

<script>
  //导入swiper文件夹下的index文件
import {Swiper, SwiperItem} from "@/components/common/swiper"

  export default {
    name: "HomeSwiper",
    components: {SwiperItem, Swiper},
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
</style>
