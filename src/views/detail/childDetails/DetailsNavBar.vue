<template>
  <nav-bar>
    <div slot="left" @click="backClick" class="back-page" >
       <img class="back" src="~assets/img/common/prev.png" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles"
           class="title-item"
           :class="{active: index === currentIndex}"
           @click="titleClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "DetailsNavBar",
    components: {NavBar},
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index);
      },
      backClick(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 14px;
  }

  .back-page{
    height: 100%;
  }

  .back{
    height: 100%;
    padding: 11px;
  }

  .active {
    color: var(--color-high-text);
  }

  .nav-bar{
    background-color: #ffffff;
  }
</style>
