<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="" >
      </div>
    </div>
    <detail-img-big :img-src="imgSrc" v-if="$store.state.isShowImgBig"/>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";
import DetailImgBig from "./DetailImgBig";

export default {
  name: "DetailCommentInfo",
  components: {DetailImgBig},
  data() {
    return {
      imgSrc: null
    }
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgBigClick(src) {
      this.imgSrc = src;
      this.$store.commit('showImgBig');
    }
  },
  filters: {
    showDate: function (value) {
      const date = new Date(value * 1000);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  }
}
</script>

<style scoped>
.comment-info {
  padding: 0 20px;
}

.info-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 2px solid #eee;
  color: #333;
}

.info-user > img {
  width: 40px;
  border: 1px solid #eee;
  border-radius: 50%;
  vertical-align: middle;
}

.info-user > span {
  vertical-align: middle;
  margin-left: 10px;
  color: #333;
}

.info-user {
  padding: 5px;
}

.info-detail > p {
  font-size: 14px;
}

.info-detail {
  padding: 10px;
}

.info-other {
  font-size: 14px;
  color: #888888;
  margin: 10px 0;
}

.info-imgs {
  display: flex;
  flex-wrap: wrap;
}

.info-imgs > img {
  width: 25%;
}
</style>
