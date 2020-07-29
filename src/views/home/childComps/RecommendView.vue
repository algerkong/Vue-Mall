<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div class="recommend-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    padding: 10px 0 15px;
    background-color: var(--color-background);
  }

  .recommend-item {

  }

  .recommend-item img {
    width: 90%;
  }

  .recommend-title{
    line-height: 2em;
    font-size: 3.5vw;
  }
</style>
